import { Chunk } from "../models/chunk.model";
import { generateEmbedding } from "./ollama.service";
import { calculateSimilarity } from "../utils/vector.util";

export const searchRelevantChunks = async (
  documentId: string,
  question: string,
  limit = 3
) => {
  const questionEmbedding =
    await generateEmbedding(question);

const chunks = await Chunk.find({
  documentId,
});
  const scoredChunks = chunks.map((chunk) => ({
    chunk,
    score: calculateSimilarity(
      questionEmbedding,
      chunk.embedding
    ),
  }));

  scoredChunks.sort(
    (a, b) => b.score - a.score
  );
  
  return scoredChunks
  .slice(0, limit)
  .map((item) => ({
    score: item.score,
    content: item.chunk.content,
  }));

};