import type { Metadata } from 'next';

export const siteConfig = {
  name: 'MirrorNeuron',
  legalName: 'MirrorNeuron Lab',
  siteUrl: 'https://www.mirrorneuron.io/',
  docsUrl: 'https://doc.mirrorneuron.io',
  repoUrl: 'https://github.com/MirrorNeuronLab/MirrorNeuron',
  slackUrl:
    'https://join.slack.com/t/mirrorneuron/shared_invite/zt-3ul7awxbl-k_uc1sLhxx05L~AbTdBugw',
  discordUrl: 'https://discord.gg/XmSQqFEz',
  googleAnalyticsId: 'G-JYSGWRMB1R',
  changelogUrl: 'https://github.com/MirrorNeuronLab/MirrorNeuron/releases',
  installCommand: 'curl -fsSL https://mirrorneuron.io/install.sh | bash',
  ogImagePath: '/og/mirrorneuron-home.png',
  title: 'MirrorNeuron — Local AI Agent Runtime for Durable Workflows',
  description:
    'Open-source runtime for durable AI workflows on local and edge systems, with state, retries, checkpoints, recovery, and resource-aware execution.',
  ogDescription:
    'Open-source runtime for durable AI workflows that keep running, recover from failure, and stay on your PCs, workstations, or private swarm.',
  socialTitle: 'MirrorNeuron — Run Deep AI Agents on Your Own Computers',
  twitterDescription:
    'Open-source runtime for durable AI workflows that keep running, recover from failure, and stay on your own machines.',
  imageAlt: 'MirrorNeuron — open-source runtime for durable local AI workflows',
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
}: MetadataOptions): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const url = absoluteUrl(path);
  const image = {
    url: absoluteUrl(siteConfig.ogImagePath),
    width: 1200,
    height: 630,
    alt: siteConfig.imageAlt,
    type: 'image/png',
  };

  return {
    title: title ?? { absolute: siteConfig.title },
    description,
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
      locale: 'en_US',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
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
