/* ---------------------------------------------------------------------------
 * GITHUB / OPEN SOURCE
 *
 * The résumé does not list a GitHub profile URL, so this section is switched
 * OFF — the site would otherwise show a placeholder handle to recruiters.
 *
 * To turn it on:
 *   1. set `show: true`
 *   2. put your handle in `username` and `profileUrl`
 *   3. list the repositories you actually want shown in `repositories`
 *   4. optionally set `live: true` to pull the profile + repos from the GitHub
 *      API at build time (server-side only, revalidated hourly)
 *   5. add the GitHub entry back to `socials` in data/site.ts
 * ------------------------------------------------------------------------- */

export interface Repo {
  name: string;
  description: string;
  url: string;
  language: string;
  stars?: number;
  forks?: number;
  topics?: string[];
}

export const githubConfig = {
  /** Master switch for the whole section. */
  show: false,
  username: '', // [ADD] your GitHub handle
  profileUrl: '', // [ADD] https://github.com/<your-handle>
  /** Fetch live profile + repos instead of the static list below. */
  live: false,
  /** The grid is illustrative until `live` is enabled. */
  showContributionGraph: true,
  blurb:
    'Where I keep experiments, small utilities and the reference implementations I reach for. The list below is curated rather than exhaustive.',
} as const;

/** Static fallback profile numbers. */
export const githubProfile = {
  name: 'Nikita Owalekar',
  publicRepos: 0, // [ADD]
  followers: 0, // [ADD]
  following: 0, // [ADD]
};

/** Curated repositories. [ADD] — replace with real repositories. */
export const repositories: Repo[] = [];
