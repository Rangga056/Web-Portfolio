# Portfolio SEO, GitHub, and LinkedIn Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance SEO, fix GitHub repository data accuracy, and update social links.

**Architecture:** 
- **Metadata**: Next.js 15+ Metadata API in layout.tsx and sitemap.ts.
- **GitHub**: Hybrid API/JSON merging logic in the content API route.
- **UI**: Surgical component updates.

**Tech Stack:** Next.js 15, TypeScript, Octokit.

---

### Task 1: Update Featured Repositories in github.json

**Files:**
- Modify: `src/content/me/github.json`

- [ ] **Step 1: Update featured repositories and primary repo name**

Update the `top_repositories` array to include the 6 selected projects and rename `ultimate-portofolio` to `Web-Portfolio`.

```json
{
  "username": "Rangga056",
  "alias": "Eclipse404",
  "name": "Rangga",
  "avatar_url": "https://avatars.githubusercontent.com/u/136163122?v=4",
  "bio": "👋 Hi, I'm Rangga, a Fullstack Web Developer from Indonesia. Building bridges between logic and intelligence.",
  "location": "East Jakarta, Indonesia",
  "education": "System Information @ Universitas Nasional",
  "stats": {
    "repositories": 42,
    "stars": 34,
    "followers": 16,
    "following": 16,
    "commits": "1000+",
    "prs": "150+",
    "issues": "45"
  },
  "top_repositories": [
    {
      "name": "Web-Portfolio",
      "stars": 0,
      "language": "TypeScript",
      "description": "Functional IDE-inspired developer portfolio with integrated terminal, shell context, and multi-theme support.",
      "url": "https://github.com/Rangga056/Web-Portfolio",
      "image": "/portfolio-homepage.png",
      "layout": "desktop"
    },
    {
      "name": "budget-tracking-app",
      "stars": 0,
      "language": "TypeScript",
      "description": "Full end-to-end PWA budget tracking app with offline-first architecture (Dexie.js) and smart sync.",
      "url": "https://github.com/Rangga056/budget-tracking-app",
      "image": "https://raw.githubusercontent.com/Rangga056/budget-tracking-app/main/client/public/screenshots/dashboard-page-desktop.png",
      "layout": "desktop"
    },
    {
      "name": "airbnb-clone",
      "stars": 0,
      "language": "TypeScript",
      "description": "High-fidelity Airbnb clone using Next.js 14, Clerk Auth, and Prisma ORM.",
      "url": "https://github.com/Rangga056/airbnb-clone",
      "image": "https://github.com/Rangga056/airbnb-clone/assets/136163122/d7f64e59-450c-403c-b068-71db1b6c6d4a",
      "layout": "desktop"
    },
    {
      "name": "eclipse-estate",
      "stars": 0,
      "language": "JavaScript",
      "description": "A comprehensive real estate management platform.",
      "url": "https://github.com/Rangga056/eclipse-estate",
      "image": "/portfolio-homepage.png",
      "layout": "desktop"
    },
    {
      "name": "eclipse-summit",
      "stars": 0,
      "language": "TypeScript",
      "description": "An event management application for organizing and tracking summits.",
      "url": "https://github.com/Rangga056/eclipse-summit",
      "image": "/portfolio-homepage.png",
      "layout": "desktop"
    },
    {
      "name": "sentiment-dashboard",
      "stars": 0,
      "language": "TypeScript",
      "description": "AI-powered dashboard for real-time sentiment analysis.",
      "url": "https://github.com/Rangga056/sentiment-dashboard",
      "image": "/portfolio-homepage.png",
      "layout": "desktop"
    }
  ]
}
```

- [ ] **Step 2: Commit changes**

```bash
git add src/content/me/github.json
git commit -m "feat: update featured repositories to reflect current profile"
```

### Task 2: Implement Live GitHub Data Merging

**Files:**
- Modify: `src/lib/github.ts`
- Modify: `src/app/api/content/route.ts`

- [ ] **Step 1: Update github.ts to return raw repo data**

Modify `fetchGitHubProfile` to return the full repositories list so we can merge it later.

```typescript
// src/lib/github.ts
export async function fetchGitHubProfile(username: string) {
  // ... (existing octokit code)
  return {
    // ... stats
    public_repositories: repos.map(repo => ({
      name: repo.name,
      stars: repo.stargazers_count,
      language: repo.language || "Unknown",
      desc: repo.description,
      url: repo.html_url
    }))
  };
}
```

- [ ] **Step 2: Implement merge logic in API route**

```typescript
// src/app/api/content/route.ts
if (path === "me/github.json") {
  const localContent = await getContent("me/github.json");
  const localData = JSON.parse(localContent?.content || "{}");
  const liveData = await fetchGitHubProfile("Rangga056");

  if (liveData) {
    // Merge live stats into curated top_repositories
    const mergedTopRepos = localData.top_repositories?.map((repo: any) => {
      const liveRepo = liveData.public_repositories.find((r: any) => r.name === repo.name);
      return {
        ...repo,
        stars: liveRepo?.stars ?? repo.stars,
        language: liveRepo?.language ?? repo.language
      };
    });

    return NextResponse.json({
      type: "json",
      content: JSON.stringify({
        ...localData,
        stats: liveData.stats,
        top_repositories: mergedTopRepos
      })
    });
  }
}
```

- [ ] **Step 3: Commit API changes**

```bash
git add src/lib/github.ts src/app/api/content/route.ts
git commit -m "feat: implement live github data merging for featured repos"
```

### Task 3: Create Dynamic Sitemap

**Files:**
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Implement sitemap function**

```typescript
import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://muhammadrangga.com'; // Adjust to your real domain
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

- [ ] **Step 2: Commit sitemap**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add dynamic sitemap generation"
```

### Task 4: Enhance Metadata in Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update metadata object**

```typescript
export const metadata: Metadata = {
  title: "Muhammad Rangga Miftahul Falah | Software Engineer",
  description: "Portfolio of Muhammad Rangga Miftahul Falah - Fullstack Developer & AI Automation Enthusiast.",
  keywords: ["Software Engineer", "Fullstack Developer", "AI Automation", "Indonesia", "Muhammad Rangga"],
  openGraph: {
    title: "Muhammad Rangga Miftahul Falah | Software Engineer",
    description: "Portfolio of Muhammad Rangga Miftahul Falah - Fullstack Developer & AI Automation Enthusiast.",
    url: "https://muhammadrangga.com",
    siteName: "Muhammad Rangga Portfolio",
    images: [{ url: "/portfolio-homepage.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Rangga Miftahul Falah | Software Engineer",
    description: "Portfolio of Muhammad Rangga Miftahul Falah - Fullstack Developer & AI Automation Enthusiast.",
    images: ["/portfolio-homepage.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "fT-00BBi_MPf6xCfLtVDbET3LNw_5ZH393qYrwwprDE",
  },
};
```

- [ ] **Step 2: Commit metadata**

```bash
git add src/app/layout.tsx
git commit -m "feat: enhance SEO metadata with OG and Twitter tags"
```

### Task 5: Fix LinkedIn Link in Status Bar

**Files:**
- Modify: `src/components/shell/StatusBar.tsx`

- [ ] **Step 1: Update LinkedIn URL**

```typescript
// Replace line 51
<a href="https://www.linkedin.com/in/muhammad-rangga-miftahul-falah-136595249/" target="_blank" ...>
```

- [ ] **Step 2: Commit UI fix**

```bash
git add src/components/shell/StatusBar.tsx
git commit -m "fix: update broken linkedin link in status bar"
```
