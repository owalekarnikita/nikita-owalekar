/* ---------------------------------------------------------------------------
 * SKILLS — exactly what the résumé lists, nothing more.
 * `level` is purely visual (a 3-step strength bar). Delete the property from
 * any skill you would rather not rank, or drop a skill entirely.
 * ------------------------------------------------------------------------- */

export type SkillLevel = 'core' | 'strong' | 'working';

export interface Skill {
  name: string;
  level?: SkillLevel;
  /** Optional one-liner shown as a tooltip on hover. */
  note?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  /** lucide-react icon name resolved in components/sections/skills.tsx */
  icon: 'layout' | 'database' | 'sparkles' | 'server' | 'wrench';
  description: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'layout',
    description: 'The core of my day-to-day work.',
    skills: [
      { name: 'React.js', level: 'core', note: 'Hooks, composition, reusable components' },
      { name: 'Next.js', level: 'core', note: 'App Router, SSR, routing' },
      { name: 'TypeScript', level: 'core', note: 'Typed components and API contracts' },
      { name: 'JavaScript', level: 'core', note: 'ES2015+' },
      { name: 'HTML5', level: 'core', note: 'Semantic markup' },
      { name: 'CSS3', level: 'core', note: 'Flexbox, Grid, responsive layouts' },
      { name: 'Tailwind CSS', level: 'core', note: 'Utility composition, design tokens' },
    ],
  },
  {
    id: 'state',
    title: 'State & Data',
    icon: 'database',
    description: 'Application state and server communication.',
    skills: [
      { name: 'Redux Toolkit', level: 'strong', note: 'Slices, thunks, normalised state' },
      { name: 'REST APIs', level: 'core', note: 'Integration, error handling, auth' },
      { name: 'SQL', level: 'working' },
    ],
  },
  {
    id: 'ai',
    title: 'AI Integration',
    icon: 'sparkles',
    description: 'Bringing AI services into product UI.',
    skills: [
      { name: 'LLM API Integration', level: 'strong', note: 'Prompt/response handling in the UI' },
      { name: 'AI Applications', level: 'strong' },
      { name: 'Document Automation', level: 'strong', note: 'Enterprise regulatory workflows' },
    ],
  },
  {
    id: 'platform',
    title: 'Backend & Mobile',
    icon: 'server',
    description: 'Where I work beyond the browser.',
    skills: [
      { name: 'React Native', level: 'strong', note: 'iOS and Android builds' },
      { name: 'Node.js', level: 'working' },
      { name: 'Python', level: 'working' },
      { name: 'FastAPI', level: 'working' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Testing',
    icon: 'wrench',
    description: 'Workflow, debugging and collaboration.',
    skills: [
      { name: 'Git', level: 'core' },
      { name: 'GitHub', level: 'core' },
      { name: 'GitLab', level: 'strong' },
      { name: 'Docker', level: 'working' },
      { name: 'Postman', level: 'strong', note: 'API testing and debugging' },
      { name: 'Swagger', level: 'strong', note: 'API contracts' },
      { name: 'Vitest', level: 'working', note: 'Unit tests' },
    ],
  },
];
