/* ---------------------------------------------------------------------------
 * SITE CONFIG — sourced from Nikita_Owalekar_Resume-2.pdf.
 * Anything the résumé does not state is marked [ADD] rather than guessed.
 * ------------------------------------------------------------------------- */

export interface SocialLink {
  label: string;
  href: string;
  /** Key resolved against the icon map in components/ui/social-icon.tsx */
  icon: 'github' | 'linkedin' | 'mail' | 'twitter' | 'globe';
}

export const siteConfig = {
  name: 'Nikita Owalekar',
  /** Navbar logo mark. */
  initials: 'NO',
  role: 'Frontend Developer',
  /** Footer tagline. */
  tagline: 'React.js Developer building fast, accessible and maintainable web interfaces.',
  /** Hero headline. The last two words render in the accent gradient. */
  headline: 'Building fast, scalable and beautiful web experiences.',
  description:
    'Frontend Developer with 3.8+ years of experience building responsive, scalable and high-performance web applications with React.js, Next.js and TypeScript — including enterprise AI, job portal and e-commerce products.',
  /** Set NEXT_PUBLIC_SITE_URL in Vercel once you have a domain. [ADD]
   *  `||` on purpose, not `??` — an env var that exists but is left blank on
   *  the deploy platform is `''`, which `new URL()` in layout.tsx would throw
   *  on rather than silently fall back from. */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nikita-owalekar.vercel.app',
  location: 'Bengaluru, Karnataka, India',
  email: 'nikitakaushal98@gmail.com',
  phone: '+91 8270555456',
  /** The phone number is on your résumé; set false to keep it off the site. */
  showPhone: true,

  resumeUrl: '/Nikita_Owalekar_Resume.pdf',
  /** Filename the browser saves the résumé as. */
  resumeFileName: 'Nikita_Owalekar_Resume.pdf',

  /**
   * Availability pill in the hero. You are currently employed — set
   * `show: false` any time you would rather not signal this.
   */
  availability: {
    show: true,
    label: 'Open to exciting opportunities',
  },

  /** Demo-content pill. Off: the content below is real. */
  showPlaceholderNotice: false,

  /**
   * Which theme a first-time visitor sees. 'system' follows the OS setting;
   * 'dark' / 'light' force a starting point. Returning visitors always get
   * whatever they last chose with the toggle.
   */
  defaultTheme: 'dark' as 'dark' | 'light' | 'system',

  /**
   * GitHub is intentionally absent: the résumé does not list a profile URL.
   * Add it here and in data/github.ts (`show: true`) to switch the section on.
   */
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/nikita-o', icon: 'linkedin' },
    // { label: 'GitHub', href: 'https://github.com/<your-handle>', icon: 'github' }, // [ADD]
  ] as SocialLink[],

  /**
   * Where the form posts. Defaults to this site's own route handler, which
   * sends the message straight to your inbox via Resend — no mail app involved.
   * Requires RESEND_API_KEY in Vercel (free tier, no domain needed; see README).
   *
   * Swap in a hosted service (Formspree / Web3Forms / Basin) by setting
   * NEXT_PUBLIC_FORM_ENDPOINT — they accept the same { name, email, message }
   * JSON. Set it to an empty string to go back to `mailto:`.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '/api/contact',

  /**
   * Safety net for the window before RESEND_API_KEY exists (or if the provider
   * ever goes down): hand the message to the visitor's mail app instead of
   * showing a failure. Set false to never open a mail app — the visitor is then
   * asked to email you directly instead.
   */
  mailtoFallback: true,
} as const;

export const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
] as const;

/** Section ids observed for the navbar's active-link indicator. */
export const sectionIds = ['about', 'skills', 'experience', 'projects', 'contact'] as const;

export const seo = {
  title: `${siteConfig.name} | ${siteConfig.role}`,
  description: siteConfig.description,
  keywords: [
    'Nikita Owalekar',
    'Frontend Developer',
    'React.js Developer',
    'React Developer Bengaluru',
    'Next.js Developer',
    'TypeScript',
    'Redux Toolkit',
    'Tailwind CSS',
    'React Native',
    'AI Integration',
    'LLM API Integration',
  ],
  /** Twitter/X handle without the @, or leave empty to omit the tag. */
  twitterHandle: '',
} as const;
