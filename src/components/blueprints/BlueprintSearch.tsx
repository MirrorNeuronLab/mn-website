'use client';

import { ArrowUpRight, Search } from 'lucide-react';
import { useDeferredValue, useState } from 'react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import ShellCommand from '@/components/ui/shell-command';
import { trackEvent } from '@/lib/analytics';
import type { Blueprint } from '@/lib/blueprints';

type BlueprintSearchProps = {
  blueprints: Blueprint[];
  categories: string[];
};

const blueprintsPerPage = 10;

function matchesBlueprint(blueprint: Blueprint, query: string, category: string) {
  if (category !== 'All' && blueprint.category !== category) {
    return false;
  }

  if (!query) {
    return true;
  }

  return [
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
    .toLowerCase()
    .includes(query);
}

export default function BlueprintSearch({
  blueprints,
  categories,
}: BlueprintSearchProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(blueprintsPerPage);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredBlueprints = blueprints.filter((blueprint) =>
    matchesBlueprint(blueprint, deferredQuery, category),
  );
  const visibleBlueprints = filteredBlueprints.slice(0, visibleCount);
  const hasMoreBlueprints = visibleCount < filteredBlueprints.length;
  const filters = ['All', ...categories];
  const isFiltered = category !== 'All' || Boolean(deferredQuery);

  const categoryCounts = new Map(
    categories.map((item) => [
      item,
      blueprints.filter((blueprint) => blueprint.category === item).length,
    ]),
  );

  function selectCategory(nextCategory: string) {
    trackEvent('filter_blueprints', { category: nextCategory });
    setCategory(nextCategory);
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
    <section aria-labelledby="blueprint-catalog-heading">
      <h2 id="blueprint-catalog-heading" className="sr-only">
        Blueprint catalog
      </h2>

      <div className="rounded-2xl border border-white/[0.1] bg-[#11110f] p-4 md:p-5">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <label className="relative block min-w-0">
            <span className="sr-only">Search blueprints</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#66655f]" />
            <Input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(blueprintsPerPage);
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
              placeholder="Search by workflow, feature, or output"
              className="bg-[#0c0c0b] pl-10"
            />
          </label>

          <p className="text-xs text-[#777671]" aria-live="polite">
            {filteredBlueprints.length}
            {isFiltered ? ` of ${blueprints.length}` : ''} blueprint
            {filteredBlueprints.length === 1 ? '' : 's'}
          </p>
        </div>

        <div
          className="mt-4 flex gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Filter blueprints by category"
        >
          {filters.map((item) => {
            const count =
              item === 'All' ? blueprints.length : (categoryCounts.get(item) ?? 0);

            return (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => selectCategory(item)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  category === item
                    ? 'border-[#8bc9bc]/35 bg-[#8bc9bc]/[0.08] text-[#e2eee9]'
                    : 'border-white/[0.1] text-[#777671] hover:border-white/20 hover:text-[#deddd8]'
                }`}
              >
                {item}
                <span className="font-mono text-[0.62rem] text-[#66655f]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid items-stretch gap-4 lg:grid-cols-2">
        {visibleBlueprints.map((blueprint) => (
          <article
            key={blueprint.slug}
            className="flex h-full min-w-0 flex-col rounded-2xl border border-white/[0.1] bg-[#11110f] p-5 transition-colors hover:border-[#8bc9bc]/30 md:p-6"
          >
            <div className="flex items-start justify-between gap-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <Badge>{blueprint.category}</Badge>
                {blueprint.daemon ? (
                  <Badge variant="success">Daemon</Badge>
                ) : null}
                {blueprint.updatedAt ? (
                  <span className="text-[0.66rem] text-[#66655f]">
                    Updated {blueprint.updatedAt}
                  </span>
                ) : null}
              </div>

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
                className="inline-flex shrink-0 items-center gap-1.5 text-xs text-[#8bc9bc] hover:text-[#b4ded5]"
              >
                Source
                <ArrowUpRight className="h-3.5 w-3.5" />
              </TrackedLink>
            </div>

            <div className="flex flex-1 flex-col">
              <h2 className="mt-5 font-display text-xl font-normal leading-snug text-[#f4f2ed]">
                {blueprint.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#aaa9a3]">
                {blueprint.summary}
              </p>

              <dl className="mt-5 grid gap-4 border-t border-white/[0.08] pt-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-[0.13em] text-[#66655f]">
                    For
                  </dt>
                  <dd className="mt-2 text-xs leading-5 text-[#888781]">
                    {blueprint.targetUsers}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-[0.13em] text-[#66655f]">
                    Output
                  </dt>
                  <dd className="mt-2 text-xs leading-5 text-[#888781]">
                    {blueprint.output}
                  </dd>
                </div>
              </dl>
            </div>

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
              className="mt-6"
            />
          </article>
        ))}

        {filteredBlueprints.length === 0 ? (
          <Empty className="col-span-full my-8 border-white/[0.1] bg-[#11110f]">
            <EmptyHeader>
              <EmptyTitle>No blueprints found</EmptyTitle>
              <EmptyDescription>
                Try a broader keyword or choose All.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}
      </div>

      {filteredBlueprints.length > 0 ? (
        <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.1] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#66655f]">
            Showing {visibleBlueprints.length} of {filteredBlueprints.length}
          </p>
          {hasMoreBlueprints ? (
            <Button onClick={loadMoreBlueprints} variant="outline">
              Load more
            </Button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
