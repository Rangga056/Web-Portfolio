import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/lib/content";
import { fetchGitHubProfile } from "@/lib/github";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 });
  }

  // Intercept github.json for live data
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
          top_repositories: mergedTopRepos,
          public_repositories: liveData.public_repositories,
          events: liveData.events
        })
      });
    }
  }

  const content = await getContent(path);

  if (!content) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  return NextResponse.json(content);
}
