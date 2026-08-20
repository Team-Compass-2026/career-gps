#!/usr/bin/env bun
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { getAIProvider } from "../lib/ai/provider";

const KNOWLEDGE_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "knowledge");
const FIELD_ORDER = [
  "career_description",
  "skill_requirements",
  "learning_path",
  "resources",
  "salary_data",
  "mentor_profiles",
  "faq",
];

const DRY = process.argv.includes("--dry");

interface RawDoc {
  source: string;
  title: string;
  url?: string;
  audience?: string;
  published: boolean;
  sections: Array<{ field: string; heading: string; content: string }>;
}

function estimateTokens(text: string): number {
  return Math.ceil(text.split(/\s+/).filter(Boolean).length * 1.3);
}

function parseFrontMatter(raw: string): {
  front: Record<string, string>;
  body: string;
} {
  if (!raw.startsWith("---")) return { front: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { front: {}, body: raw };
  const block = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\n/, "");
  const front: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    front[key] = value;
  }
  return { front, body };
}

export function parseKnowledge(dir: string = KNOWLEDGE_DIR): RawDoc[] {
  if (!existsSync(dir)) return [];
  const docs: RawDoc[] = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const raw = readFileSync(join(dir, file), "utf8");
    const { front, body } = parseFrontMatter(raw);
    const lines = body.split("\n");
    const sections: Array<{ field: string; heading: string; content: string }> = [];
    let currentField = "";
    let currentHeading = "";
    const buf: string[] = [];
    const flush = () => {
      const content = buf.join("\n").trim();
      if (currentField && content) {
        sections.push({ field: currentField, heading: currentHeading, content });
      }
      buf.length = 0;
    };
    for (const line of lines) {
      const h2 = /^##\s+(.+)$/.exec(line);
      const h3 = /^###\s+(.+)$/.exec(line);
      if (h2) {
        flush();
        currentField = h2[1].trim().toLowerCase();
        currentHeading = "";
      } else if (h3) {
        flush();
        currentHeading = h3[1].trim();
      } else if (line.trim()) {
        buf.push(line);
      }
    }
    flush();
    docs.push({
      source: front.source || file,
      title: front.title || file.replace(/\.md$/, ""),
      url: front.url || undefined,
      audience: front.audience || undefined,
      published: (front.published || "true") === "true",
      sections: sections.filter((s) => FIELD_ORDER.includes(s.field)),
    });
  }
  return docs;
}

export function chunkSection(
  section: { field: string; heading: string; content: string },
  maxTokens = 400,
  overlap = 0.15,
): Array<{ field: string; heading: string; content: string; ordinal: number; tokens: number }> {
  const paragraphs = section.content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const chunks: Array<{ field: string; heading: string; content: string; ordinal: number; tokens: number }> = [];
  let buf = "";
  let ord = 0;
  const flush = () => {
    const content = buf.trim();
    if (content) {
      chunks.push({ field: section.field, heading: section.heading, content, ordinal: ord, tokens: estimateTokens(content) });
      ord += 1;
    }
    buf = "";
  };
  for (const p of paragraphs) {
    const candidate = buf ? `${buf}\n\n${p}` : p;
    if (buf && estimateTokens(candidate) > maxTokens) {
      flush();
      // overlap: keep last overlapPct of previous chunk
      const prev = chunks[chunks.length - 1]?.content ?? "";
      if (prev) {
        const words = prev.split(/\s+/);
        const keep = Math.floor(words.length * overlap);
        buf = words.slice(-keep).join(" ") + "\n\n" + p;
        continue;
      }
    }
    buf = candidate;
  }
  flush();
  return chunks;
}

export function buildChunks(docs: RawDoc[], maxTokens = 400, overlap = 0.15) {
  const seen = new Set<string>();
  const chunks: Array<{
    source: string;
    title: string;
    url?: string;
    audience?: string;
    published: boolean;
    field: string;
    heading: string;
    content: string;
    ordinal: number;
    tokens: number;
  }> = [];
  for (const doc of docs) {
    for (const section of doc.sections) {
      for (const chunk of chunkSection(section, maxTokens, overlap)) {
        const key = `${doc.source}|${chunk.field}|${chunk.heading}|${chunk.content.slice(0, 80)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        chunks.push({
          source: doc.source,
          title: doc.title,
          url: doc.url,
          audience: doc.audience,
          published: doc.published,
          ...chunk,
        });
      }
    }
  }
  return chunks;
}

async function runIngest() {
  const docs = parseKnowledge();
  if (docs.length === 0) {
    console.error("[ingest] no knowledge docs found in", KNOWLEDGE_DIR);
    process.exit(1);
  }
  const chunks = buildChunks(docs);
  console.log(`[ingest] docs=${docs.length} chunks=${chunks.length}`);

  if (DRY) {
    console.log("[ingest] --dry: no DB writes, no embedding calls.");
    const byField = new Map<string, number>();
    for (const c of chunks) byField.set(c.field, (byField.get(c.field) ?? 0) + 1);
    for (const [f, n] of byField) console.log(`  field ${f}: ${n} chunk(s)`);
    return;
  }

  const provider = getAIProvider();
  const texts = chunks.map((c) => c.content);
  console.log(`[ingest] embedding ${texts.length} chunks…`);
  const vectors = await provider.embed(texts);
  if (vectors.length !== chunks.length) {
    throw new Error(`embedding count mismatch: got ${vectors.length}, expected ${chunks.length}`);
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });
  try {
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const doc = await prisma.knowledgeDoc.upsert({
        where: { source: chunk.source },
        update: { title: chunk.title, url: chunk.url, audience: chunk.audience, published: chunk.published },
        create: { source: chunk.source, title: chunk.title, url: chunk.url, audience: chunk.audience, published: chunk.published },
      });
      await prisma.knowledgeChunk.create({
        data: {
          docId: doc.id,
          field: chunk.field,
          ordinal: chunk.ordinal,
          heading: chunk.heading,
          content: chunk.content,
          tokens: chunk.tokens,
          embedding: vectors[i] as never,
        },
      });
      if ((i + 1) % 10 === 0 || i === chunks.length - 1) {
        console.log(`[ingest] ${i + 1}/${chunks.length} embedded + stored`);
      }
    }
    console.log("[ingest] done — chunks stored in KnowledgeChunk.");
  } finally {
    await prisma.$disconnect();
  }
}

if (import.meta.main) {
  runIngest().catch((err) => {
    console.error("[ingest] failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  });
}