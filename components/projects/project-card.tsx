import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { TechChip } from '@/components/ui/badge';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

/**
 * Large alternating project slab. The whole card is a link to the case study;
 * the GitHub / Demo actions are separate links stacked above it, so the card
 * stays one tab stop plus one per action instead of a nest of links.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  const hasLinks = Boolean(project.links.github || project.links.demo);

  return (
    <article className="group relative">
      <div
        className={cn(
          'glass edge-light grid overflow-hidden transition-[border-color,box-shadow,transform] duration-500 ease-smooth',
          'hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift lg:grid-cols-2',
        )}
      >
        {/* Media */}
        <div className={cn('relative', reversed && 'lg:order-2')}>
          <Link
            href={`/projects/${project.slug}`}
            tabIndex={-1}
            aria-hidden
            className="block h-full"
          >
            <div className="relative aspect-[16/10] h-full w-full overflow-hidden bg-elevated">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={index === 0}
                loading={index === 0 ? undefined : 'lazy'}
                className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className={cn(
                  'pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent',
                  reversed ? 'lg:bg-gradient-to-l' : 'lg:bg-gradient-to-r',
                )}
              />
            </div>
          </Link>

          <span className="absolute left-4 top-4 rounded-full border border-border/70 bg-background/80 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground backdrop-blur">
            {project.category} · {project.year}
          </span>
        </div>

        {/* Content */}
        <div className={cn('flex flex-col justify-center gap-5 p-7 sm:p-9', reversed && 'lg:order-1')}>
          <div>
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-2xl"
              >
                {project.title}
              </Link>
            </h3>
            <p className="mt-1.5 text-sm text-accent">{project.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
              {project.summary}
            </p>
          </div>

          <dl className="grid gap-4 border-y border-border/60 py-5 sm:grid-cols-2">
            <div>
              <dt className="eyebrow text-[0.65rem]">Problem</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {project.problem}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-[0.65rem]">My contribution</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {project.contribution}
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <TechChip key={tech}>{tech}</TechChip>
            ))}
          </div>

          <div className="relative z-10 mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
              Read case study
              <ArrowRight
                size={15}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>

            {hasLinks ? <span aria-hidden className="h-4 w-px bg-border" /> : null}

            {!hasLinks && project.linksNote ? (
              <span className="text-xs text-muted-foreground">{project.linksNote}</span>
            ) : null}

            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github size={15} strokeWidth={1.75} aria-hidden />
                GitHub
                <span className="sr-only"> repository for {project.title}</span>
              </a>
            ) : null}

            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink size={15} strokeWidth={1.75} aria-hidden />
                Live Demo
                <span className="sr-only"> of {project.title}</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
