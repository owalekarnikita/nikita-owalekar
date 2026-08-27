import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg' | 'icon';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-xl font-medium ' +
  'transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-smooth ' +
  'disabled:pointer-events-none disabled:opacity-55 active:translate-y-px whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent-gradient text-white shadow-soft hover:shadow-lift hover:-translate-y-0.5 ' +
    'after:absolute after:inset-0 after:rounded-xl after:bg-white/0 after:transition-colors hover:after:bg-white/10',
  secondary:
    'border border-border bg-surface/80 text-foreground backdrop-blur hover:border-accent/40 hover:bg-elevated hover:-translate-y-0.5',
  outline:
    'border border-border bg-transparent text-foreground hover:border-accent/40 hover:bg-elevated/60',
  ghost: 'text-muted-foreground hover:bg-elevated hover:text-foreground',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.95rem]',
  icon: 'h-10 w-10',
};

export interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
}

export function buttonClasses({ variant = 'primary', size = 'md', className }: ButtonBaseProps) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonBaseProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { href: string; external?: boolean };

export function ButtonLink({
  variant,
  size,
  className,
  href,
  external,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  const isExternal = external ?? /^https?:|^mailto:|\.pdf$/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
