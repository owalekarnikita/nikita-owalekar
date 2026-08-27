import { NextResponse } from 'next/server';

import { siteConfig } from '@/data/site';

/* ---------------------------------------------------------------------------
 * POST /api/contact — delivers the contact form to your inbox.
 *
 * Uses Resend's HTTP API directly (no SDK, so no extra dependency). Set
 * RESEND_API_KEY in Vercel and mail starts flowing; leave it unset and this
 * route replies 503 `not_configured`, which the form treats as "open the
 * visitor's mail client instead" — so the form is never a dead end.
 *
 * The API key is read server-side only. It has no NEXT_PUBLIC_ prefix, so it
 * can never reach the browser bundle.
 * ------------------------------------------------------------------------- */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const LIMITS = { name: 100, email: 200, message: 4000 } as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Light in-memory throttle. Per serverless instance, so it is a speed bump for
   casual abuse rather than a guarantee — enough for a portfolio contact form. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 500) hits.clear(); // crude ceiling on memory
  return recent.length > MAX_PER_WINDOW;
}

function clientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

interface Payload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  /** Honeypot — real people leave it empty. */
  company?: unknown;
}

function validate(body: Payload) {
  const errors: Record<string, string> = {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name) errors.name = 'Name is required.';
  else if (name.length > LIMITS.name) errors.name = 'Name is too long.';

  if (!email) errors.email = 'Email is required.';
  else if (!EMAIL_PATTERN.test(email) || email.length > LIMITS.email)
    errors.email = 'Email looks invalid.';

  if (message.length < 10) errors.message = 'Message is too short.';
  else if (message.length > LIMITS.message) errors.message = 'Message is too long.';

  return { errors, values: { name, email, message } };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not an error the visitor caused — the form falls back to mailto:.
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Bots fill hidden fields; people do not. Pretend success so they stop trying.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const { errors, values } = validate(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'validation', fields: errors }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  /* Resend's shared sender works with no domain setup, but only delivers to the
     address that owns the Resend account. Verify a domain to change this. */
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';

  const text = [
    `Name:    ${values.name}`,
    `Email:   ${values.email}`,
    '',
    values.message,
    '',
    `— sent from ${siteConfig.url}`,
  ].join('\n');

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#0f1115">
      <h2 style="margin:0 0 16px;font-size:18px">New message from your portfolio</h2>
      <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(values.name)}</p>
      <p style="margin:0 0 16px"><strong>Email:</strong>
        <a href="mailto:${escapeHtml(values.email)}">${escapeHtml(values.email)}</a>
      </p>
      <div style="white-space:pre-wrap;padding:16px;border-radius:12px;background:#f6f7fb;border:1px solid #e6e8f0">
        ${escapeHtml(values.message)}
      </div>
      <p style="margin:16px 0 0;font-size:12px;color:#5a6070">Sent from ${siteConfig.url}</p>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email, // replying in your inbox goes straight to them
        subject: `Portfolio enquiry from ${values.name}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      // Logged server-side only; the visitor gets a generic failure.
      console.error('Resend rejected the message', response.status, await response.text());
      return NextResponse.json({ error: 'send_failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form send threw', error);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
