import type { ReactNode } from 'react';

import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

export function Section({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={cn('section-padding scroll-mt-24', className)}>
      <div className={cn('container', containerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  action?: ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        action ? 'md:flex-row md:items-end md:justify-between' : undefined,
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center')}>
          <span aria-hidden className="h-px w-8 bg-accent-gradient" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h2 className="mt-4 text-display-md">{title}</h2>
        {description ? (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
