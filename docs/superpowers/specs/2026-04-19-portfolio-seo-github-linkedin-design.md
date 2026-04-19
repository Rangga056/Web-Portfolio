# Portfolio SEO, GitHub, and LinkedIn Integration Design

## Goal
Improve the portfolio's discoverability (SEO), ensure the GitHub profile displays accurate featured repositories with live data (specifically fixing the project repo link), and fix broken social links.

## Architecture
- **SEO**: Dynamic Sitemap generation and enhanced Metadata in the root layout.
- **GitHub**: Hybrid data approach. Curated project details (images, descriptions) live in `github.json`, while dynamic stats (stars, followers) are merged from the GitHub API at runtime.
- **UI**: Direct fix of the LinkedIn URL in the status bar component.

## Components

### 1. SEO & Sitemap
- **Sitemap**: A new `src/app/sitemap.ts` file using Next.js 15+ `sitemap()` function.
  - Will crawl `src/content/projects`, `src/content/lab`, and `src/content/me` to generate URLs.
  - Base URL: `https://muhammadrangga.com` (Placeholder).
- **Metadata**: Enhanced `src/app/layout.tsx`.
  - Add `openGraph`, `twitter`, and `robots` fields.
  - Use `portfolio-homepage.png` as the default OG image.

### 2. GitHub Integration (The Merge Fix)
- **`src/lib/github.ts`**: Update `fetchGitHubProfile` to return a structure that can be easily merged or includes the full repo list.
- **`src/app/api/content/route.ts`**:
  - Read `src/content/me/github.json`.
  - Fetch live data from GitHub API.
  - Loop through `top_repositories` in the JSON.
  - Update `stars` and `language` from live data.
  - Return the merged object.
- **Repository Fix**: Update the primary repository URL from `ultimate-portofolio` to `Web-Portfolio`.

### 3. Featured Repositories
The following repositories will be featured in `github.json`:
1. `Web-Portfolio` (formerly ultimate-portofolio)
2. `budget-tracking-app`
3. `airbnb-clone`
4. `eclipse-estate`
5. `eclipse-summit`
6. `sentiment-dashboard`

### 4. LinkedIn Fix
- File: `src/components/shell/StatusBar.tsx`
- Replace `https://linkedin.com` with `https://www.linkedin.com/in/muhammad-rangga-miftahul-falah-136595249/`.

## Success Criteria
- Sitemap is accessible at `/sitemap.xml`.
- Metadata includes title, description, and OG tags.
- GitHub page shows the 6 chosen repositories with live star counts.
- LinkedIn icon in status bar opens the correct profile.
