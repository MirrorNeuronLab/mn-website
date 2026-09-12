import { PageShell } from '@/components/ui/page-shell';
import { WhyHero } from '@/components/why/WhyHero';
import { ProblemSection } from '@/components/why/ProblemSection';
import { PrincipleSection } from '@/components/why/PrincipleSection';
import { ArchitectureSection } from '@/components/why/ArchitectureSection';
import { EdgeSection } from '@/components/why/EdgeSection';
import { InfrastructureSection } from '@/components/why/InfrastructureSection';
import { DynamicSection } from '@/components/why/DynamicSection';
import { ComparisonSection } from '@/components/why/ComparisonSection';
import { ClosingSection } from '@/components/why/ClosingSection';
import { absoluteUrl, createMetadata, jsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Why MirrorNeuron',
  path: '/why',
  description:
    'The missing layer between AI code and dependable execution. MirrorNeuron provides the runtime for long-running AI work on infrastructure you control.',
  keywords: [
    'why MirrorNeuron',
    'durable AI workflows',
    'long-running AI agents',
    'self-hosted AI workflows',
    'Temporal alternative',
    'Airflow alternative',
  ],
});

export default function WhyPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'Why MirrorNeuron',
            description:
              'The missing layer between AI code and dependable execution — a workflow-first runtime for probabilistic intelligence.',
            url: absoluteUrl('/why'),
            inLanguage: 'en-US',
          }),
        }}
      />

      <WhyHero />
      <ProblemSection />
      <PrincipleSection />
      <ArchitectureSection />
      <EdgeSection />
      <InfrastructureSection />
      <DynamicSection />
      <ComparisonSection />
      <ClosingSection />
    </PageShell>
  );
}
