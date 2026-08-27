/* "How I build" — engineering principles. Icons map to lucide-react names. */

export interface Highlight {
  icon: 'gauge' | 'blocks' | 'monitor-smartphone' | 'accessibility' | 'layers' | 'bug';
  title: string;
  description: string;
  /** Short supporting detail, shown smaller. */
  detail: string;
}

export const highlights: Highlight[] = [
  {
    icon: 'blocks',
    title: 'Reusable Components',
    description:
      'Small components with clear props, composed into features. Shared behaviour lives in one place so it is written once and fixed once.',
    detail: 'Composition · Typed props · Shared primitives',
  },
  {
    icon: 'layers',
    title: 'API Integration',
    description:
      'Typed boundaries between responses and components, with loading, empty and error states designed rather than improvised.',
    detail: 'REST APIs · Typed responses · Async states',
  },
  {
    icon: 'monitor-smartphone',
    title: 'Responsive Design',
    description:
      'Mobile-first layouts built with modern CSS and Tailwind, checked across real breakpoints rather than one desktop window.',
    detail: 'Flexbox · Grid · Tailwind CSS',
  },
  {
    icon: 'gauge',
    title: 'Performance',
    description:
      'Measure before optimising. Keep the initial payload small, defer what is not needed for first paint, and keep interactions responsive.',
    detail: 'Code splitting · Lazy loading · Core Web Vitals',
  },
  {
    icon: 'bug',
    title: 'Debugging',
    description:
      'Reproduce, isolate, then fix the cause rather than the symptom — the habit behind a 25% drop in production errors at FRS Labs.',
    detail: 'Root-cause fixes · Stability · Code review',
  },
  {
    icon: 'accessibility',
    title: 'Accessibility',
    description:
      'Semantic HTML first, ARIA only where it adds meaning. Everything reachable by keyboard, with visible focus and readable contrast.',
    detail: 'Semantics · Keyboard paths · Contrast',
  },
];
