import { NextRequest, NextResponse } from 'next/server';
import { parseFile } from '@/lib/parse';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) return NextResponse.json({ error: '文件为空' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${uuidv4()}-${file.name}`;
  const filePath = path.join('/tmp', filename);

  await writeFile(filePath, buffer);

  try {
    const extractedText = await parseFile(filePath);
    await writeFile('/tmp/last-product.txt', extractedText, 'utf-8');
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '上传失败' }, { status: 500 });
  }
}
