import { ArrowUpRight, GitFork, Github, Star, Users } from 'lucide-react';

import { Badge, TechChip } from '@/components/ui/badge';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { githubConfig } from '@/data/github';
import { getGitHubData } from '@/lib/github';
import { seededRandom } from '@/lib/utils';

/* 53 weeks x 7 days, generated from a fixed seed so the server and client
   render identical markup. Purely illustrative until live data is enabled. */
const WEEKS = 53;
const DAYS = 7;

function contributionGrid() {
  const random = seededRandom(20240517);
  return Array.from({ length: WEEKS }, (_, _week) =>
    Array.from({ length: DAYS }, (_, day) => {
      const value = random();
      // Weekends lean quieter, which reads more naturally than uniform noise.
      const weighted = day === 0 || day === 6 ? value * 0.55 : value;
      if (weighted < 0.42) return 0;
      if (weighted < 0.62) return 1;
      if (weighted < 0.8) return 2;
      if (weighted < 0.93) return 3;
      return 4;
    }),
  );
}

const levelClass = [
  'bg-muted',
  'bg-accent/25',
  'bg-accent/45',
  'bg-accent/70',
  'bg-accent',
] as const;

/** Server component — the GitHub token, if any, never reaches the client. */
export async function GitHubSection() {
  const { profile, repos, isLive } = await getGitHubData();
  const grid = githubConfig.showContributionGraph ? contributionGrid() : [];

  return (
    <Section id="github">
      <SectionHeading
        eyebrow="Open Source"
        title="On GitHub"
        description={githubConfig.blurb}
        action={
          <a
            href={githubConfig.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-surface/70 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
          >
            <Github size={16} strokeWidth={1.75} aria-hidden />
            @{githubConfig.username}
            <ArrowUpRight
              size={15}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        }
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
        {/* Profile + activity */}
        <Reveal className="flex min-w-0 flex-col gap-5">
          <div className="glass p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-tight">Profile</h3>
              <Badge tone={isLive ? 'accent' : 'default'}>{isLive ? 'live' : 'static'}</Badge>
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-4">
              {[
                { label: 'Repos', value: profile.publicRepos, icon: Github },
                { label: 'Followers', value: profile.followers, icon: Users },
                { label: 'Following', value: profile.following, icon: Users },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                  <dd className="mt-1 font-mono text-xl font-semibold tracking-tight">
                    {/* A placeholder zero reads as a real (bad) number — show a dash. */}
                    {isLive || stat.value ? stat.value : '—'}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {githubConfig.showContributionGraph ? (
            <div className="glass overflow-hidden p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-sm font-semibold tracking-tight">Contribution activity</h3>
                <span className="font-mono text-[0.7rem] text-muted-foreground">last year</span>
              </div>

              <div className="mt-5 w-full overflow-x-auto pb-1">
                <div className="flex w-max gap-[3px]" role="img" aria-label="Illustrative contribution activity grid">
                  {grid.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                      {week.map((level, dayIndex) => (
                        <span
                          key={dayIndex}
                          aria-hidden
                          className={`h-[9px] w-[9px] rounded-[2px] ${levelClass[level]}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="max-w-[22rem] text-[0.7rem] leading-relaxed text-muted-foreground">
                  {isLive
                    ? 'Activity pattern shown for illustration; repository data above is live.'
                    : 'Illustrative pattern — connect the GitHub API to show real activity.'}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[0.65rem] text-muted-foreground">less</span>
                  {levelClass.map((cls, index) => (
                    <span key={index} aria-hidden className={`h-[9px] w-[9px] rounded-[2px] ${cls}`} />
                  ))}
                  <span className="font-mono text-[0.65rem] text-muted-foreground">more</span>
                </div>
              </div>
            </div>
          ) : null}
        </Reveal>

        {/* Repositories */}
        <RevealGroup className="grid min-w-0 gap-4 sm:grid-cols-2" stagger={0.07}>
          {repos.map((repo, index) => (
            <RevealItem key={`${repo.name}-${index}`}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover edge-light group flex h-full flex-col p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-mono text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                    {repo.name}
                  </h3>
                  <ArrowUpRight
                    size={15}
                    aria-hidden
                    className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </div>

                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {repo.description}
                </p>

                {repo.topics?.length ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {repo.topics.map((topic) => (
                      <TechChip key={topic}>{topic}</TechChip>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden className="h-2 w-2 rounded-full bg-accent/70" />
                    {repo.language}
                  </span>
                  {typeof repo.stars === 'number' ? (
                    <span className="inline-flex items-center gap-1">
                      <Star size={13} strokeWidth={1.75} aria-hidden />
                      {repo.stars}
                    </span>
                  ) : null}
                  {typeof repo.forks === 'number' ? (
                    <span className="inline-flex items-center gap-1">
                      <GitFork size={13} strokeWidth={1.75} aria-hidden />
                      {repo.forks}
                    </span>
                  ) : null}
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
