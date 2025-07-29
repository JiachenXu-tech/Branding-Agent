import fs from 'fs/promises';
import { exec } from 'child_process';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export async function parseFile(filePath: string): Promise<string> {
  if (filePath.endsWith('.mp4')) {
    return new Promise((resolve) => {
      exec(`whisper ${filePath} --language Chinese --output_format txt`, async () => {
        const txtPath = filePath.replace('.mp4', '.txt');
        const txt = await fs.readFile(txtPath, 'utf-8');
        resolve(txt);
      });
    });
  } else if (filePath.endsWith('.pdf')) {
    const buffer = await fs.readFile(filePath);
    const data = await pdfParse(buffer);
    return data.text;
  } else if (filePath.endsWith('.docx')) {
    const buffer = await fs.readFile(filePath);
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else {
    throw new Error('不支持的文件格式');
  }
}
