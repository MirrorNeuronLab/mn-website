import BlueprintSearch from '@/components/blueprints/BlueprintSearch';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import { getBlueprintCategories, getBlueprints } from '@/lib/blueprints';
import { absoluteUrl, createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Blueprints',
  path: '/blueprints',
  description:
    'Search the current MirrorNeuron blueprint catalog for on-edge AI workflows, durable agents, background workers, science simulations, finance monitors, and reusable workflow examples you can run and customize.',
  keywords: [
    'MirrorNeuron blueprints',
    'on-edge AI workflow blueprints',
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
              'Searchable catalog of reusable blueprints for on-edge durable AI workflows.',
            url: absoluteUrl('/blueprints'),
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: blueprints.map((blueprint, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: blueprint.name,
                description: blueprint.summary,
                url: blueprint.href,
                dateModified: blueprint.updatedAt,
              })),
            },
          }),
        }}
      />
      <PageHeader
        title="Search reusable on-edge AI workflow blueprints"
        description="Start with a runnable workflow, inspect the metadata, run the command, then replace mock inputs or adapters with your own data, tools, and code."
      />
      <BlueprintSearch blueprints={blueprints} categories={categories} />
    </PageShell>
  );
}
