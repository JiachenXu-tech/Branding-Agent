import { getStore } from './vector-store';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { RetrievalQAChain } from 'langchain/chains';

export async function generateContent(newText: string) {
  const store = await getStore();
  const retriever = store.asRetriever();
  const model = new ChatOpenAI({ modelName: 'gpt-4' });
  const chain = RetrievalQAChain.fromLLM(model, retriever);
  const response = await chain.call({ query: `根据以下新内容生成一篇符合品牌调性的传播内容，并给出3个标题建议：${newText}` });
  return JSON.parse(response.text);
}
