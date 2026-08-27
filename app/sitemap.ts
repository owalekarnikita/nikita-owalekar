import type { MetadataRoute } from 'next';

import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
