import { ArrowUpRight, FileText, Mail, MapPin, Phone } from 'lucide-react';

import { ContactForm } from '@/components/sections/contact-form';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { iconMap } from '@/components/ui/social-icon';
import { contact } from '@/data/contact';
import { siteConfig } from '@/data/site';

const headingWords = contact.heading.split(' ');

export function Contact() {
  const channels = [
    {
      label: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      Icon: Mail,
      external: false,
    },
    ...(siteConfig.showPhone && siteConfig.phone
      ? [
          {
            label: 'Phone',
            value: siteConfig.phone,
            href: `tel:${siteConfig.phone.replace(/\s+/g, '')}`,
            Icon: Phone,
            external: false,
          },
        ]
      : []),
    ...siteConfig.socials.map((social) => ({
      label: social.label,
      value: social.href.replace(/^https?:\/\/(www\.)?/, ''),
      href: social.href,
      Icon: iconMap[social.icon],
      external: true,
    })),
    {
      label: 'Resume',
      value: 'Download PDF',
      href: siteConfig.resumeUrl,
      Icon: FileText,
      external: false,
    },
  ];

  return (
    <Section id="contact" className="relative overflow-hidden">
      {/* Section-local wash so the final CTA feels like a destination */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full opacity-[0.16] blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--accent-secondary)) 45%, transparent 72%)',
        }}
      />

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent-gradient" />
              <span className="eyebrow">{contact.eyebrow}</span>
            </div>
            <h2 className="mt-4 text-display-lg">
              {headingWords.slice(0, -1).join(' ')}{' '}
              <span className="accent-text">{headingWords.at(-1)}</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {contact.subheading}
            </p>
          </Reveal>

          <Reveal className="mt-9" delay={0.08}>
            <ul className="divide-y divide-border/60 border-y border-border/60">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : channel.label === 'Resume'
                        ? { download: siteConfig.resumeFileName }
                        : {})}
                    className="group flex items-center gap-4 py-4 transition-colors"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-elevated/50 text-muted-foreground transition-colors duration-200 group-hover:border-accent/40 group-hover:text-accent">
                      <channel.Icon size={17} strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted-foreground">{channel.label}</span>
                      <span className="block truncate text-sm text-foreground transition-colors group-hover:text-accent">
                        {channel.value}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden
                      className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={15} strokeWidth={1.75} aria-hidden />
              {siteConfig.location}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <ContactForm />
          <p className="mt-4 text-center text-xs text-muted-foreground">{contact.responseNote}</p>
        </Reveal>
      </div>
    </Section>
  );
}
