import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_PATH = path.join(process.cwd(), 'src/content');

export interface ContentData {
  id: string;
  frontmatter: { [key: string]: unknown };
  content: string;
  type: 'markdown' | 'json';
}

export async function getContent(filePath: string): Promise<ContentData | null> {
  try {
    const fullPath = path.join(CONTENT_PATH, filePath);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    if (filePath.endsWith('.json')) {
      return {
        id: filePath,
        frontmatter: {},
        content: fileContents,
        type: 'json'
      };
    }

    const { data, content } = matter(fileContents);

    return {
      id: filePath,
      frontmatter: data,
      content: content,
      type: 'markdown'
    };
  } catch (error) {
    console.error(`Error loading content for ${filePath}:`, error);
    return null;
  }
}
