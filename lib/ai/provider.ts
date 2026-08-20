export type AIMessageRole = "system" | "user" | "assistant";

export interface AIMessage {
  role: AIMessageRole;
  content: string;
}

export interface AICompleteOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIEmbedOptions {
  model?: string;
}

export interface AIProvider {
  readonly name: string;
  complete(messages: AIMessage[], options?: AICompleteOptions): Promise<string>;
  embed(texts: string[], options?: AIEmbedOptions): Promise<number[][]>;
  health(): Promise<boolean>;
}

export interface AIProviderInfo {
  name: string;
  baseURL: string;
  model?: string;
  auth: "none" | "basic" | "bearer";
  configured: boolean;
}

export class AIProviderError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export class EmbeddingProviderError extends AIProviderError {}

const DEFAULT_BRAIN_URL = "https://pcore-brain.peterlianpi.site";
const DEFAULT_OPENAI_URL = "https://api.openai.com/v1";

async function parseResponse(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!res.ok) {
    let detail = text;
    try {
      const body = JSON.parse(text) as { error?: { message?: string } };
      detail = body.error?.message ?? text;
    } catch {
      // keep raw text
    }
    throw new AIProviderError(`AI request failed (${res.status}): ${detail.slice(0, 500)}`, res.status);
  }
  if (!text) return null;
  return JSON.parse(text);
}

function authHeader(env: NodeJS.ProcessEnv): { auth: "none" | "basic" | "bearer"; header?: string } {
  const user = env.AI_BRAIN_AUTH_USER;
  const pass = env.AI_BRAIN_AUTH_PASS;
  if (user && pass) {
    return { auth: "basic", header: `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}` };
  }
  const token = env.AI_BRAIN_TOKEN || env.PCORE_BRAIN_TOKEN;
  if (token) return { auth: "bearer", header: `Bearer ${token}` };
  return { auth: "none" };
}

export class OpenAICompatibleProvider implements AIProvider {
  readonly name = "openai";
  private readonly env: NodeJS.ProcessEnv;

  constructor(env: NodeJS.ProcessEnv = process.env) {
    this.env = env;
  }

  get baseURL(): string {
    return this.env.AI_OPENAI_BASE_URL || this.env.OPENAI_BASE_URL || DEFAULT_OPENAI_URL;
  }

  get apiKey(): string | undefined {
    return this.env.AI_OPENAI_API_KEY || this.env.OPENAI_API_KEY;
  }

  get model(): string | undefined {
    return this.env.AI_OPENAI_MODEL || this.env.AI_MODEL;
  }

  get embeddingModel(): string {
    return this.env.AI_OPENAI_EMBEDDING_MODEL || this.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";
  }

  async complete(messages: AIMessage[], options: AICompleteOptions = {}): Promise<string> {
    const model = options.model || this.model;
    if (!model) {
      throw new AIProviderError("openai provider: no model configured (set AI_OPENAI_MODEL or AI_MODEL)");
    }
    if (!this.apiKey) {
      throw new AIProviderError("openai provider: no API key configured (set AI_OPENAI_API_KEY or OPENAI_API_KEY)");
    }
    const body: Record<string, unknown> = { model, messages };
    if (options.temperature !== undefined) body.temperature = options.temperature;
    if (options.maxTokens !== undefined) body.max_tokens = options.maxTokens;
    const res = await fetch(`${this.baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });
    const data = (await parseResponse(res)) as { choices?: Array<{ message?: { content?: string | null } }> };
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new AIProviderError("openai provider: empty completion response");
    return content;
  }

  async embed(texts: string[], options: AIEmbedOptions = {}): Promise<number[][]> {
    if (!texts.length) {
      throw new EmbeddingProviderError("openai provider: no input texts provided for embedding");
    }
    const apiKey = this.apiKey;
    if (!apiKey) {
      throw new EmbeddingProviderError("openai provider: no API key configured (set AI_OPENAI_API_KEY or OPENAI_API_KEY)");
    }
    const model = options.model || this.embeddingModel;
    const body: Record<string, unknown> = { input: texts, model };
    const res = await fetch(`${this.baseURL}/embeddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
    const data = (await parseResponse(res)) as { data?: Array<{ embedding?: unknown }> };
    const vectors = (data.data ?? []).map((d) => d.embedding).filter((v): v is number[] => Array.isArray(v));
    if (!vectors.length) {
      throw new EmbeddingProviderError(`openai provider: no embeddings returned for ${texts.length} input(s)`);
    }
    return vectors;
  }

  async health(): Promise<boolean> {
    if (!this.apiKey) return false;
    try {
      const res = await fetch(`${this.baseURL}/models`, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}

export class PCoreBrainProvider implements AIProvider {
  readonly name = "pcore-brain";
  private readonly env: NodeJS.ProcessEnv;

  static readonly POOL_MODEL_MAP: Record<string, string> = {
    opencode: "mimo-v2.5-free",
  };

  constructor(env: NodeJS.ProcessEnv = process.env) {
    this.env = env;
  }

  get baseURL(): string {
    return this.env.AI_BRAIN_URL || DEFAULT_BRAIN_URL;
  }

  get model(): string | undefined {
    if (this.env.AI_BRAIN_MODEL) return this.env.AI_BRAIN_MODEL;
    return PCoreBrainProvider.POOL_MODEL_MAP[this.env.AI_BRAIN_MODEL_POOL ?? "opencode"];
  }

  get auth(): { auth: "none" | "basic" | "bearer"; header?: string } {
    return authHeader(this.env);
  }

  get configured(): boolean {
    return this.auth.auth !== "none";
  }

  get embeddingModel(): string {
    return this.env.AI_BRAIN_EMBEDDING_MODEL || "text-embedding-3-small";
  }

  get embeddingBridgeURL(): string | undefined {
    return this.env.AI_BRAIN_EMBEDDING_URL;
  }

  get embedConfigured(): boolean {
    return Boolean(this.embeddingBridgeURL && this.auth.header);
  }

  private async request(path: string, init: RequestInit = {}, timeoutMs = 20_000): Promise<unknown> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(init.headers as Record<string, string> | undefined),
    };
    if (this.auth.header) headers.Authorization = this.auth.header;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(`${this.baseURL}${path}`, {
        ...init,
        headers,
        signal: controller.signal,
      });
      return await parseResponse(res);
    } catch (err) {
      if (err instanceof AIProviderError) throw err;
      throw new AIProviderError(`pcore-brain request failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      clearTimeout(timer);
    }
  }

  private async createSession(): Promise<string> {
    const data = (await this.request("/session", { method: "POST" })) as { id?: string };
    if (!data.id) throw new AIProviderError("pcore-brain: session creation returned no id");
    return data.id;
  }

  async complete(messages: AIMessage[], options: AICompleteOptions = {}): Promise<string> {
    const text = messages
      .map((m) => (m.role === "system" ? `System: ${m.content}` : m.content))
      .join("\n\n")
      .trim();
    if (!text) throw new AIProviderError("pcore-brain: empty message");
    const sessionId = await this.createSession();
    const payload = { parts: [{ type: "text", text }] };
    const data = (await this.request(
      `/session/${sessionId}/message`,
      { method: "POST", body: JSON.stringify(payload) },
      options.maxTokens ? 120_000 : 60_000,
    )) as { parts?: Array<{ type: string; text?: string }> };
    const reply = (data.parts ?? [])
      .filter((p) => p.type === "text" && p.text)
      .map((p) => p.text as string)
      .join("");
    if (!reply) throw new AIProviderError("pcore-brain: empty reply");
    return reply;
  }

  async embed(texts: string[], options: AIEmbedOptions = {}): Promise<number[][]> {
    if (!texts.length) {
      throw new EmbeddingProviderError("pcore-brain: no input texts provided for embedding");
    }
    const bridge = this.embeddingBridgeURL;
    if (!bridge) {
      throw new EmbeddingProviderError(
        "pcore-brain does not support embeddings; set AI_PROVIDER=openai for embeddings (or set AI_BRAIN_EMBEDDING_URL to bridge to an embeddings endpoint)",
      );
    }
    const authHeader = this.auth.header;
    if (!authHeader) {
      throw new EmbeddingProviderError(
        "pcore-brain embedding bridge: no auth configured (set AI_BRAIN_TOKEN or AI_BRAIN_AUTH_USER/AI_BRAIN_AUTH_PASS)",
      );
    }
    const model = options.model || this.embeddingModel;
    const body: Record<string, unknown> = { input: texts, model };
    const res = await fetch(`${bridge}/embeddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });
    const data = (await parseResponse(res)) as { data?: Array<{ embedding?: unknown }> };
    const vectors = (data.data ?? []).map((d) => d.embedding).filter((v): v is number[] => Array.isArray(v));
    if (!vectors.length) {
      throw new EmbeddingProviderError("pcore-brain embedding bridge: no embeddings returned");
    }
    return vectors;
  }

  async health(): Promise<boolean> {
    try {
      const data = (await this.request("/global/health", {}, 10_000)) as { healthy?: boolean };
      return data.healthy === true;
    } catch {
      return false;
    }
  }
}

export function createAIProvider(env: NodeJS.ProcessEnv = process.env): AIProvider {
  const kind = (env.AI_PROVIDER || "pcore-brain").trim().toLowerCase();
  if (kind === "openai" || kind === "openai-compatible") return new OpenAICompatibleProvider(env);
  if (kind === "pcore-brain" || kind === "brain") return new PCoreBrainProvider(env);
  throw new AIProviderError(`Unknown AI_PROVIDER "${kind}" (expected "openai" or "pcore-brain")`);
}

let cachedProvider: AIProvider | null = null;

export function getAIProvider(env: NodeJS.ProcessEnv = process.env): AIProvider {
  cachedProvider ??= createAIProvider(env);
  return cachedProvider;
}

export function getAIProviderInfo(env: NodeJS.ProcessEnv = process.env): AIProviderInfo {
  const provider = createAIProvider(env);
  if (provider instanceof OpenAICompatibleProvider) {
    return {
      name: provider.name,
      baseURL: provider.baseURL,
      model: provider.model,
      auth: provider.apiKey ? "bearer" : "none",
      configured: Boolean(provider.apiKey && provider.model),
    };
  }
  if (provider instanceof PCoreBrainProvider) {
    return {
      name: provider.name,
      baseURL: provider.baseURL,
      model: provider.model,
      auth: provider.auth.auth,
      configured: provider.configured,
    };
  }
  return { name: provider.name, baseURL: "", auth: "none", configured: false };
}

export interface AIEmbeddingsInfo {
  provider: string;
  baseURL: string;
  model: string;
  configured: boolean;
}

export function getEmbeddingsInfo(env: NodeJS.ProcessEnv = process.env): AIEmbeddingsInfo {
  const provider = createAIProvider(env);
  if (provider instanceof OpenAICompatibleProvider) {
    return {
      provider: provider.name,
      baseURL: provider.baseURL,
      model: provider.embeddingModel,
      configured: Boolean(provider.apiKey),
    };
  }
  if (provider instanceof PCoreBrainProvider) {
    return {
      provider: provider.name,
      baseURL: provider.embeddingBridgeURL || "not-supported",
      model: provider.embeddingModel,
      configured: provider.embedConfigured,
    };
  }
  return { provider: provider.name, baseURL: "", model: "text-embedding-3-small", configured: false };
}