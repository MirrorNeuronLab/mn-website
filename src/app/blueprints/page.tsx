import BlueprintSearch from '@/components/blueprints/BlueprintSearch';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import { getBlueprintCategories, getBlueprints } from '@/lib/blueprints';
import { absoluteUrl, createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Blueprints',
  path: '/blueprints',
  description:
    'Search MirrorNeuron blueprints for durable AI workflows, long-running agents, background workers, research loops, marketing automation, finance risk monitoring, and edge workflows.',
  keywords: [
    'MirrorNeuron blueprints',
    'AI workflow blueprints',
    'durable AI workflow examples',
    'long-running agent examples',
    'background worker blueprints',
  ],
});

export default function BlueprintsPage() {
  const blueprints = getBlueprints();
  const categories = getBlueprintCategories(blueprints);

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'MirrorNeuron Blueprints',
            description:
              'Searchable catalog of reusable blueprints for durable AI workflows.',
            url: absoluteUrl('/blueprints'),
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: blueprints.map((blueprint, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: blueprint.name,
                description: blueprint.summary,
                url: blueprint.href,
              })),
            },
          }),
        }}
      />
      <PageHeader
        eyebrow="Blueprints"
        title="Search reusable AI workflow blueprints"
        description="Start from working durable workflows for research, marketing, finance, DevOps, operations, science, and edge automation. Sorted by newest update by default."
      />
      <BlueprintSearch blueprints={blueprints} categories={categories} />
    </PageShell>
  );
}
