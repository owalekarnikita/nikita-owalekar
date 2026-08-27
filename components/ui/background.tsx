import { cn } from '@/lib/utils';

/**
 * Page-level ambience. Pure CSS: two blurred radial washes and a masked grid.
 * No canvas, no per-frame JS, no layout impact — it is `pointer-events-none`
 * and sits behind everything at z-index 0.
 */
export function PageBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Masked grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.55] mask-fade-b dark:opacity-40" />
      {/* Aurora washes */}
      <div
        className="absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-3/4 rounded-full opacity-[0.22] blur-[120px] animate-aurora-drift dark:opacity-30"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -top-24 right-0 h-[32rem] w-[32rem] translate-x-1/4 rounded-full opacity-[0.18] blur-[120px] animate-aurora-drift dark:opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent-secondary)) 0%, transparent 70%)',
          animationDelay: '-8s',
        }}
      />
      {/* Vignette so content stays readable over the wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
    </div>
  );
}

/** Local grid used inside cards and panels. */
export function GridOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-40 mask-fade-b',
        className,
      )}
    />
  );
}

/** Thin gradient divider used between major sections. */
export function SectionDivider() {
  return (
    <div aria-hidden className="container">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
