'use client';
import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import ResultDisplay from '@/components/ResultDisplay';

export default function HomePage() {
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    const res = await fetch('/api/generate', { method: 'POST' });
    const data = await res.json();
    setResult(data);
  };

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">品牌传播内容生成助手</h1>
      <section className="mb-6">
        <h2 className="font-semibold">1. 上传历史传播资料</h2>
        <FileUploader endpoint="/api/upload-history" />
      </section>
      <section className="mb-6">
        <h2 className="font-semibold">2. 上传新产品文档</h2>
        <FileUploader endpoint="/api/upload-product" />
      </section>
      <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded">生成内容</button>
      {result && <ResultDisplay result={result} />}
    </main>
  );
}
