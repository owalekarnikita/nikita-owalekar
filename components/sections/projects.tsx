import { ArrowRight } from 'lucide-react';

import { ProjectCard } from '@/components/projects/project-card';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { Section, SectionHeading } from '@/components/ui/section';
import { featuredProjects } from '@/data/projects';

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Selected Work"
        title="Featured projects"
        description="A few projects with the reasoning behind them — the problem, the approach and what I owned."
      />

      <div className="mt-14 space-y-8 lg:space-y-12">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index === 0 ? 0 : 0.05}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center" delay={0.05}>
        <ButtonLink href="/#contact" variant="secondary" size="lg">
          Have something similar in mind?
          <ArrowRight
            size={16}
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
