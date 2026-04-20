import type { Metadata } from 'next';

export const siteConfig = {
  name: 'MirrorNeuron',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mirrorneuron.io',
  docsUrl: 'https://doc.mirrorneuron.io',
  repoUrl: 'https://github.com/MirrorNeuronLab/MirrorNeuron',
  slackUrl:
    'https://join.slack.com/t/mirrorneuron/shared_invite/zt-3ul7awxbl-k_uc1sLhxx05L~AbTdBugw',
  discordUrl: 'https://discord.gg/XmSQqFEz',
  googleAnalyticsId: 'G-JYSGWRMB1R',
  changelogUrl: 'https://github.com/MirrorNeuronLab/MirrorNeuron/releases',
  installCommand: 'curl -fsSL https://mirrorneuron.io/install.sh | bash',
  title: 'MirrorNeuron | Simple Durable AI Workflow Runtime',
  description:
    'MirrorNeuron is an open-source runtime for durable AI workflows, long-running agents, and background workers. Build in your language with normal code, without Airflow or Temporal complexity.',
  ogDescription:
    'Run long-lived AI agents and durable workflows in your language without heavyweight orchestration.',
  keywords: [
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
