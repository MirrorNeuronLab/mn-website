'use client';

import {
  ExternalLink,
  FileText,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { useDeferredValue, useState } from 'react';
import TrackedLink from '@/components/TrackedLink';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
        <Card variant="panel" className="p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-200">
            <SlidersHorizontal className="h-4 w-4" />
            Categories
          </div>
          <div className="flex flex-wrap gap-2 lg:flex-col">
            {[...categories, 'All'].map((item) => (
              <Button
                key={item}
                variant={category === item ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => selectCategory(item)}
                className="justify-start"
              >
                {item}
              </Button>
            ))}
          </div>
        </Card>
      </aside>

      <section>
        <Card variant="panel" className="p-5">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <Input
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
              className="py-3 pl-12 pr-4"
            />
          </label>
          <div className="mt-4 text-sm text-slate-400">
            Showing {visibleBlueprints.length} of {filteredBlueprints.length}{' '}
            matching blueprint{filteredBlueprints.length === 1 ? '' : 's'}
            {filteredBlueprints.length === blueprints.length
              ? ', Finance blueprints first.'
              : ` from ${blueprints.length} total.`}
          </div>
        </Card>

        <div className="mt-5 space-y-4">
          {visibleBlueprints.map((blueprint) => (
            <Card
              key={blueprint.slug}
              variant="gradient"
              className="p-5 md:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold leading-7 text-white md:text-2xl md:leading-8">
                    {blueprint.name}
                  </h2>
                  <Badge>{blueprint.category}</Badge>
                  {blueprint.daemon && <Badge variant="success">Daemon</Badge>}
                </div>
                {blueprint.updatedAt && (
                  <span className="shrink-0 self-end text-right text-xs font-medium leading-5 text-slate-500 sm:self-start">
                    Updated {blueprint.updatedAt}
                  </span>
                )}
              </div>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                {blueprint.summary}
              </p>

              <Accordion
                type="single"
                collapsible
                className="mt-4 rounded-2xl border border-slate-800/80 bg-slate-950/35 px-4 text-sm text-slate-300 md:hidden"
              >
                <AccordionItem value="details">
                  <AccordionTrigger className="text-xs uppercase tracking-[0.16em]">
                    Details
                  </AccordionTrigger>
                  <AccordionContent>
                    <dl className="grid gap-4">
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

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

              <Button asChild variant="outline" className="mt-5 px-4 py-3">
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
                >
                  <FileText className="h-4 w-4" />
                  Open blueprint
                  <ExternalLink className="h-4 w-4" />
                </TrackedLink>
              </Button>
            </Card>
          ))}

          {filteredBlueprints.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No blueprints found</EmptyTitle>
                <EmptyDescription>
                  Try a broader keyword, or switch the category back to All.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </div>

        {hasMoreBlueprints && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={loadMoreBlueprints}
              className="bg-white px-5 py-3 text-slate-950 hover:bg-slate-200"
            >
              Load more
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
