'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Database, LayoutGrid, Server, Sparkles, Wrench, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { skillGroups, type SkillGroup, type SkillLevel } from '@/data/skills';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';

const icons: Record<SkillGroup['icon'], LucideIcon> = {
  layout: LayoutGrid,
  database: Database,
  sparkles: Sparkles,
  server: Server,
  wrench: Wrench,
};

const levelSteps: Record<SkillLevel, number> = { core: 3, strong: 2, working: 1 };
const levelLabel: Record<SkillLevel, string> = {
  core: 'Core, daily use',
  strong: 'Strong, regular use',
  working: 'Working knowledge',
};

const ALL = 'all';

export function Skills() {
  const [filter, setFilter] = useState<string>(ALL);
  const visible = filter === ALL ? skillGroups : skillGroups.filter((group) => group.id === filter);
  const total = skillGroups.reduce((sum, group) => sum + group.skills.length, 0);

  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="The stack I work in"
        description={`${total} technologies I use in production work, grouped by what they do. Filter to narrow it down.`}
      />

      {/* Filter */}
      <Reveal className="mt-10" delay={0.05}>
        <div role="group" aria-label="Filter skills by category" className="flex flex-wrap gap-2">
          {[{ id: ALL, title: 'All' }, ...skillGroups].map((group) => {
            const isActive = filter === group.id;
            return (
              <button
                key={group.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(group.id)}
                className={cn(
                  'relative rounded-full border px-4 py-2 text-sm transition-colors duration-200',
                  isActive
                    ? 'border-accent/40 text-foreground'
                    : 'border-border text-muted-foreground hover:border-border hover:bg-elevated hover:text-foreground',
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="skill-filter"
                    className="absolute inset-0 rounded-full bg-accent/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{group.title}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Groups */}
      <motion.div layout className="mt-8 grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((group) => {
            const Icon = icons[group.icon];
            return (
              <motion.article
                key={group.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="glass glass-hover edge-light p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-elevated/70 text-accent">
                    <Icon size={18} strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">{group.title}</h3>
                    <p className="text-xs text-muted-foreground">{group.description}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-1">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>
                      <div
                        className="group/skill flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-colors duration-200 hover:bg-elevated/70"
                        title={skill.note}
                      >
                        <span className="whitespace-nowrap text-sm text-foreground/90">
                          {skill.name}
                        </span>

                        {/* The note is a tooltip rather than inline text: at card
                            width it would squeeze longer skill names onto two lines. */}
                        <span className="flex shrink-0 items-center gap-2">
                          {skill.level ? (
                            <span
                              className="flex items-center gap-1"
                              aria-label={levelLabel[skill.level]}
                              title={levelLabel[skill.level]}
                            >
                              {[1, 2, 3].map((step) => (
                                <span
                                  key={step}
                                  aria-hidden
                                  className={cn(
                                    'h-1 w-4 rounded-full transition-colors duration-200',
                                    step <= levelSteps[skill.level as SkillLevel]
                                      ? 'bg-accent/70 group-hover/skill:bg-accent'
                                      : 'bg-border',
                                  )}
                                />
                              ))}
                            </span>
                          ) : null}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
