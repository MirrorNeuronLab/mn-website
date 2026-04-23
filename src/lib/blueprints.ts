import fs from 'fs';
import path from 'path';

const blueprintsPath = path.join(
  process.cwd(),
  'src/content/blueprints/blueprints.jsonl',
);

const categoryOrder = ['General', 'Business', 'Finance', 'Science'];

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
  updatedAt: string;
  command: string;
  href: string;
  graphId: string;
  jobName: string;
  recoveryMode: 'local_restart' | 'cluster_recover';
  nodeCount: number;
  daemon: boolean;
  docs: 'README' | 'Manifest';
};

export function getBlueprints(): Blueprint[] {
  if (!fs.existsSync(blueprintsPath)) {
    return [];
  }

  return fs
    .readFileSync(blueprintsPath, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line) as Blueprint)
    .sort((a, b) => {
      const categoryDelta = categoryRank(a.category) - categoryRank(b.category);

      if (categoryDelta !== 0) {
        return categoryDelta;
      }

      return a.name.localeCompare(b.name);
    });
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
