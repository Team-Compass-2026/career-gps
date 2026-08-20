import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { embed } from "./embeddings";
import { getAIProviderInfo } from "./provider";

export interface RAGCitation {
  source: string;
  title: string;
  field: string;
  heading: string;
  content: string;
  score: number;
}

export interface RAGRetrieveOptions {
  field?: string;
  topK?: number;
}

export interface RAGRetrieveResult {
  query: string;
  citations: RAGCitation[];
  provider: string;
}

const SIM_WEIGHT = 0.7;
const FTS_WEIGHT = 0.3;
const MAX_TOP_K = 20;

const globalForRag = globalThis as unknown as { ragPrisma?: PrismaClient };

function getPrismaClient(): PrismaClient {
  globalForRag.ragPrisma ??= new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });
  return globalForRag.ragPrisma;
}

function toVectorLiteral(vector: number[]): string {
  return `[${vector.map((v) => Number(v).toFixed(6)).join(",")}]`;
}

interface RagRow {
  field: string;
  heading: string | null;
  content: string;
  source: string;
  title: string;
  sim: number;
  fts: number;
}

async function embedQuery(text: string): Promise<number[] | null> {
  try {
    const vectors = await embed([text]);
    const vector = vectors[0];
    return Array.isArray(vector) && vector.length > 0 ? vector : null;
  } catch {
    return null;
  }
}

async function searchKnowledge(
  query: string,
  vector: number[],
  field: string | undefined,
  topK: number,
): Promise<RagRow[]> {
  const prisma = getPrismaClient();
  const vec = toVectorLiteral(vector);
  const simExpr = `(1 - (c."embedding" <=> '${vec}'::vector))`;
  const ftsExpr = `ts_rank_cd(to_tsvector('english', c."content"), plainto_tsquery('english', $1))`;
  const select = `
    SELECT c."field", c."heading", c."content", d."source", d."title",
           ${simExpr} AS sim,
           ${ftsExpr} AS fts
    FROM "KnowledgeChunk" c
    JOIN "KnowledgeDoc" d ON d."id" = c."docId"
  `;
  const orderBy = `ORDER BY ${simExpr} * ${SIM_WEIGHT} + ${ftsExpr} * ${FTS_WEIGHT} DESC`;

  if (field) {
    const sql = `${select} WHERE c."embedding" IS NOT NULL AND c."field" = $2 ORDER BY ${simExpr} * ${SIM_WEIGHT} + ts_rank_cd(to_tsvector('english', c."content"), plainto_tsquery('english', $1)) * ${FTS_WEIGHT} DESC LIMIT ${topK}`;
    return prisma.$queryRawUnsafe<RagRow[]>(sql, query, field);
  }

  const sql = `${select} WHERE c."embedding" IS NOT NULL ${orderBy} LIMIT ${topK}`;
  return prisma.$queryRawUnsafe<RagRow[]>(sql, query);
}

export async function retrieveRAG(
  query: string,
  options: RAGRetrieveOptions = {},
): Promise<RAGRetrieveResult> {
  const provider = getAIProviderInfo().name;
  const text = query.trim();
  if (!text) return { query, citations: [], provider };

  const topK = Math.max(1, Math.min(MAX_TOP_K, options.topK ?? 5));
  const vector = await embedQuery(text);
  if (!vector) return { query, citations: [], provider };

  try {
    const rows = await searchKnowledge(text, vector, options.field, topK);
    const citations: RAGCitation[] = rows.map((r) => ({
      source: r.source,
      title: r.title,
      field: r.field,
      heading: r.heading ?? "",
      content: r.content,
      score: r.sim * SIM_WEIGHT + r.fts * FTS_WEIGHT,
    }));
    return { query, citations, provider };
  } catch {
    return { query, citations: [], provider };
  }
}

function truncateAtWordBoundary(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  let end = maxChars;
  while (end > 0 && !/\s/.test(text.charAt(end))) end -= 1;
  if (end === 0) return text.slice(0, maxChars);
  return text.slice(0, end).trimEnd();
}

export function buildRAGContext(citations: RAGCitation[], maxChars?: number): string {
  if (citations.length === 0) return "";
  const blocks = citations.map(
    (c) =>
      `Knowledge context (source: ${c.source}, field: ${c.field}, heading: ${c.heading}):\n${c.content}`,
  );
  const joined = blocks.join("\n\n---\n\n");
  return maxChars ? truncateAtWordBoundary(joined, maxChars) : joined;
}