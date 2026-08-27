import { ArrowLeft } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="container flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 text-display-md">This page does not exist</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The link may be outdated, or the page may have moved.
      </p>
      <ButtonLink href="/" className="mt-8" size="lg">
        <ArrowLeft size={16} strokeWidth={1.75} aria-hidden />
        Back to home
      </ButtonLink>
    </section>
  );
}
