import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { PlaceholderNotice } from '@/components/layout/placeholder-notice';
import { MotionProvider } from '@/components/theme/motion-provider';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { BackToTop } from '@/components/ui/back-to-top';
import { PageBackground } from '@/components/ui/background';
import { education, experience } from '@/data/experience';
import { seo, siteConfig } from '@/data/site';
import { skillGroups } from '@/data/skills';
import { THEME_STORAGE_KEY } from '@/lib/theme';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  // Only the weights the design actually uses.
  weight: ['400', '500', '600', '700'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: seo.title,
    description: seo.description,
    siteName: seo.title,
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    ...(seo.twitterHandle ? { creator: `@${seo.twitterHandle}` } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfd' },
    { media: '(prefers-color-scheme: dark)', color: '#07080b' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

/* Applies the stored (or system) theme before first paint — no flash, and no
   theme dependency in the bundle. Kept to a single expression on purpose. */
const themeScript = `(function(){try{var p='${siteConfig.defaultTheme}';var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=s?s==='dark':p==='system'?window.matchMedia('(prefers-color-scheme: dark)').matches:p==='dark';var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.classList.add('dark');}})();`;

const currentRole = experience.find((item) => item.current);

/* Built from the same data the page renders, so the structured data cannot
   drift away from the visible content. */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  ...(siteConfig.showPhone && siteConfig.phone ? { telephone: siteConfig.phone } : {}),
  address: { '@type': 'PostalAddress', addressLocality: siteConfig.location },
  sameAs: siteConfig.socials.map((social) => social.href),
  knowsAbout: skillGroups.flatMap((group) => group.skills.map((skill) => skill.name)),
  ...(currentRole
    ? { worksFor: { '@type': 'Organization', name: currentRole.company } }
    : {}),
  ...(education.show
    ? { alumniOf: { '@type': 'EducationalOrganization', name: education.institution } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      /* When a fixed default is configured we render the class server-side, so
         the first paint is already correct even before the script runs — and
         stays correct with JavaScript disabled. */
      className={`${inter.variable} ${mono.variable}${
        siteConfig.defaultTheme === 'dark' ? ' dark' : ''
      }`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without JS the scroll-triggered reveals never fire, so show them
            outright. React escapes children of <noscript>, hence the raw HTML. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<style>[style*="opacity:0"]{opacity:1!important;transform:none!important}</style>',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-svh">
        <ThemeProvider>
          <MotionProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:border focus:border-border focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
            >
              Skip to content
            </a>
            <PageBackground />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <BackToTop />
            <PlaceholderNotice />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
