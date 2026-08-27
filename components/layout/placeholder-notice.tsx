'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

import { siteConfig } from '@/data/site';

/**
 * Honest-content guard: while the demo data is still in place this pill makes
 * it obvious. Set `showPlaceholderNotice: false` in data/site.ts to remove it.
 */
export function PlaceholderNotice() {
  const [dismissed, setDismissed] = useState(false);
  if (!siteConfig.showPlaceholderNotice || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden max-w-xs sm:block">
      <div className="glass flex items-start gap-3 rounded-xl px-3.5 py-2.5 shadow-soft">
        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Demo content — replace the files in{' '}
          <code className="font-mono text-foreground/90">/data</code> with your own.
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss placeholder notice"
          className="-mr-1 -mt-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
        >
          <X size={13} aria-hidden />
        </button>
      </div>
    </div>
  );
}
