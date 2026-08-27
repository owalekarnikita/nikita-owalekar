import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Experience } from '@/components/sections/experience';
import { GitHubSection } from '@/components/sections/github';
import { Hero } from '@/components/sections/hero';
import { Highlights } from '@/components/sections/highlights';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { Stats } from '@/components/sections/stats';
import { SectionDivider } from '@/components/ui/background';
import { githubConfig } from '@/data/github';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Highlights />
      <SectionDivider />
      {/* Off until a GitHub handle is configured in data/github.ts — better an
          absent section than a placeholder profile. */}
      {githubConfig.show ? (
        <>
          <GitHubSection />
          <SectionDivider />
        </>
      ) : null}
      <Contact />
    </>
  );
}
