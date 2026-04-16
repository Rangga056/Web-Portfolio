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
    const liveData = await fetchGitHubProfile("Rangga056");
    if (liveData) return NextResponse.json({ type: "json", content: JSON.stringify(liveData) });
  }

  const content = await getContent(path);

  if (!content) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  return NextResponse.json(content);
}
