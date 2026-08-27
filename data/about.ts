/* About section copy + the code-style card rendered beside it. */

export const about = {
  eyebrow: 'About',
  heading: 'Frontend engineering, end to end.',
  paragraphs: [
    'I am a Frontend Developer based in Bengaluru with 3.8+ years of experience building web applications in React.js, Next.js and TypeScript. My work has spanned enterprise software, job portals, e-commerce and AI-powered products.',
    'Right now I am the sole frontend developer on an enterprise AI document automation platform, building React and TypeScript components for complex regulatory workflows and wiring them up to backend AI services and REST APIs.',
    'Before that I shipped features across auction, hotel booking, job portal and e-commerce applications, worked on React Native builds for iOS and Android, and spent a lot of time on the parts that decide whether a UI holds up: reusable components, API integration, state management and debugging.',
  ],
  /** Rendered as a syntax-highlighted object. Keys/values are free-form. */
  profileCard: {
    filename: 'nikita.ts',
    declaration: 'const engineer',
    entries: [
      { key: 'role', value: "'frontend developer'" },
      { key: 'based', value: "'bengaluru, in'" },
      { key: 'stack', value: "['react', 'next', 'typescript']" },
      { key: 'state', value: "['redux toolkit', 'rest apis']" },
      { key: 'ai', value: "'llm api integration'" },
      { key: 'alsoWrites', value: "['react native', 'python']" },
    ],
  },
  /** Short capability chips under the copy. */
  focusAreas: [
    'Component architecture',
    'Responsive UI',
    'API integration',
    'State management',
    'AI/LLM integration',
    'Debugging',
  ],
} as const;
