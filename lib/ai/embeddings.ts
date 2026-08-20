import { getAIProvider } from "./provider";
import type { AIEmbedOptions, AIEmbeddingsInfo } from "./provider";

export type { AIEmbedOptions, AIEmbeddingsInfo };
export { AIProviderError, EmbeddingProviderError } from "./provider";
export { getEmbeddingsInfo } from "./provider";

/**
 * Embed a list of texts via the configured AI provider's `embed()` method.
 * Dispatches to `getAIProvider().embed(texts, options)` so provider selection
 * stays driven by `AI_PROVIDER` (OpenAI-compatible /embeddings, or pcore-brain
 * via an `AI_BRAIN_EMBEDDING_URL` bridge).
 */
export async function embed(
  texts: string[],
  options?: AIEmbedOptions,
): Promise<number[][]> {
  return getAIProvider().embed(texts, options);
}
