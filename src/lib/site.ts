import type { Metadata } from 'next';

export const siteConfig = {
  name: 'MirrorNeuron',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mirrorneuron.io',
  docsUrl: 'https://doc.mirrorneuron.io',
  repoUrl: 'https://github.com/MirrorNeuronLab/MirrorNeuron',
  changelogUrl: 'https://github.com/MirrorNeuronLab/MirrorNeuron/releases',
  installCommand: 'curl -fsSL https://mn.io/install.sh | bash',
  title: 'MirrorNeuron | Simple Durable AI Workflow Runtime',
  description:
    'MirrorNeuron is an open-source runtime for durable AI workflows, long-running agents, and background workers. Build in normal Python or TypeScript without Airflow or Temporal complexity.',
  ogDescription:
    'Run long-lived AI agents and durable workflows in Python or TypeScript without heavyweight orchestration.',
  keywords: [
    'durable AI workflows',
    'AI workflow runtime',
    'long-running AI agents',
    'Temporal alternative',
    'Airflow alternative',
    'AI orchestration',
    'self-hosted AI workflows',
    'background AI workers',
    'Python workflow runtime',
    'TypeScript workflow runtime',
  ],
};

export const primaryNav = [
  { label: 'Why Simpler', href: '/#comparison' },
  { label: 'Use Cases', href: '/#use-cases' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Docs', href: siteConfig.docsUrl, external: true },
];

export const useCaseLinks = [
  {
    title: 'Finance',
    href: '/use-cases/finance',
    description: 'Long-running market simulations and monitoring',
  },
  {
    title: 'Science & Research',
    href: '/use-cases/science',
    description: 'Large-scale simulations and iterative research workflows',
  },
  {
    title: 'AI Workers',
    href: '/use-cases/ai-worker',
    description: 'Persistent background agents and automated loops',
  },
];

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.siteUrl).toString();
}

type MetadataOptions = {
  title?: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path = '/',
  keywords = [],
}: MetadataOptions): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
