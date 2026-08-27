import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CaseStudy } from '@/components/projects/case-study';
import { getProjectBySlug, projects } from '@/data/projects';
import { siteConfig } from '@/data/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Every case study is statically generated at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project not found' };

  const description = `${project.summary} — a case study by ${siteConfig.name}.`;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${project.title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url.replace(/\/$/, '')}/projects/${project.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | ${siteConfig.name}`,
      description,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    author: { '@type': 'Person', name: siteConfig.name },
    keywords: project.tech.join(', '),
    url: `${siteConfig.url.replace(/\/$/, '')}/projects/${project.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudy project={project} next={next} />
    </>
  );
}
