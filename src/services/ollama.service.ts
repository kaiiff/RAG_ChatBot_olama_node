import axios, { AxiosResponse } from "axios";

export const generateEmbedding = async (
  text: string
): Promise<number[]> => {
  const response: AxiosResponse = await axios.post(
    "http://localhost:11434/api/embeddings",
    {
      model: "nomic-embed-text",
      prompt: text,
    }
  );

  return response.data.embedding;
};

export const generateAnswer = async (
  prompt: string
): Promise<string> => {
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "llama3",
      prompt,
      stream: false,
    }
  );

  return response.data.response;
};