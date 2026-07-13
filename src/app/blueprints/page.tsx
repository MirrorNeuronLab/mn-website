import BlueprintSearch from '@/components/blueprints/BlueprintSearch';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import { getBlueprintCategories, getBlueprints } from '@/lib/blueprints';
import { absoluteUrl, createMetadata, jsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Blueprints',
  path: '/blueprints',
  description:
    'Browse runnable MirrorNeuron blueprints for durable agents, background workers, research loops, finance monitors, and other AI workflows you can customize.',
  keywords: [
    'MirrorNeuron blueprints',
    'on-edge AI workflow blueprints',
    'AI workflow blueprints',
    'durable AI workflow examples',
    'long-running agent examples',
    'background workflow blueprints',
  ],
});

export default async function BlueprintsPage() {
  const blueprints = await getBlueprints();
  const categories = getBlueprintCategories(blueprints);

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'MirrorNeuron Blueprints',
            description:
              'Searchable catalog of runnable blueprints for durable AI workflows.',
            url: absoluteUrl('/blueprints'),
            inLanguage: 'en-US',
            keywords: [
              'durable AI workflows',
              'workflow blueprints',
              'long-running AI agents',
              'background workflows',
            ],
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: blueprints.map((blueprint, index) => {
                const softwareSourceCode = {
                  '@type': 'SoftwareSourceCode',
                  name: blueprint.name,
                  description: blueprint.summary,
                  codeRepository: blueprint.href,
                  keywords: blueprint.tags.join(', '),
                  programmingLanguage: 'Python',
                  ...(blueprint.updatedAt
                    ? { dateModified: blueprint.updatedAt }
                    : {}),
                };

                return {
                  '@type': 'ListItem',
                  position: index + 1,
                  name: blueprint.name,
                  description: blueprint.summary,
                  url: blueprint.href,
                  ...(blueprint.updatedAt
                    ? { dateModified: blueprint.updatedAt }
                    : {}),
                  item: softwareSourceCode,
                };
              }),
            },
          }),
        }}
      />
      <PageHeader
        title="Start with a workflow that already runs."
        description="Blueprints package the agents, workflow definition, recovery behavior, and example inputs. Run one with a single command, inspect the result, then replace the example pieces with your own code, tools, and data."
      />
      <BlueprintSearch blueprints={blueprints} categories={categories} />
    </PageShell>
  );
}
