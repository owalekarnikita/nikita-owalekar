import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Github,
  Images,
  Lightbulb,
  Network,
  Target,
  TrendingUp,
  TriangleAlert,
  UserRound,
  Wrench,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { ArchitectureDiagram } from '@/components/projects/architecture-diagram';
import { TechChip } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import type { Project } from '@/data/projects';

function Block({
  id,
  icon,
  title,
  children,
}: {
  id: string;
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-elevated/60 text-accent">
            {icon}
          </span>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
        </div>
        <div className="mt-5">{children}</div>
      </Reveal>
    </section>
  );
}

function List({ items, marker = 'dot' }: { items: string[]; marker?: 'dot' | 'check' }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          {marker === 'check' ? (
            <CheckCircle2 size={16} aria-hidden className="mt-1 shrink-0 text-accent" />
          ) : (
            <span aria-hidden className="mt-[0.5625rem] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudy({ project, next }: { project: Project; next: Project }) {
  const study = project.caseStudy;

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      {/* ---------- Header ---------- */}
      <header className="container">
        <Reveal>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              size={15}
              aria-hidden
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            All projects
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-accent">
              {project.category}
            </span>
            <span className="rounded-full border border-border bg-elevated/60 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground">
              {project.year}
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl text-display-lg">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.links.demo ? (
              <ButtonLink href={project.links.demo} size="md">
                <ExternalLink size={16} strokeWidth={1.75} aria-hidden />
                Live Demo
              </ButtonLink>
            ) : null}
            {project.links.github ? (
              <ButtonLink href={project.links.github} variant="secondary" size="md">
                <Github size={16} strokeWidth={1.75} aria-hidden />
                View Code
              </ButtonLink>
            ) : null}
            {!project.links.demo && !project.links.github ? (
              <p className="rounded-xl border border-border/70 bg-surface/50 px-4 py-2.5 text-xs leading-relaxed text-muted-foreground">
                {project.linksNote ?? 'No public code or demo link for this project.'}
              </p>
            ) : null}
          </div>
        </Reveal>
      </header>

      {/* ---------- Cover ---------- */}
      <div className="container mt-12">
        <Reveal>
          {/* 16:10 matches both the real screenshots and the placeholder
              artwork, so object-cover never crops the top of a UI capture. */}
          <div className="glass relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              sizes="(min-width: 1200px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      {/* ---------- Body ---------- */}
      <div className="container mt-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="min-w-0 space-y-16">
            <Block id="overview" icon={<Lightbulb size={17} strokeWidth={1.75} aria-hidden />} title="Overview">
              <p className="text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
                {study.overview}
              </p>
            </Block>

            <Block id="problem" icon={<TriangleAlert size={17} strokeWidth={1.75} aria-hidden />} title="Problem">
              <List items={study.problem} />
            </Block>

            <Block id="solution" icon={<Target size={17} strokeWidth={1.75} aria-hidden />} title="Solution">
              <List items={study.solution} marker="check" />
            </Block>

            <Block id="role" icon={<UserRound size={17} strokeWidth={1.75} aria-hidden />} title="My Role">
              <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                {study.role.summary}
              </p>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {study.role.responsibilities.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-border/70 bg-surface/50 px-4 py-3 text-sm text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Block>

            <Block
              id="challenges"
              icon={<Wrench size={17} strokeWidth={1.75} aria-hidden />}
              title="Technical Challenges"
            >
              <div className="space-y-4">
                {study.challenges.map((challenge, index) => (
                  <div key={challenge.title} className="glass edge-light glass-hover p-5 sm:p-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-muted-foreground/60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-base font-semibold tracking-tight">{challenge.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {challenge.body}
                    </p>
                  </div>
                ))}
              </div>
            </Block>

            <Block
              id="implementation"
              icon={<Code2 size={17} strokeWidth={1.75} aria-hidden />}
              title="Implementation"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {study.implementation.map((item) => (
                  <div key={item.title} className="rounded-xl border border-border/70 bg-surface/50 p-5">
                    <h3 className="text-sm font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
            </Block>

            <Block
              id="features"
              icon={<CheckCircle2 size={17} strokeWidth={1.75} aria-hidden />}
              title="Key Features"
            >
              <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {study.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} aria-hidden className="mt-0.5 shrink-0 text-accent" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Block>

            {study.architecture?.length ? (
              <Block
                id="architecture"
                icon={<Network size={17} strokeWidth={1.75} aria-hidden />}
                title="Architecture"
              >
                <ArchitectureDiagram layers={study.architecture} />
              </Block>
            ) : null}

            <Block id="results" icon={<TrendingUp size={17} strokeWidth={1.75} aria-hidden />} title="Results">
              <dl className="grid gap-4 sm:grid-cols-3">
                {study.results.map((result) => (
                  <div key={result.label} className="glass p-5">
                    <dt className="eyebrow text-[0.65rem]">{result.label}</dt>
                    <dd className="mt-2 text-base font-semibold tracking-tight">{result.value}</dd>
                    {result.note ? (
                      <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {result.note}
                      </dd>
                    ) : null}
                  </div>
                ))}
              </dl>
            </Block>

            <Block
              id="screenshots"
              icon={<Images size={17} strokeWidth={1.75} aria-hidden />}
              title="Screenshots"
            >
              <div className="space-y-6">
                {study.screenshots.map((shot) => (
                  <figure key={shot.src}>
                    <div className="glass relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1024px) 800px, 100vw"
                        className="object-cover"
                      />
                    </div>
                    {shot.caption ? (
                      <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
                        {shot.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </Block>
          </div>

          {/* ---------- Sidebar ---------- */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="glass p-6">
              <h2 className="text-sm font-semibold tracking-tight">Technologies</h2>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <TechChip key={tech}>{tech}</TechChip>
                ))}
              </div>

              <dl className="mt-6 space-y-4 border-t border-border/70 pt-5 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Category</dt>
                  <dd className="mt-0.5">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Year</dt>
                  <dd className="mt-0.5 font-mono">{project.year}</dd>
                </div>
              </dl>

              {project.links.demo || project.links.github ? (
                <div className="mt-6 flex flex-col gap-2 border-t border-border/70 pt-5">
                  {project.links.demo ? (
                    <ButtonLink href={project.links.demo} size="sm" variant="secondary">
                      <ExternalLink size={14} strokeWidth={1.75} aria-hidden />
                      Live Demo
                    </ButtonLink>
                  ) : null}
                  {project.links.github ? (
                    <ButtonLink href={project.links.github} size="sm" variant="secondary">
                      <Github size={14} strokeWidth={1.75} aria-hidden />
                      GitHub
                    </ButtonLink>
                  ) : null}
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </div>

      {/* ---------- Next project ---------- */}
      <div className="container mt-20">
        <Reveal>
          <Link
            href={`/projects/${next.slug}`}
            className="glass glass-hover edge-light group flex flex-col justify-between gap-6 p-7 sm:flex-row sm:items-center sm:p-9"
          >
            <div>
              <span className="eyebrow">Next project</span>
              <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{next.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{next.tagline}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              Read case study
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
