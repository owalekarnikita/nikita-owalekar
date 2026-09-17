'use client';

import type { PointerEvent, ReactNode } from 'react';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

/**
 * Cursor-following radial glow. Tracks the pointer via CSS custom properties
 * (cheap — no re-renders) and fades in on hover. `pointer-events-none` keeps
 * it purely decorative, so it never intercepts clicks on the real content.
 * Skipped entirely on touch — there's no hover to spotlight.
 */
export function Spotlight({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={handlePointerMove} className={cn('group/spot relative', className)}>
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 ease-smooth group-hover/spot:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), hsl(var(--accent) / 0.14), transparent 70%)',
        }}
      />
    </div>
  );
}
