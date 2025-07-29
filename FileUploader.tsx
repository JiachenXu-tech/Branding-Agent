'use client';
import { useState } from 'react';

export default function FileUploader({ endpoint }: { endpoint: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async () => {
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    await fetch(endpoint, { method: 'POST', body: form });
    setUploading(false);
    alert('上传成功');
  };

  return (
    <div className="my-4">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        onClick={upload}
        className="ml-2 px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        disabled={!file || uploading}
      >
        {uploading ? '上传中…' : '上传'}
      </button>
    </div>
  );
}
