import { RevealGroup, RevealItem } from '@/components/ui/reveal';
import { stats } from '@/data/stats';

export function Stats() {
  return (
    <section aria-label="At a glance" className="border-y border-border/70 bg-surface/30">
      <div className="container">
        <RevealGroup
          className="grid grid-cols-2 divide-x divide-y divide-border/60 sm:divide-y-0 lg:grid-cols-4"
          stagger={0.07}
        >
          {stats.map((stat, index) => (
            <RevealItem
              key={stat.label}
              className={[
                'group relative px-5 py-8 sm:px-7 sm:py-10',
                index % 2 === 0 ? 'border-l-0 lg:border-l' : '',
                index === 0 ? 'lg:border-l-0' : '',
              ].join(' ')}
            >
              <div className="font-semibold tracking-tight text-[clamp(1.75rem,3.2vw,2.5rem)] leading-none">
                <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent transition-colors duration-300 group-hover:from-accent group-hover:to-accent-secondary">
                  {stat.value}
                </span>
              </div>
              <div className="mt-3 text-sm font-medium text-foreground/90">{stat.label}</div>
              {stat.detail ? (
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{stat.detail}</div>
              ) : null}
              <span
                aria-hidden
                className="absolute inset-x-5 bottom-0 h-px scale-x-0 bg-accent-gradient transition-transform duration-300 ease-smooth group-hover:scale-x-100"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
