/* Quick stats. Every value below is backed by the résumé — keep it that way. */

export interface Stat {
  value: string;
  label: string;
  /** Optional one-line clarification shown under the label. */
  detail?: string;
}

export const stats: Stat[] = [
  {
    value: '3.8+',
    label: 'Years Experience',
    detail: 'Frontend development since 2022',
  },
  {
    value: 'React',
    label: 'Primary Framework',
    detail: 'With Next.js for production apps',
  },
  {
    value: 'TypeScript',
    label: 'Strongly Typed',
    detail: 'Typed components and API contracts',
  },
  {
    // Your differentiator — the résumé lists LLM API integration and an
    // enterprise AI document automation platform.
    value: 'AI',
    label: 'LLM Integration',
    detail: 'AI services wired into real product UI',
  },
];
