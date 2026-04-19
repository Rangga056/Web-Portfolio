# Dynamic Sitemap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a dynamic sitemap for the portfolio that crawls content directories (`projects`, `lab`, `me`) and generates URLs for Next.js.

**Architecture:** Use Next.js 15+ `sitemap` route handler convention. The sitemap function will read the `src/content` directory recursively for specified subdirectories and generate a list of sitemap entries.

**Tech Stack:** Next.js 15, TypeScript, Node.js `fs` and `path` modules.

---

### Task 1: Implement Sitemap Function

**Files:**
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Create the sitemap file**

Create `src/app/sitemap.ts` with the dynamic generation logic.

```typescript
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
```

- [ ] **Step 2: Verify the file exists**

Run: `ls src/app/sitemap.ts`
Expected: `src/app/sitemap.ts`

- [ ] **Step 3: Commit the change**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add dynamic sitemap generation"
```
