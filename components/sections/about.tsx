import { Check } from 'lucide-react';

import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { about } from '@/data/about';
import { scaleIn } from '@/lib/motion';

export function About() {
  return (
    <Section id="about">
      <div className="grid min-w-0 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 [&>*]:min-w-0">
        {/* Copy */}
        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent-gradient" />
              <span className="eyebrow">{about.eyebrow}</span>
            </div>
            <h2 className="mt-4 text-display-md">{about.heading}</h2>
          </Reveal>

          <RevealGroup className="mt-6 space-y-5" stagger={0.09}>
            {about.paragraphs.map((paragraph) => (
              <RevealItem key={paragraph.slice(0, 24)} as="p">
                <span className="block text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
                  {paragraph}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2" stagger={0.05}>
            {about.focusAreas.map((area) => (
              <RevealItem key={area} className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="grid h-5 w-5 shrink-0 place-items-center rounded-md border border-accent/25 bg-accent/10 text-accent"
                >
                  <Check size={12} strokeWidth={2.5} />
                </span>
                <span className="text-sm text-foreground/85">{area}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Code card */}
        <Reveal variants={scaleIn}>
          <figure className="glass edge-light overflow-hidden shadow-soft">
            {/* Window chrome */}
            <div className="flex items-center gap-3 border-b border-border/70 bg-elevated/50 px-4 py-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {about.profileCard.filename}
              </span>
            </div>

            <figcaption className="sr-only">
              A code snippet summarising my focus areas as a frontend engineer.
            </figcaption>

            <pre className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-[1.9] sm:p-6">
              <code>
                <span className="text-muted-foreground">{about.profileCard.declaration}</span>
                <span className="text-foreground/70"> = </span>
                <span className="text-foreground/70">{'{'}</span>
                {'\n'}
                {about.profileCard.entries.map((entry) => (
                  <span key={entry.key}>
                    {'  '}
                    <span className="text-accent">{entry.key}</span>
                    <span className="text-foreground/60">: </span>
                    <span className="text-foreground/90">{entry.value}</span>
                    <span className="text-foreground/60">,</span>
                    {'\n'}
                  </span>
                ))}
                <span className="text-foreground/70">{'}'}</span>
                <span className="text-foreground/60">;</span>
              </code>
            </pre>

            {/* Subtle gradient wash in the corner */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
              style={{ background: 'radial-gradient(circle, hsl(var(--accent-secondary)), transparent 70%)' }}
            />
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
