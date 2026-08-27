import {
  Accessibility,
  Blocks,
  Bug,
  Gauge,
  Layers,
  MonitorSmartphone,
  type LucideIcon,
} from 'lucide-react';

import { RevealGroup, RevealItem } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { highlights, type Highlight } from '@/data/highlights';

const icons: Record<Highlight['icon'], LucideIcon> = {
  gauge: Gauge,
  blocks: Blocks,
  'monitor-smartphone': MonitorSmartphone,
  accessibility: Accessibility,
  layers: Layers,
  bug: Bug,
};

export function Highlights() {
  return (
    <Section id="how-i-build" className="relative">
      <SectionHeading
        eyebrow="Engineering"
        title="How I build"
        description="The principles I apply on every project, whatever the stack."
      />

      <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/60 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {highlights.map((highlight, index) => {
          const Icon = icons[highlight.icon];
          return (
            <RevealItem
              key={highlight.title}
              className="group relative bg-background p-7 transition-colors duration-300 hover:bg-surface"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px scale-x-0 bg-accent-gradient transition-transform duration-500 ease-smooth group-hover:scale-x-100"
              />
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-elevated/60 text-accent transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5">
                  <Icon size={19} strokeWidth={1.6} aria-hidden />
                </span>
                <span className="font-mono text-xs text-muted-foreground/50">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-5 text-base font-semibold tracking-tight">{highlight.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {highlight.description}
              </p>
              <p className="mt-4 font-mono text-[0.7rem] tracking-wide text-muted-foreground/70">
                {highlight.detail}
              </p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
