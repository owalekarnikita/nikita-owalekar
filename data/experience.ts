/* ---------------------------------------------------------------------------
 * EXPERIENCE — taken from Nikita_Owalekar_Resume-2.pdf.
 * `location` is omitted where the résumé does not state one; fill it in and it
 * renders automatically. Only claim metrics you can back up in an interview.
 * ------------------------------------------------------------------------- */

export interface ExperienceItem {
  company: string;
  role: string;
  /** Free-form, e.g. "Feb 2026 — Present" */
  duration: string;
  /** Optional — omit and the location line simply does not render. [ADD] */
  location?: string;
  /** Optional employment type shown as a chip: Full-time, Internship, ... */
  type?: string;
  /** 3–5 short, scannable bullets. */
  highlights: string[];
  /** Tech chips shown under the bullets. */
  stack: string[];
  /** Marks the item as the current role (adds a live dot on the timeline). */
  current?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    company: 'Purple Talk',
    role: 'Associate Analyst – Software | Full Stack AI Developer',
    duration: 'Feb 2026 — Present',
    type: 'Full-time',
    current: true,
    highlights: [
      'Sole frontend developer for an enterprise AI document automation platform.',
      'Built React.js and TypeScript components for complex regulatory workflows.',
      'Integrated the frontend with backend AI services and REST APIs.',
      'Worked across frontend architecture, UI development, debugging and feature delivery.',
    ],
    stack: ['React.js', 'TypeScript', 'REST APIs', 'LLM APIs'],
  },
  {
    company: 'FRS Labs',
    role: 'Software Developer',
    duration: 'Dec 2024 — Dec 2025',
    type: 'Full-time',
    highlights: [
      'Developed React.js features and integrated REST APIs.',
      'Reduced production errors by 25% through debugging and code improvements.',
      'Developed reusable components and improved application stability.',
    ],
    stack: ['React.js', 'JavaScript', 'REST APIs'],
  },
  {
    company: 'Tarkashilpa Technologies',
    role: 'Software Developer',
    duration: 'Jul 2022 — Apr 2024',
    type: 'Full-time',
    highlights: [
      'Developed React.js features for auction, hotel booking, job portal and e-commerce applications.',
      'Worked with REST APIs, payment integration and AI integration.',
      'Enhanced React Native applications for iOS and Android.',
      'Built reusable and responsive UI components.',
    ],
    stack: ['React.js', 'Next.js', 'React Native', 'REST APIs', 'Stripe'],
  },
  {
    company: 'Kernify Creations',
    role: 'Software Engineer Intern',
    duration: 'Feb 2022 — May 2022',
    type: 'Internship',
    highlights: [
      'Developed React.js and Tailwind CSS features for task management and e-commerce applications.',
      'Built a responsive music player website.',
    ],
    stack: ['React.js', 'Tailwind CSS'],
  },
];

/** Shown as a compact card under the timeline. */
export const education = {
  show: true,
  degree: 'B.Sc. Information Technology',
  institution: 'Mumbai University – C.K. Thakur A.C.S College',
  /** The résumé does not give dates — add them and they render. [ADD] */
  duration: '',
} as const;

/** Certifications, rendered as chips beside the education card. */
export const certifications = [
  { name: 'React.js Developer Certification', issuer: 'Udemy' },
  { name: 'Full Stack AI Builder Certificate', issuer: 'Purple Talk' },
] as const;
