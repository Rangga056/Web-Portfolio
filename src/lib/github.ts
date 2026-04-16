import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export async function fetchGitHubProfile(username: string) {
  try {
    const { data: profile } = await octokit.rest.users.getByUsername({ username });
    const { data: repos } = await octokit.rest.repos.listForUser({ 
      username, 
      sort: "updated", 
      per_page: 100 
    });

    // Fetch user events for "Contribution Activity"
    const { data: events } = await octokit.rest.activity.listPublicEventsForUser({
      username,
      per_page: 20
    });

    return {
      username: profile.login,
      alias: "Eclipse404",
      name: profile.name || profile.login,
      avatar_url: profile.avatar_url,
      bio: profile.bio,
      location: profile.location,
      stats: {
        repositories: profile.public_repos,
        stars: repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0),
        followers: profile.followers,
        following: profile.following
      },
      public_repositories: repos.map(repo => ({
        name: repo.name,
        stars: repo.stargazers_count,
        language: repo.language || "Unknown",
        desc: repo.description,
        url: repo.html_url
      })),
      events: events.slice(0, 10).map(e => ({
        type: e.type,
        repo: e.repo.name,
        date: e.created_at,
        payload: e.payload
      }))
    };
  } catch (error) {
    console.error("GitHub API Fetch Error:", error);
    return null;
  }
}
