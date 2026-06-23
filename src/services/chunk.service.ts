import { Chunk } from "../models/chunk.model";
import { chunkText } from "../utils/chunk.util";
import { generateEmbedding } from "./ollama.service";

export const createChunks = async (
    documentId: string,
    text: string
) => {
    const chunks = chunkText(text);

    const documents = [];

    for (let index = 0; index < chunks.length; index++) {
        const chunk = chunks[index];

        console.log(
            `Generating embedding for chunk ${index + 1}/${chunks.length}`
        );

        const embedding =
            await generateEmbedding(chunk);

        console.log("Embedding length:", embedding.length);
        console.log("First 5 values:", embedding.slice(0, 5));

        documents.push({
            documentId,
            chunkIndex: index,
            content: chunk,
            embedding,
        });
    }

    console.log(`Saving ${documents.length} chunks to MongoDB`);
    console.log("First document embedding length:", documents[0].embedding.length);

    return Chunk.insertMany(documents);
};

export const getChunksByDocumentId =
    async (documentId: string) => {
        return Chunk.find({
            documentId,
        }).sort({
            chunkIndex: 1,
        });
    };