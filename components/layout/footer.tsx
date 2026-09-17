import { Mail } from 'lucide-react';
import Link from 'next/link';

import { Logomark } from '@/components/ui/logo';
import { SocialIconLink } from '@/components/ui/social-icon';
import { navLinks, siteConfig } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70">
      <div className="container py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Logomark />
              <span className="text-sm font-semibold tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3 md:grid-cols-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={siteConfig.resumeUrl}
              download={siteConfig.resumeFileName}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Resume
            </a>
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail size={15} strokeWidth={1.75} aria-hidden />
              {siteConfig.email}
            </a>
            <div className="-ml-2 flex items-center gap-1">
              {siteConfig.socials.map((social) => (
                <SocialIconLink key={social.label} social={social} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-border/70 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Built with{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Next.js
            </a>
            , TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
