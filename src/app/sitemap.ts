import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://muhammadrangga.com';
  const contentDirs = ['projects', 'lab', 'me'];
  
  const staticRoutes = [
    { url: `${baseUrl}/`, lastModified: new Date() },
  ];

  const dynamicRoutes = contentDirs.flatMap(dir => {
    const dirPath = path.join(process.cwd(), 'src/content', dir);
    if (!fs.existsSync(dirPath)) return [];
    
    return fs.readdirSync(dirPath).map(file => {
      const slug = file.replace(/\.(md|json)$/, '');
      return {
        url: `${baseUrl}/${dir}/${slug}`,
        lastModified: new Date(),
      };
    });
  });

  return [...staticRoutes, ...dynamicRoutes];
}
