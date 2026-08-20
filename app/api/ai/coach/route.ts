import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  AIProviderError,
  getAIProvider,
  getAIProviderInfo,
} from "@/lib/ai/provider";
import { buildRAGContext, retrieveRAG } from "@/lib/ai/rag";
import type { RAGCitation } from "@/lib/ai/rag";

export const runtime = "nodejs";

const COACH_PROMPT =
  "You are the Career GPS AI career coach. Guide the user step-by-step with concrete next actions, timelines, and milestones. Ground answers in the provided knowledge context and cite sources when used. Be encouraging but realistic. Keep responses focused and actionable.";

const KNOWLEDGE_FIELDS = [
  "career_description",
  "skill_requirements",
  "learning_path",
  "resources",
  "salary_data",
  "mentor_profiles",
  "faq",
] as const;

const CoachRequest = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string().trim().min(1).max(8000),
      }),
    )
    .min(1)
    .max(50),
  field: z.enum(KNOWLEDGE_FIELDS).optional(),
  topK: z.number().int().min(1).max(20).default(5),
});

export async function POST(request: NextRequest) {
  const parsed = CoachRequest.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid request", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const lastUserMessage = [...parsed.data.messages]
    .reverse()
    .find((m) => m.role === "user");

  let citations: RAGCitation[] = [];
  if (lastUserMessage) {
    try {
      const rag = await retrieveRAG(lastUserMessage.content, {
        field: parsed.data.field,
        topK: parsed.data.topK,
      });
      citations = rag.citations;
    } catch {
      citations = [];
    }
  }

  const context = buildRAGContext(citations);
  const systemContent = context
    ? `${COACH_PROMPT}\n\n${context}`
    : `${COACH_PROMPT}\n\nNo knowledge context was retrieved for this question. Answer from your general knowledge and be honest about what you are unsure of.`;
  const systemMessage: z.infer<typeof CoachRequest>["messages"][number] = {
    role: "system",
    content: systemContent,
  };

  const provider = getAIProvider();
  try {
    const content = await provider.complete([
      systemMessage,
      ...parsed.data.messages,
    ]);
    return NextResponse.json({
      content,
      provider: provider.name,
      info: getAIProviderInfo(),
      citations,
      field: parsed.data.field ?? null,
    });
  } catch (err) {
    const message =
      err instanceof AIProviderError ? err.message : "upstream AI request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}