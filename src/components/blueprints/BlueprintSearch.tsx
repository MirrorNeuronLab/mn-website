'use client';

import {
  ExternalLink,
  FileText,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { useDeferredValue, useState } from 'react';
import TrackedLink from '@/components/TrackedLink';
import ShellCommand from '@/components/ui/shell-command';
import { trackEvent } from '@/lib/analytics';
import type { Blueprint } from '@/lib/blueprints';

type BlueprintSearchProps = {
  blueprints: Blueprint[];
  categories: string[];
};

const blueprintsPerPage = 10;
const defaultCategory = 'Finance';

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
    blueprint.folder,
    blueprint.graphId,
    blueprint.jobName,
    blueprint.command,
    blueprint.recoveryMode,
    blueprint.docs,
    blueprint.targetUsers,
    blueprint.simulationType,
    blueprint.output,
    ...blueprint.tags,
    ...blueprint.runtimeFeatures,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
}

export default function BlueprintSearch({
  blueprints,
  categories,
}: BlueprintSearchProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(defaultCategory);
  const [visibleCount, setVisibleCount] = useState(blueprintsPerPage);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredBlueprints = blueprints.filter((blueprint) =>
    matchesBlueprint(blueprint, deferredQuery, category),
  );
  const visibleBlueprints = filteredBlueprints.slice(0, visibleCount);
  const hasMoreBlueprints = visibleCount < filteredBlueprints.length;

  function selectCategory(nextCategory: string) {
    trackEvent('filter_blueprints', {
      category: nextCategory,
    });
    setCategory(nextCategory);
    setVisibleCount(blueprintsPerPage);
  }

  function updateQuery(nextQuery: string) {
    setQuery(nextQuery);
    setVisibleCount(blueprintsPerPage);
  }

  function loadMoreBlueprints() {
    const nextVisibleCount = Math.min(
      visibleCount + blueprintsPerPage,
      filteredBlueprints.length,
    );

    setVisibleCount(nextVisibleCount);
    trackEvent('load_more_blueprints', {
      category,
      query: deferredQuery || undefined,
      visible_count: nextVisibleCount,
      total_count: filteredBlueprints.length,
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      <aside>
        <div className="rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.72))] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-200">
            <SlidersHorizontal className="h-4 w-4" />
            Categories
          </div>
          <div className="flex flex-wrap gap-2 lg:flex-col">
            {[...categories, 'All'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => selectCategory(item)}
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
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                updateQuery(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && query.trim()) {
                  trackEvent('search_blueprints', {
                    query: query.trim(),
                    category,
                    results_count: filteredBlueprints.length,
                  });
                }
              }}
              placeholder="Search real blueprints"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 py-3 pl-12 pr-4 text-base text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-300/50"
            />
          </label>
          <div className="mt-4 text-sm text-slate-400">
            Showing {visibleBlueprints.length} of {filteredBlueprints.length}{' '}
            matching blueprint{filteredBlueprints.length === 1 ? '' : 's'}
            {filteredBlueprints.length === blueprints.length
              ? ', Finance blueprints first.'
              : ` from ${blueprints.length} total.`}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {visibleBlueprints.map((blueprint) => (
            <article
              key={blueprint.slug}
              className="mn-gradient-card p-5 md:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold leading-7 text-white md:text-2xl md:leading-8">
                    {blueprint.name}
                  </h2>
                  <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-100">
                    {blueprint.category}
                  </span>
                  {blueprint.daemon && (
                    <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">
                      Daemon
                    </span>
                  )}
                </div>
                <span className="shrink-0 self-end text-right text-xs font-medium leading-5 text-slate-500 sm:self-start">
                  Updated {blueprint.updatedAt}
                </span>
              </div>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                {blueprint.summary}
              </p>

              <details className="mt-4 rounded-2xl border border-slate-800/80 bg-slate-950/35 p-4 text-sm text-slate-300 md:hidden">
                <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                  Details
                </summary>
                <dl className="mt-4 grid gap-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      For
                    </dt>
                    <dd className="mt-2 leading-6">
                      {blueprint.targetUsers}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Process
                    </dt>
                    <dd className="mt-2 leading-6">
                      {blueprint.simulationType}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Output
                    </dt>
                    <dd className="mt-2 leading-6">{blueprint.output}</dd>
                  </div>
                </dl>
              </details>

              <dl className="mt-5 hidden gap-4 border-y border-slate-800/80 py-5 text-sm md:grid md:grid-cols-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    For
                  </dt>
                  <dd className="mt-2 leading-6 text-slate-300">
                    {blueprint.targetUsers}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Process
                  </dt>
                  <dd className="mt-2 leading-6 text-slate-300">
                    {blueprint.simulationType}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Output
                  </dt>
                  <dd className="mt-2 leading-6 text-slate-300">
                    {blueprint.output}
                  </dd>
                </div>
              </dl>

              <ShellCommand
                command={blueprint.command}
                label="Run blueprint"
                eventName="copy_blueprint_catalog_command"
                eventParams={{
                  blueprint_slug: blueprint.slug,
                  blueprint_name: blueprint.name,
                  category: blueprint.category,
                }}
                variant="compact"
                className="mt-5"
              />

              <TrackedLink
                href={blueprint.href}
                target="_blank"
                rel="noreferrer"
                eventName="open_blueprint"
                eventParams={{
                  blueprint_slug: blueprint.slug,
                  blueprint_name: blueprint.name,
                  category: blueprint.category,
                  destination: blueprint.href,
                }}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-400/40 hover:text-white"
              >
                <FileText className="h-4 w-4" />
                Open blueprint
                <ExternalLink className="h-4 w-4" />
              </TrackedLink>
            </article>
          ))}

          {filteredBlueprints.length === 0 && (
            <div className="rounded-3xl bg-[#05080f]/80 p-10 text-center">
              <h2 className="text-xl font-semibold text-white">
                No blueprints found
              </h2>
              <p className="mt-3 text-slate-400">
                Try a broader keyword, or switch the category back to All.
              </p>
            </div>
          )}
        </div>

        {hasMoreBlueprints && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={loadMoreBlueprints}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200"
            >
              Load more
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
