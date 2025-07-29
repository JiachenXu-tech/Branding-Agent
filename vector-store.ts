import { FaissStore } from 'langchain/vectorstores/faiss';
import { embedder } from './embedding';

let store: FaissStore | null = null;
export async function getStore() {
  if (!store) store = await FaissStore.fromTexts([], [], embedder);
  return store;
}
