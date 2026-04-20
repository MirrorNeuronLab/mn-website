import { HeroSection } from '@/components/home/HeroSection';
import { HomeSummarySection } from '@/components/home/HomeSummarySection';
import { QuickstartSection } from '@/components/home/QuickstartSection';
import { createMetadata, siteConfig } from '@/lib/site';

export const metadata = createMetadata({
  description:
    'MirrorNeuron is the simple durable runtime for AI workflows. Run your first AI workflow in minutes, then build multi-agent workflows in your language with normal code, without Airflow DAG sprawl or Temporal cluster complexity.',
  keywords: [
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
      name: siteConfig.name,
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
        <HomeSummarySection />
        <QuickstartSection />
      </main>
    </>
  );
}
