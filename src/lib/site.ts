import type { Metadata } from 'next';

export const siteConfig = {
  name: 'MirrorNeuron',
  legalName: 'MirrorNeuron Lab',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mirrorneuron.io',
  docsUrl: 'https://doc.mirrorneuron.io',
  repoUrl: 'https://github.com/MirrorNeuronLab/MirrorNeuron',
  slackUrl:
    'https://join.slack.com/t/mirrorneuron/shared_invite/zt-3ul7awxbl-k_uc1sLhxx05L~AbTdBugw',
  discordUrl: 'https://discord.gg/XmSQqFEz',
  googleAnalyticsId: 'G-JYSGWRMB1R',
  changelogUrl: 'https://github.com/MirrorNeuronLab/MirrorNeuron/releases',
  installCommand: 'curl -fsSL https://mirrorneuron.io/install.sh | bash',
  ogImagePath: '/opengraph-image',
  title: 'MirrorNeuron | Durable AI Workflows, Made Simple',
  description:
    'MirrorNeuron is an open-source runtime for durable AI workflows. Write normal Python or JSON, run on your own infrastructure, and recover from failures without heavyweight orchestration.',
  ogDescription:
    'Run long-running agents and background workflows with persisted state, retries, and recovery—without the orchestration overhead.',
  keywords: [
    'open-source AI workflow runtime',
    'simple durable AI workflows',
    'durable AI workflow runtime',
    'local-first AI orchestration',
    'agent orchestration',
    'edge AI runtime',
    'on-edge AI workflow runtime',
    'durable AI workflows',
    'AI workflow runtime',
    'long-running AI agents',
    'Temporal alternative',
    'Airflow alternative',
    'AI orchestration',
    'self-hosted AI workflows',
    'background AI workflows',
    'multi-language workflow runtime',
    'developer-friendly workflow runtime',
  ],
};

export const primaryNav = [
  { label: 'Why', href: '/why' },
  { label: 'Blueprints', href: '/blueprints' },
  { label: 'Blog', href: '/blog' },
  { label: 'Docs', href: siteConfig.docsUrl, external: true },
];

export const useCaseLinks = [
  {
    title: 'Finance',
    href: '/use-cases/finance',
    description: 'Durable market simulations and risk monitors',
  },
  {
    title: 'Science & Research',
    href: '/use-cases/science',
    description: 'Long-running research workflows near private data',
  },
  {
    title: 'Agent Workflows',
    href: '/use-cases/ai-worker',
    description: 'Background agents that wait, resume, and recover',
  },
];

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
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
  const image = {
    url: absoluteUrl(siteConfig.ogImagePath),
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} durable AI workflows made simple`,
  };

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    category: 'technology',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}
