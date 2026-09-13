import { HeroSection } from '@/components/home/HeroSection';
import { HomeSummarySection } from '@/components/home/HomeSummarySection';
import { QuickstartSection } from '@/components/home/QuickstartSection';
import { absoluteUrl, jsonLd, siteConfig } from '@/lib/site';


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
      operatingSystem: 'macOS, Linux, Windows via WSL2',
      isAccessibleForFree: true,
      license: 'https://opensource.org/license/mit',
      author: {
        '@type': 'Organization',
        name: siteConfig.legalName,
      },
      description: 'Open-source runtime for durable AI workflows on local and edge systems.',
      url: siteConfig.siteUrl,
      softwareHelp: siteConfig.docsUrl,
      codeRepository: siteConfig.repoUrl,
      programmingLanguage: ['Python', 'JSON'],
      featureList: [
        'durable AI workflows',
        'long-running agent recovery',
        'checkpoint resume and step retries',
        'human approval checkpoints',
        'event-driven and scheduled runs',
        'resource-aware placement',
        'local and self-hosted deployment',
        'run history and observability',
        'blueprint-based workflow starts',
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
      description: 'Open-source runtime for durable local AI workflows.',
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
        <QuickstartSection />
      </main>
    </>
  );
}
