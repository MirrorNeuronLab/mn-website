import fs from 'fs';
import path from 'path';

const blueprintsPath = path.join(
  process.cwd(),
  'src/content/blueprints/blueprints.jsonl',
);

const blueprintCatalogUrl =
  'https://raw.githubusercontent.com/MirrorNeuronLab/mn-blueprints/main/index.json';
const blueprintCategoriesUrl =
  'https://raw.githubusercontent.com/MirrorNeuronLab/mn-blueprints/main/category.json';

const categoryOrder = [
  'Finance',
  'Science',
  'Runtime',
];

function categoryRank(category: string, orderedCategories: string[] = categoryOrder) {
  const rank = orderedCategories.indexOf(category);
  return rank === -1 ? orderedCategories.length : rank;
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
  workflow_id?: string;
  product?: {
    benefit?: string;
    one_line?: string;
    output?: string;
    runtime_features?: string[];
    simulation_type?: string;
    target_users?: string;
  };
};

type RemoteCategory = {
  name?: string;
  slug?: string;
};

type RemoteCategoryCatalog = {
  categories?: RemoteCategory[];
};

function sortBlueprints(
  blueprints: Blueprint[],
  orderedCategories: string[] = categoryOrder,
) {
  return blueprints.sort((a, b) => {
    const categoryDelta =
      categoryRank(a.category, orderedCategories) -
      categoryRank(b.category, orderedCategories);

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
    summary:
      item.product?.one_line ?? item.product?.benefit ?? item.description ?? '',
    category: item.category ?? 'Runtime',
    tags: createTags(item, runtimeFeatures),
    command: `mn blueprint run ${item.id}`,
    href: `https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/${folder}`,
    graphId: item.workflow_id ?? item.graph_id ?? `${item.id}_v1`,
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

function categoryNames(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const categories = (payload as RemoteCategoryCatalog).categories;

  if (!Array.isArray(categories)) {
    return [];
  }

  return categories
    .map((category) =>
      typeof category?.name === 'string' ? category.name.trim() : '',
    )
    .filter((category): category is string => Boolean(category));
}

export async function getBlueprints(): Promise<Blueprint[]> {
  try {
    const [blueprintResponse, categoryResponse] = await Promise.all([
      fetch(blueprintCatalogUrl, {
        next: {
          revalidate: 60 * 60,
          tags: ['blueprint-catalog'],
        },
      }),
      fetch(blueprintCategoriesUrl, {
        next: {
          revalidate: 60 * 60,
          tags: ['blueprint-categories'],
        },
      }),
    ]);

    if (!blueprintResponse.ok) {
      return localBlueprints();
    }

    const catalog = (await blueprintResponse.json()) as RemoteBlueprint[];

    if (!Array.isArray(catalog)) {
      return localBlueprints();
    }

    let orderedCategories: string[] = [];

    if (categoryResponse.ok) {
      try {
        orderedCategories = categoryNames(await categoryResponse.json());
      } catch {
        orderedCategories = [];
      }
    }
    const categorySortOrder = orderedCategories.length
      ? orderedCategories
      : categoryOrder;

    const blueprints = catalog
      .map(normalizeRemoteBlueprint)
      .filter((blueprint): blueprint is Blueprint => Boolean(blueprint));

    return blueprints.length > 0
      ? sortBlueprints(blueprints, categorySortOrder)
      : localBlueprints();
  } catch {
    return localBlueprints();
  }
}

export function getBlueprintCategories(blueprints: Blueprint[]) {
  return Array.from(new Set(blueprints.map((blueprint) => blueprint.category)));
}
