import { HeroSection } from '@/components/home/HeroSection';
import { HomeSummarySection } from '@/components/home/HomeSummarySection';
import { OnEdgeHardwareSection } from '@/components/home/OnEdgeHardwareSection';
import { QuickstartSection } from '@/components/home/QuickstartSection';
import { createMetadata, siteConfig } from '@/lib/site';

export const metadata = createMetadata({
  description:
    'MirrorNeuron is on-edge AI infrastructure for durable workflows. Run long-running agents near your data first, then move the same normal-code workflow to a laptop, edge node, private cluster, or cloud.',
  keywords: [
    'on-edge AI infrastructure',
    'edge AI runtime',
    'on-edge AI workflows',
    'simple workflow runtime',
    'AI workflow SDK',
    'run AI workflow fast',
    'durable execution for AI agents',
    'background worker runtime',
    'long-running workflow orchestration',
    'OpenClaw workflow runtime',
    'OpenClaw alternative',
  ],
});

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.siteUrl,
      sameAs: [siteConfig.repoUrl],
    },
    {
      '@type': 'SoftwareApplication',
      name: siteConfig.name,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Linux, macOS, Windows',
      description: siteConfig.description,
      url: siteConfig.siteUrl,
      softwareHelp: siteConfig.docsUrl,
      codeRepository: siteConfig.repoUrl,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      description: siteConfig.description,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      <main className="mn-home selection:bg-blue-500/30">
        <HeroSection />
        <OnEdgeHardwareSection />
        <HomeSummarySection />
        <QuickstartSection />
      </main>
    </>
  );
}
