import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function Badge({
  children,
  className,
  tone = 'default',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'accent' | 'muted';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.7rem] font-medium tracking-wide',
        tone === 'default' && 'border-border bg-elevated/70 text-muted-foreground',
        tone === 'accent' && 'border-accent/30 bg-accent/10 text-accent',
        tone === 'muted' && 'border-transparent bg-muted text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Technology chip with a hover state — used in cards and the case study. */
export function TechChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg border border-border/80 bg-surface/60 px-2.5 py-1 text-xs text-muted-foreground',
        'transition-colors duration-200 hover:border-accent/40 hover:text-foreground',
        className,
      )}
    >
      {children}
    </span>
  );
}
