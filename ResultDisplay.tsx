export default function ResultDisplay({ result }: { result: any }) {
  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-xl font-semibold mb-2">生成结果</h2>
      <h3 className="font-medium mb-1">传播内容</h3>
      <p className="bg-gray-100 p-3 rounded whitespace-pre-line">{result.content}</p>
      <h3 className="font-medium mt-4 mb-1">标题建议</h3>
      <ul className="list-disc pl-5">
        {result.titles.map((t: string, i: number) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
