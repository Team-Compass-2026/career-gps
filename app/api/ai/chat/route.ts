import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  AIProviderError,
  getAIProvider,
  getAIProviderInfo,
} from "@/lib/ai/provider";

export const runtime = "nodejs";

const ChatRequest = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string().trim().min(1).max(8000),
      }),
    )
    .min(1)
    .max(50),
  model: z.string().trim().min(1).max(200).optional(),
});

export async function POST(request: NextRequest) {
  const parsed = ChatRequest.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid request", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const provider = getAIProvider();
  try {
    const content = await provider.complete(parsed.data.messages, {
      model: parsed.data.model,
    });
    return NextResponse.json({ content, provider: provider.name, info: getAIProviderInfo() });
  } catch (err) {
    const message =
      err instanceof AIProviderError ? err.message : "upstream AI request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}