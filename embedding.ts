import { OpenAI } from 'langchain/embeddings/openai';
export const embedder = new OpenAI({ modelName: 'text-embedding-3-small' });
export async function getEmbedding(text: string) {
  return embedder.embedQuery(text);
}
