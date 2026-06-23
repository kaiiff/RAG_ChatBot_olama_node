import { searchRelevantChunks } from "./search.service";
import { generateAnswer } from "./ollama.service";
import { Chat } from "../models/chat.model";

export const askPdf = async (
  documentId: string,
  question: string
)=> {

    console.log("Question:", question);

    const chunks =
    await searchRelevantChunks(
        documentId,
        question,
        3
    );

    console.log(
        "Retrieved Chunks:",
        chunks.length
    );

    const context = chunks
        .map((chunk) => chunk.content)
        .join("\n\n");

    console.log(
        "Context Length:",
        context.length
    );

    const prompt = `
You are a helpful PDF assistant.

Answer ONLY using the provided context.

If the answer is not present in the context,
say:
"I could not find that information in the PDF."

Context:
${context}

Question:
${question}

Answer:
`;

const answer = await generateAnswer(prompt);
await Chat.create({
  documentId,
  question,
  answer,
});

return answer;
};