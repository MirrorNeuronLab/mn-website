import { HeroSection } from '@/components/home/HeroSection';
import { HomeSummarySection } from '@/components/home/HomeSummarySection';
import { OnEdgeHardwareSection } from '@/components/home/OnEdgeHardwareSection';
import { QuickstartSection } from '@/components/home/QuickstartSection';
import { UseCasesSection } from '@/components/home/UseCasesSection';
import { absoluteUrl, createMetadata, jsonLd, siteConfig } from '@/lib/site';

export const metadata = createMetadata({
  description:
    'MirrorNeuron is the simplest way to run durable AI workflows. Build long-running agents and background workers in normal code, with persisted state, retries, and recovery built in.',
  keywords: [
    'open-source AI workflow runtime',
    'simple durable AI workflows',
    'durable AI workflow runtime',
    'edge AI runtime',
    'on-edge AI workflows',
    'simple workflow runtime',
    'AI workflow SDK',
    'run AI workflow fast',
    'durable execution for AI agents',
    'background workflow runtime',
    'long-running workflow orchestration',
  ],
});

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.siteUrl,
      logo: absoluteUrl('/mn-logo.svg'),
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
      programmingLanguage: ['Python', 'JSON'],
      featureList: [
        'durable AI workflows',
        'long-running agent recovery',
        'blueprint-based workflow starts',
        'local and self-hosted deployment',
        'normal-code workflow authoring',
      ],
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
      inLanguage: 'en-US',
      publisher: {
        '@type': 'Organization',
        name: siteConfig.legalName,
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(siteSchema) }}
      />
      <main className="mn-home selection:bg-blue-500/30">
        <HeroSection />
        <HomeSummarySection />
        <UseCasesSection />
        <OnEdgeHardwareSection />
        <QuickstartSection />
      </main>
    </>
  );
}
