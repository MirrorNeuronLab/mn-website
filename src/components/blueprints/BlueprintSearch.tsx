'use client';

import Link from 'next/link';
import { Search, SlidersHorizontal, Star, Terminal, Zap } from 'lucide-react';
import { startTransition, useDeferredValue, useState } from 'react';
import type { Blueprint } from '@/lib/blueprints';

type BlueprintSearchProps = {
  blueprints: Blueprint[];
  categories: string[];
};

const sortOptions = [
  { label: 'Newest', value: 'updated' },
  { label: 'Popular', value: 'runs' },
  { label: 'Starred', value: 'stars' },
] as const;

type SortValue = (typeof sortOptions)[number]['value'];

function formatNumber(value: number) {
  return new Intl.NumberFormat('en', {
    notation: value >= 10000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(value);
}

function formatUpdated(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

function matchesBlueprint(blueprint: Blueprint, query: string, category: string) {
  if (category !== 'All' && blueprint.category !== category) {
    return false;
  }

  if (!query) {
    return true;
  }

  const haystack = [
    blueprint.name,
    blueprint.summary,
    blueprint.category,
    blueprint.author,
    blueprint.command,
    blueprint.runtime,
    blueprint.difficulty,
    ...blueprint.tags,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
}

function sortBlueprints(blueprints: Blueprint[], sort: SortValue) {
  return [...blueprints].sort((a, b) => {
    if (sort === 'runs') {
      return b.runs - a.runs;
    }

    if (sort === 'stars') {
      return b.stars - a.stars;
    }

    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

export default function BlueprintSearch({
  blueprints,
  categories,
}: BlueprintSearchProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<SortValue>('updated');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredBlueprints = sortBlueprints(
    blueprints.filter((blueprint) =>
      matchesBlueprint(blueprint, deferredQuery, category),
    ),
    sort,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      <aside className="space-y-6">
        <div className="rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.72))] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-200">
            <SlidersHorizontal className="h-4 w-4" />
            Categories
          </div>
          <div className="flex flex-wrap gap-2 lg:flex-col">
            {['All', ...categories].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  startTransition(() => setCategory(item));
                }}
                className={`rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors ${
                  category === item
                    ? 'bg-cyan-300 text-slate-950'
                    : 'bg-slate-950/60 text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section>
        <div className="rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.76),rgba(2,6,23,0.72))] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <label className="relative block flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  const value = event.target.value;
                  startTransition(() => setQuery(value));
                }}
                placeholder="Search blueprints"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 py-3 pl-12 pr-4 text-base text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-300/50"
              />
            </label>
            <div className="flex rounded-2xl bg-slate-950/70 p-1">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    startTransition(() => setSort(option.value));
                  }}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                    sort === option.value
                      ? 'bg-white text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-400">
            {filteredBlueprints.length} blueprint
            {filteredBlueprints.length === 1 ? '' : 's'} found. Default sort is
            newest updated.
          </div>
        </div>

        <div className="mt-5 divide-y divide-slate-800/80 overflow-hidden rounded-3xl bg-[#05080f]/80 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          {filteredBlueprints.map((blueprint) => (
            <Link
              key={blueprint.slug}
              href={blueprint.href}
              target="_blank"
              rel="noreferrer"
              className="group block p-6 transition-colors hover:bg-slate-900/55"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-white transition-colors group-hover:text-cyan-100">
                      {blueprint.name}
                    </h2>
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-100">
                      {blueprint.category}
                    </span>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-300">
                      {blueprint.difficulty}
                    </span>
                  </div>
                  <p className="mt-3 max-w-3xl text-base leading-8 text-slate-300">
                    {blueprint.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blueprint.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-2 rounded-2xl bg-slate-950/80 px-4 py-3 font-mono text-sm text-slate-300">
                    <Terminal className="h-4 w-4 shrink-0 text-cyan-300" />
                    <span className="truncate">{blueprint.command}</span>
                  </div>
                </div>
                <div className="grid min-w-56 grid-cols-2 gap-3 text-sm text-slate-400 lg:text-right">
                  <div>
                    <div className="font-semibold text-white">
                      {formatNumber(blueprint.runs)}
                    </div>
                    <div>runs</div>
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1 font-semibold text-white">
                      <Star className="h-4 w-4 text-cyan-300" />
                      {formatNumber(blueprint.stars)}
                    </div>
                    <div>stars</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      v{blueprint.version}
                    </div>
                    <div>version</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {formatUpdated(blueprint.updatedAt)}
                    </div>
                    <div>updated</div>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 rounded-2xl bg-cyan-300/10 px-3 py-2 text-left text-cyan-100 lg:justify-end">
                    <Zap className="h-4 w-4" />
                    {blueprint.runtime}
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {filteredBlueprints.length === 0 && (
            <div className="p-10 text-center">
              <h2 className="text-xl font-semibold text-white">
                No blueprints found
              </h2>
              <p className="mt-3 text-slate-400">
                Try a broader keyword, or switch the category back to All.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
