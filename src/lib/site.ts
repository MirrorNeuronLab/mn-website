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
  title: 'MirrorNeuron | On-Edge AI Infrastructure for Durable Workflows',
  description:
    'MirrorNeuron is open-source on-edge AI infrastructure for durable workflows, long-running agents, and background workers. Run near your data first, with cloud deployment when you need it.',
  ogDescription:
    'Run durable AI workflows on laptops, edge nodes, private clusters, or cloud without heavyweight orchestration.',
  keywords: [
    'on-edge AI infrastructure',
    'edge AI runtime',
    'on-edge AI workflow runtime',
    'durable AI workflows',
    'AI workflow runtime',
    'long-running AI agents',
    'Temporal alternative',
    'Airflow alternative',
    'AI orchestration',
    'self-hosted AI workflows',
    'background AI workers',
    'multi-language workflow runtime',
    'developer-friendly workflow runtime',
    'OpenClaw workflow runtime',
    'OpenClaw alternative',
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
    description: 'On-edge market simulations and risk monitors',
  },
  {
    title: 'Science & Research',
    href: '/use-cases/science',
    description: 'Private research workflows near data and lab systems',
  },
  {
    title: 'AI Workers',
    href: '/use-cases/ai-worker',
    description: 'Persistent on-edge agents and automated loops',
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
