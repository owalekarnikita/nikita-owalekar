'use client';

import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { contact } from '@/data/contact';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';

/* 'mailto' is its own outcome: the message is not sent yet, it is sitting in
   the visitor's mail client waiting for them to press send. Saying "sent"
   there would be a lie. */
type Status = 'idle' | 'submitting' | 'success' | 'mailto' | 'error';
type Fields = { name: string; email: string; message: string };

const EMPTY: Fields = { name: '', email: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!fields.name.trim()) errors.name = 'Please enter your name.';
  if (!fields.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = 'Please enter a valid email address.';
  if (fields.message.trim().length < 10) errors.message = 'Please write at least 10 characters.';
  return errors;
}

/**
 * Validates, then POSTs the message to `siteConfig.formEndpoint` — by default
 * this site's own /api/contact route, which emails it straight to the inbox.
 * The visitor never leaves the page and no mail app opens.
 *
 * Outcomes:
 *   200  -> "message has been sent"
 *   503  -> no provider key configured yet: fall back to the visitor's mail app
 *           (or show an error if `siteConfig.mailtoFallback` is false)
 *   else -> error, pointing at the email address shown beside the form
 */
export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  /* Hidden from people, irresistible to bots. Filled in => discarded server-side. */
  const [honeypot, setHoneypot] = useState('');

  const update = (key: keyof Fields) => (event: { target: { value: string } }) => {
    setFields((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  /**
   * Opens the visitor's own mail app with the message already written, then
   * they press send. No backend, no API key, nothing to keep running.
   */
  const openMailClient = () => {
    const subject = encodeURIComponent(contact.mail.subject);

    // Line breaks survive encodeURIComponent, so the mail body stays readable.
    const body = encodeURIComponent(
      `Name: ${fields.name}\n` +
        `Email: ${fields.email}\n\n` +
        `Message:\n${fields.message}`,
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    /* No endpoint configured at all: mail app is the only option. Fields stay
       filled, so nothing is lost if the mail app never opens. */
    if (!siteConfig.formEndpoint) {
      openMailClient();
      setStatus('mailto');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch(siteConfig.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, company: honeypot }),
      });

      /* 503 = the route has no mail provider key yet. Not the visitor's fault,
         so fall back to their mail app rather than showing a failure. Once
         RESEND_API_KEY is set this branch never runs. */
      if (response.status === 503) {
        if (siteConfig.mailtoFallback) {
          openMailClient();
          setStatus('mailto');
        } else {
          setStatus('error');
        }
        return;
      }

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);

      // Delivered to the inbox — no mail app, nothing else for the visitor to do.
      setStatus('success');
      setFields(EMPTY);
    } catch {
      setStatus('error');
    }
  }

  const fieldClasses = (hasError: boolean) =>
    cn(
      'w-full rounded-xl border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70',
      'transition-colors duration-200 outline-none focus:border-accent/50 focus:bg-surface',
      hasError ? 'border-red-500/60' : 'border-border',
    );

  return (
    <form onSubmit={onSubmit} noValidate className="glass relative p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            {contact.formLabels.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            placeholder={siteConfig.name}
            className={fieldClasses(Boolean(errors.name))}
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            {contact.formLabels.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={fields.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="jane@company.com"
            className={fieldClasses(Boolean(errors.email))}
          />
          {errors.email ? (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          {contact.formLabels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={update('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          placeholder="Tell me about the role or the project..."
          className={cn(fieldClasses(Boolean(errors.message)), 'resize-y min-h-[7.5rem]')}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: off-screen, skipped by keyboard and hidden from screen readers. */}
      <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave this empty)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <Loader2 size={16} aria-hidden className="animate-spin" />
          ) : (
            <Send size={16} strokeWidth={1.75} aria-hidden />
          )}
          {status === 'submitting' ? contact.formLabels.sending : contact.formLabels.submit}
        </Button>

        {/* Announced to assistive tech without stealing focus. */}
        <p role="status" aria-live="polite" className="text-sm">
          {status === 'success' ? (
            <span className="inline-flex items-center gap-2 text-success">
              <CheckCircle2 size={15} aria-hidden />
              {contact.formLabels.success}
            </span>
          ) : null}
          {status === 'mailto' ? (
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Send size={15} aria-hidden />
              {contact.formLabels.mailto}
            </span>
          ) : null}
          {status === 'error' ? (
            <span className="inline-flex items-center gap-2 text-red-400">
              <AlertCircle size={15} aria-hidden />
              {contact.formLabels.error}
            </span>
          ) : null}
        </p>
      </div>

      {!siteConfig.formEndpoint ? (
        <p className="mt-5 border-t border-border/60 pt-4 text-xs leading-relaxed text-muted-foreground">
          {contact.mail.note}
        </p>
      ) : null}
    </form>
  );
}
