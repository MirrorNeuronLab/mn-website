import fs from 'fs';
import path from 'path';

const blueprintsPath = path.join(
  process.cwd(),
  'src/content/blueprints/blueprints.jsonl',
);

export type Blueprint = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  tags: string[];
  author: string;
  updatedAt: string;
  runs: number;
  stars: number;
  version: string;
  runtime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  command: string;
  href: string;
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
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getBlueprintCategories(blueprints: Blueprint[]) {
  return Array.from(new Set(blueprints.map((blueprint) => blueprint.category))).sort();
}
