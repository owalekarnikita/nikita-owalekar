/**
 * Shared between the pre-paint inline script (server) and the theme provider
 * (client). It must live outside any 'use client' module: importing a value
 * from a client module into a server component yields a client reference, not
 * the string — which would silently corrupt the inline script.
 */
export const THEME_STORAGE_KEY = 'portfolio-theme';
export type Theme = 'light' | 'dark';
