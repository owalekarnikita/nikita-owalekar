import { Github, Globe, Linkedin, Mail, Twitter, type LucideIcon } from 'lucide-react';

import type { SocialLink } from '@/data/site';
import { cn } from '@/lib/utils';

const iconMap: Record<SocialLink['icon'], LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
  globe: Globe,
};

export function SocialIconLink({
  social,
  className,
  size = 18,
}: {
  social: SocialLink;
  className?: string;
  size?: number;
}) {
  const Icon = iconMap[social.icon];

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      title={social.label}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-muted-foreground',
        'transition-[color,border-color,background-color,transform] duration-200 ease-smooth',
        'hover:border-border hover:bg-elevated hover:text-foreground hover:-translate-y-0.5',
        className,
      )}
    >
      <Icon size={size} strokeWidth={1.75} aria-hidden />
    </a>
  );
}

export { iconMap };
