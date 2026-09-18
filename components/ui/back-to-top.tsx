'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { EASE } from '@/lib/motion';

const SHOW_AFTER_PX = 560;

/**
 * Fixed bottom-right, icon-only — no visible label, just a tooltip via
 * aria-label/title, matching how SocialIconLink does it elsewhere. Appears
 * once the hero has scrolled past.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    // No explicit 'smooth' — this defers to <html>'s CSS scroll-behavior,
    // which the reduced-motion media query in globals.css already collapses
    // to instant, so that preference is respected for free.
    window.scrollTo({ top: 0 });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 8 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-surface/80 text-muted-foreground shadow-soft backdrop-blur-xl transition-[color,border-color,background-color,transform,box-shadow] duration-200 ease-smooth hover:-translate-y-0.5 hover:border-accent/40 hover:bg-elevated hover:text-accent hover:shadow-lift focus-visible:rounded-full"
        >
          <ChevronUp size={20} strokeWidth={2} aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
