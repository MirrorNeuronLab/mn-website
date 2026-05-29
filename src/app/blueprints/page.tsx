import BlueprintSearch from '@/components/blueprints/BlueprintSearch';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import { getBlueprintCategories, getBlueprints } from '@/lib/blueprints';
import { absoluteUrl, createMetadata, jsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Blueprints',
  path: '/blueprints',
  description:
    'Search the current MirrorNeuron blueprint catalog for reliable local AI workflows, durable agents, science simulations, finance monitors, and reusable workflow examples you can run and customize.',
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
              'Searchable catalog of reusable blueprints for on-edge durable AI workflows.',
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
        title="Run your first AI workflow from a blueprint."
        description="Blueprints are runnable workflow templates with agents, manifests, recovery behavior, and example inputs. Start with one command, then replace mock inputs with your own tools and data."
      />
      <BlueprintSearch blueprints={blueprints} categories={categories} />
    </PageShell>
  );
}
