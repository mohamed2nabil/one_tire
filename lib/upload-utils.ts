import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';

export async function saveLocalFile(file: File, folderPath: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate safe filename
  const extension = file.name.split('.').pop() || 'tmp';
  const safeName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
  
  // Ensure directory exists in public/uploads
  const uploadDir = join(process.cwd(), 'public', 'uploads', folderPath);
  await mkdir(uploadDir, { recursive: true });

  const filePath = join(uploadDir, safeName);
  await writeFile(filePath, buffer);

  // Return the public URL
  return `/uploads/${folderPath}/${safeName}`.replace(/\/+/g, '/');
}

export async function deleteLocalFile(publicUrl: string) {
  if (!publicUrl.startsWith('/uploads/')) return;
  try {
    const filePath = join(process.cwd(), 'public', publicUrl);
    await unlink(filePath);
  } catch (error) {
    console.error('Failed to delete file:', publicUrl, error);
  }
}
