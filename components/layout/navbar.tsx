'use client';

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { ButtonLink } from '@/components/ui/button';
import { SocialIconLink } from '@/components/ui/social-icon';
import { navLinks, sectionIds, siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const pathname = usePathname();
  const isHome = pathname === '/';

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  /* Solid-ish blurred bar only after the hero starts scrolling away. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Active-section indicator. IntersectionObserver instead of scroll math so
     the main thread stays free while scrolling. */
  useEffect(() => {
    if (!isHome) return;
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  /* Lock scroll and close on Escape while the mobile sheet is open. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-smooth',
        scrolled
          ? 'border-b border-border/70 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav aria-label="Main" className="container flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg"
          aria-label={`${siteConfig.name} — home`}
        >
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-border bg-surface font-mono text-xs font-semibold tracking-tight">
            <span className="absolute inset-0 bg-accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative transition-colors duration-300 group-hover:text-white">
              {siteConfig.initials}
            </span>
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = link.href.split('#')[1];
            const isActive = isHome && active === id;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative rounded-lg px-3 py-2 text-sm transition-colors duration-200',
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-px bg-accent-gradient"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 sm:flex">
            {siteConfig.socials.map((social) => (
              <SocialIconLink key={social.label} social={social} />
            ))}
          </div>
          <ThemeToggle />
          <ButtonLink
            href={siteConfig.resumeUrl}
            variant="secondary"
            size="sm"
            className="ml-1 hidden lg:inline-flex"
            download={siteConfig.resumeFileName}
          >
            <FileText size={15} strokeWidth={1.75} aria-hidden />
            Resume
          </ButtonLink>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-elevated hover:text-foreground md:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Reading progress — doubles as the bar's bottom border while scrolled */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className={cn(
          'h-px origin-left bg-accent-gradient transition-opacity duration-300',
          scrolled ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Mobile sheet */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container flex flex-col py-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block rounded-lg px-2 py-3 text-base text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 flex items-center gap-2 border-t border-border pt-4">
                <ButtonLink
                  href={siteConfig.resumeUrl}
                  variant="secondary"
                  size="sm"
                  onClick={close}
                  download={siteConfig.resumeFileName}
                >
                  <FileText size={15} strokeWidth={1.75} aria-hidden />
                  Resume
                </ButtonLink>
                <div className="flex items-center gap-1">
                  {siteConfig.socials.map((social) => (
                    <SocialIconLink key={social.label} social={social} />
                  ))}
                </div>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
