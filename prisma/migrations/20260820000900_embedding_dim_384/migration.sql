-- Drop HNSW index first (vector dimension cannot change while indexed)
DROP INDEX IF EXISTS "KnowledgeChunk_embedding_idx";

-- Resize the vector column
ALTER TABLE "KnowledgeChunk" ALTER COLUMN "embedding" TYPE vector(384);

-- Recreate the HNSW index on the new dimension
CREATE INDEX "KnowledgeChunk_embedding_idx" ON "KnowledgeChunk" USING hnsw ("embedding" vector_cosine_ops);