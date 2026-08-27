import { ArrowDown, ArrowRight, Download, Mail } from 'lucide-react';
import Link from 'next/link';

import { ButtonLink } from '@/components/ui/button';
import { siteConfig } from '@/data/site';

/**
 * Server component on purpose: the hero is the LCP element, so it ships zero
 * JavaScript. The entrance is CSS keyframes with staggered delays, which means
 * it also plays with JavaScript disabled and is neutralised automatically by
 * the `prefers-reduced-motion` rule in globals.css.
 */

const words = siteConfig.headline.split(' ');
const ACCENT_WORDS = 2; // how many trailing words get the gradient

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-px w-[min(90rem,100%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container">
        <div className="max-w-4xl">
          {siteConfig.availability.show ? (
            <p className="inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-border/80 bg-surface/60 px-3.5 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="text-xs font-medium text-muted-foreground sm:text-[0.8125rem]">
                {siteConfig.availability.label}
              </span>
            </p>
          ) : null}

          <p className="eyebrow mt-7 animate-fade-up [animation-delay:60ms]">{siteConfig.role}</p>

          {/* Word-by-word reveal — typography first, motion second. */}
          <h1 className="mt-4 text-display-xl">
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="mr-[0.28em] inline-block animate-fade-up"
                style={{ animationDelay: `${120 + index * 50}ms` }}
              >
                {index >= words.length - ACCENT_WORDS ? (
                  <span className="accent-text">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-2xl animate-fade-up text-base leading-relaxed text-muted-foreground [animation-delay:360ms] sm:text-lg">
            {siteConfig.description}
          </p>

          <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:460ms]">
            <ButtonLink href="/#projects" size="lg">
              View Projects
              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </ButtonLink>
            <ButtonLink
              href={siteConfig.resumeUrl}
              variant="secondary"
              size="lg"
              download={siteConfig.resumeFileName}
            >
              <Download size={16} strokeWidth={1.75} aria-hidden />
              Download Resume
            </ButtonLink>
            <ButtonLink href="/#contact" variant="ghost" size="lg">
              <Mail size={16} strokeWidth={1.75} aria-hidden />
              Contact Me
            </ButtonLink>
          </div>
        </div>
      </div>

      <Link
        href="/#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-fade-up items-center gap-2 rounded-full border border-border/70 bg-surface/50 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur transition-colors [animation-delay:800ms] hover:border-accent/40 hover:text-foreground lg:inline-flex"
      >
        Scroll
        <ArrowDown size={13} aria-hidden className="animate-bounce [animation-duration:2s]" />
      </Link>
    </section>
  );
}
