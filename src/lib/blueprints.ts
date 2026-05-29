import fs from 'fs';
import path from 'path';

const blueprintsPath = path.join(
  process.cwd(),
  'src/content/blueprints/blueprints.jsonl',
);

const blueprintCatalogUrl =
  'https://raw.githubusercontent.com/MirrorNeuronLab/mn-blueprints/main/index.json';

const categoryOrder = [
  'Finance',
  'Business',
  'Security',
  'Engineering',
  'Science',
  'General',
];

function categoryRank(category: string) {
  const rank = categoryOrder.indexOf(category);
  return rank === -1 ? categoryOrder.length : rank;
}

export type Blueprint = {
  slug: string;
  folder: string;
  name: string;
  summary: string;
  category: string;
  tags: string[];
  updatedAt?: string;
  command: string;
  href: string;
  graphId: string;
  jobName: string;
  recoveryMode: 'local_restart' | 'cluster_recover';
  nodeCount: number;
  daemon: boolean;
  docs: 'README' | 'Manifest';
  targetUsers: string;
  simulationType: string;
  output: string;
  runtimeFeatures: string[];
};

type RemoteBlueprint = {
  category?: string;
  description?: string;
  graph_id?: string;
  id?: string;
  job_name?: string;
  name?: string;
  path?: string;
  type?: string;
  product?: {
    one_line?: string;
    output?: string;
    runtime_features?: string[];
    simulation_type?: string;
    target_users?: string;
  };
};

function sortBlueprints(blueprints: Blueprint[]) {
  return blueprints.sort((a, b) => {
    const categoryDelta = categoryRank(a.category) - categoryRank(b.category);

    if (categoryDelta !== 0) {
      return categoryDelta;
    }

    return a.name.localeCompare(b.name);
  });
}

function localBlueprints(): Blueprint[] {
  if (!fs.existsSync(blueprintsPath)) {
    return [];
  }

  return sortBlueprints(
    fs
      .readFileSync(blueprintsPath, 'utf8')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Blueprint),
  );
}

function createTags(item: RemoteBlueprint, runtimeFeatures: string[]) {
  const category = item.category ? [item.category.toLowerCase()] : [];
  const pathTags = (item.path ?? item.id ?? '')
    .split(/[_/-]/)
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
  const featureTags = runtimeFeatures.map((feature) =>
    feature.trim().toLowerCase().replace(/\s+/g, '-'),
  );

  return Array.from(new Set([...category, ...pathTags, ...featureTags]));
}

function normalizeRemoteBlueprint(item: RemoteBlueprint): Blueprint | null {
  if (!item.id || !item.name) {
    return null;
  }

  const folder = item.path ?? item.id;
  const runtimeFeatures = item.product?.runtime_features ?? [];
  const isDaemon = item.type === 'service';

  return {
    slug: item.id,
    folder,
    name: item.name,
    summary: item.product?.one_line ?? item.description ?? '',
    category: item.category ?? 'General',
    tags: createTags(item, runtimeFeatures),
    command: `mn blueprint run ${item.id}`,
    href: `https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/${folder}`,
    graphId: item.graph_id ?? `${item.id}_v1`,
    jobName: item.job_name ?? item.id.replaceAll('_', '-'),
    recoveryMode: isDaemon ? 'cluster_recover' : 'local_restart',
    nodeCount: 0,
    daemon: isDaemon,
    docs: 'README',
    targetUsers: item.product?.target_users ?? 'Teams building durable AI workflows.',
    simulationType: item.product?.simulation_type ?? 'Runnable workflow blueprint.',
    output: item.product?.output ?? 'Reviewable workflow output and run artifacts.',
    runtimeFeatures,
  };
}

export async function getBlueprints(): Promise<Blueprint[]> {
  try {
    const response = await fetch(blueprintCatalogUrl, {
      next: {
        revalidate: 60 * 60,
        tags: ['blueprint-catalog'],
      },
    });

    if (!response.ok) {
      return localBlueprints();
    }

    const catalog = (await response.json()) as RemoteBlueprint[];

    if (!Array.isArray(catalog)) {
      return localBlueprints();
    }

    const blueprints = catalog
      .map(normalizeRemoteBlueprint)
      .filter((blueprint): blueprint is Blueprint => Boolean(blueprint));

    return blueprints.length > 0 ? sortBlueprints(blueprints) : localBlueprints();
  } catch {
    return localBlueprints();
  }
}

export function getBlueprintCategories(blueprints: Blueprint[]) {
  return Array.from(new Set(blueprints.map((blueprint) => blueprint.category))).sort(
    (a, b) => {
      const categoryDelta = categoryRank(a) - categoryRank(b);

      if (categoryDelta !== 0) {
        return categoryDelta;
      }

      return a.localeCompare(b);
    },
  );
}
