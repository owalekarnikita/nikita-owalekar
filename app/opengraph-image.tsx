import { ImageResponse } from 'next/og';

import { siteConfig } from '@/data/site';

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Generated at build time — no static asset to keep in sync with the config. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#07080B',
          padding: '72px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -180,
            left: -80,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(84,121,255,0.35) 0%, rgba(7,8,11,0) 68%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -140,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(7,8,11,0) 68%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#0B1220',
              border: '1px solid rgba(139,92,246,0.35)',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 64 64">
              <path
                d="M17 21 L17 44 M17 21 L33 44 M33 21 L33 44"
                fill="none"
                stroke="#F8FAFC"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="47" cy="32.5" r="10.5" fill="none" stroke="#8B5CF6" strokeWidth="6" />
            </svg>
          </div>
          <div style={{ color: '#8B93A7', fontSize: 26, letterSpacing: 4 }}>
            {siteConfig.role.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ color: '#F4F5F7', fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
            {siteConfig.headline}
          </div>
          <div style={{ color: '#8B93A7', fontSize: 28 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#8B93A7', fontSize: 22 }}>
          <div style={{ width: 40, height: 3, background: 'linear-gradient(90deg, #5479FF, #8B5CF6)' }} />
          React · Next.js · TypeScript · Tailwind CSS
        </div>
      </div>
    ),
    size,
  );
}
