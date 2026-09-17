'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { EASE } from '@/lib/motion';

export interface LightboxShot {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Click-to-enlarge gallery. The grid below stays the same figures the case
 * study always rendered; this only adds a full-screen viewer on top, with
 * keyboard and backdrop dismissal, so nothing changes for anyone whose JS
 * fails to load.
 */
export function ScreenshotLightbox({ screenshots }: { screenshots: LightboxShot[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current === null ? current : (current + 1) % screenshots.length));
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + screenshots.length) % screenshots.length,
        );
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, screenshots.length]);

  const active = activeIndex !== null ? screenshots[activeIndex] : null;

  return (
    <>
      <div className="space-y-6">
        {screenshots.map((shot, index) => (
          <figure key={shot.src}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View larger screenshot: ${shot.alt}`}
              className="group glass relative block aspect-[16/10] w-full overflow-hidden text-left"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 800px, 100vw"
                className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.02]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-background/40 group-hover:opacity-100"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border border-border/70 bg-surface/90 text-foreground backdrop-blur">
                  <ZoomIn size={18} strokeWidth={1.75} aria-hidden />
                </span>
              </span>
            </button>
            {shot.caption ? (
              <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
                {shot.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md sm:p-8"
            onClick={() => setActiveIndex(null)}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close screenshot viewer"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-surface/80 text-foreground transition-colors hover:bg-elevated sm:right-6 sm:top-6"
            >
              <X size={18} aria-hidden />
            </button>

            {screenshots.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveIndex((current) =>
                      current === null ? current : (current - 1 + screenshots.length) % screenshots.length,
                    );
                  }}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border/70 bg-surface/80 text-foreground transition-colors hover:bg-elevated sm:left-6"
                >
                  <ChevronLeft size={20} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveIndex((current) =>
                      current === null ? current : (current + 1) % screenshots.length,
                    );
                  }}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border/70 bg-surface/80 text-foreground transition-colors hover:bg-elevated sm:right-6"
                >
                  <ChevronRight size={20} aria-hidden />
                </button>
              </>
            ) : null}

            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-2xl border border-border/70 bg-surface"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </motion.div>

            {active.caption || screenshots.length > 1 ? (
              <p
                onClick={(event) => event.stopPropagation()}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-muted-foreground"
              >
                {active.caption ? `${active.caption} — ` : ''}
                {screenshots.length > 1 ? `${activeIndex + 1} / ${screenshots.length}` : ''}
              </p>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
