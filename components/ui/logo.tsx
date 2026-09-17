import { useId } from 'react';

import { cn } from '@/lib/utils';

/**
 * Fixed-dark brand mark — an N/O monogram. Deliberately not theme-aware (unlike
 * the rest of the UI): a logo should read the same regardless of light/dark
 * mode, the same way it would on a business card or a favicon.
 */
export function Logomark({ className }: { className?: string }) {
  const gradientId = useId();

  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn('h-9 w-9', className)}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5479FF" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0B1220" />
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        rx="14.5"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <path
        d="M17 21 L17 44 M17 21 L33 44 M33 21 L33 44"
        fill="none"
        stroke="#F8FAFC"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="47" cy="32.5" r="10.5" fill="none" stroke={`url(#${gradientId})`} strokeWidth="6" />
    </svg>
  );
}
