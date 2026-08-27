import 'server-only';

import { githubConfig, githubProfile, repositories, type Repo } from '@/data/github';

/**
 * SERVER ONLY. GITHUB_TOKEN (if set) never leaves the server bundle — this
 * module is imported by a server component and guarded by `server-only`.
 * Every failure path falls back to the static data in data/github.ts.
 */

const API = 'https://api.github.com';
const REVALIDATE_SECONDS = 60 * 60; // 1 hour

function headers(): HeadersInit {
  const base: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const token = process.env.GITHUB_TOKEN;
  return token ? { ...base, Authorization: `Bearer ${token}` } : base;
}

export interface GitHubData {
  profile: typeof githubProfile;
  repos: Repo[];
  isLive: boolean;
}

export async function getGitHubData(): Promise<GitHubData> {
  const fallback: GitHubData = { profile: githubProfile, repos: repositories, isLive: false };

  if (!githubConfig.live || !githubConfig.username || githubConfig.username === 'your-username') {
    return fallback;
  }

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${githubConfig.username}`, {
        headers: headers(),
        next: { revalidate: REVALIDATE_SECONDS },
      }),
      fetch(`${API}/users/${githubConfig.username}/repos?sort=updated&per_page=6`, {
        headers: headers(),
        next: { revalidate: REVALIDATE_SECONDS },
      }),
    ]);

    if (!profileRes.ok || !reposRes.ok) return fallback;

    const profileJson = (await profileRes.json()) as {
      name?: string;
      public_repos?: number;
      followers?: number;
      following?: number;
    };

    const reposJson = (await reposRes.json()) as Array<{
      name: string;
      description: string | null;
      html_url: string;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      topics?: string[];
      fork: boolean;
    }>;

    return {
      profile: {
        name: profileJson.name ?? githubProfile.name,
        publicRepos: profileJson.public_repos ?? githubProfile.publicRepos,
        followers: profileJson.followers ?? githubProfile.followers,
        following: profileJson.following ?? githubProfile.following,
      },
      repos: reposJson
        .filter((repo) => !repo.fork)
        .slice(0, 6)
        .map((repo) => ({
          name: repo.name,
          description: repo.description ?? 'No description provided.',
          url: repo.html_url,
          language: repo.language ?? 'Code',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          topics: repo.topics?.slice(0, 3),
        })),
      isLive: true,
    };
  } catch {
    return fallback;
  }
}
