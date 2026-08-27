import { Award, Briefcase, GraduationCap, MapPin } from 'lucide-react';

import { TechChip } from '@/components/ui/badge';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { certifications, education, experience } from '@/data/experience';

export function Experience() {
  return (
    <Section id="experience" className="relative">
      <SectionHeading
        eyebrow="Experience"
        title="Where I have worked"
        description="Roles, responsibilities and the work I shipped in each."
      />

      <div className="relative mt-14">
        {/* Timeline rail */}
        <div
          aria-hidden
          className="absolute left-[0.4375rem] top-2 h-full w-px bg-gradient-to-b from-accent/50 via-border to-transparent sm:left-[0.5625rem]"
        />

        <RevealGroup as="ol" className="space-y-10 sm:space-y-12" stagger={0.12}>
          {experience.map((item) => (
            <RevealItem as="li" key={`${item.company}-${item.duration}`} className="relative pl-8 sm:pl-12">
              {/* Node */}
              <span
                aria-hidden
                className="absolute left-0 top-1.5 grid h-[0.9375rem] w-[0.9375rem] place-items-center rounded-full border border-border bg-background sm:h-[1.1875rem] sm:w-[1.1875rem]"
              >
                <span
                  className={
                    item.current
                      ? 'h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_hsl(var(--accent)/0.18)] sm:h-2 sm:w-2'
                      : 'h-1.5 w-1.5 rounded-full bg-muted-foreground/50 sm:h-2 sm:w-2'
                  }
                />
              </span>

              <article className="glass glass-hover edge-light p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{item.role}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 font-medium text-accent">
                        <Briefcase size={14} strokeWidth={1.75} aria-hidden />
                        {item.company}
                      </span>
                      {item.location ? (
                        <>
                          <span
                            aria-hidden
                            className="hidden h-1 w-1 rounded-full bg-border sm:inline-block"
                          />
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={14} strokeWidth={1.75} aria-hidden />
                            {item.location}
                          </span>
                        </>
                      ) : null}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <span className="font-mono text-xs tracking-wide text-muted-foreground">
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      {item.current ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 text-[0.7rem] font-medium text-success">
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-success" />
                          Current
                        </span>
                      ) : null}
                      {item.type ? (
                        <span className="rounded-full border border-border bg-elevated/60 px-2.5 py-0.5 text-[0.7rem] text-muted-foreground">
                          {item.type}
                        </span>
                      ) : null}
                    </span>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span
                        aria-hidden
                        className="mt-[0.5625rem] h-1 w-1 shrink-0 rounded-full bg-accent/60"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-border/70 pt-5">
                  {item.stack.map((tech) => (
                    <TechChip key={tech}>{tech}</TechChip>
                  ))}
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {education.show || certifications.length ? (
        <Reveal className="mt-10 grid gap-4 md:grid-cols-2" delay={0.1}>
          {education.show ? (
            <div className="glass flex flex-wrap items-center justify-between gap-4 p-5 sm:px-6">
              <div className="flex items-center gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-elevated/70 text-muted-foreground">
                  <GraduationCap size={18} strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">{education.degree}</h3>
                  <p className="text-sm text-muted-foreground">{education.institution}</p>
                </div>
              </div>
              {education.duration ? (
                <span className="font-mono text-xs text-muted-foreground">{education.duration}</span>
              ) : null}
            </div>
          ) : null}

          {certifications.length ? (
            <div className="glass p-5 sm:px-6">
              <div className="flex items-center gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-elevated/70 text-muted-foreground">
                  <Award size={18} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="text-sm font-semibold tracking-tight">Certifications</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {certifications.map((certification) => (
                  <li
                    key={certification.name}
                    className="flex flex-wrap items-baseline gap-x-2 text-sm text-muted-foreground"
                  >
                    <span className="text-foreground/90">{certification.name}</span>
                    <span aria-hidden className="text-border">
                      ·
                    </span>
                    <span className="font-mono text-xs">{certification.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Reveal>
      ) : null}
    </Section>
  );
}
