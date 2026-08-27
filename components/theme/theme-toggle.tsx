'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/theme/theme-provider';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} theme` : 'Toggle theme'}
      aria-pressed={mounted ? isDark : undefined}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-muted-foreground',
        'transition-[color,border-color,background-color] duration-200 ease-smooth',
        'hover:border-border hover:bg-elevated hover:text-foreground',
        className,
      )}
    >
      {/* Both icons render; only one is visible, so there is no layout shift
          and no mismatch between the server and client markup. */}
      <Sun
        size={18}
        strokeWidth={1.75}
        aria-hidden
        className="absolute rotate-0 scale-100 transition-transform duration-300 ease-smooth dark:-rotate-90 dark:scale-0"
      />
      <Moon
        size={18}
        strokeWidth={1.75}
        aria-hidden
        className="absolute rotate-90 scale-0 transition-transform duration-300 ease-smooth dark:rotate-0 dark:scale-100"
      />
    </button>
  );
}
