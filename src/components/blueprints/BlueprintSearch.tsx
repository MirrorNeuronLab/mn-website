'use client';

import Link from 'next/link';
import {
  ExternalLink,
  FileText,
  Search,
  SlidersHorizontal,
  Terminal,
} from 'lucide-react';
import { startTransition, useDeferredValue, useState } from 'react';
import type { Blueprint } from '@/lib/blueprints';

type BlueprintSearchProps = {
  blueprints: Blueprint[];
  categories: string[];
};

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
    ...blueprint.tags,
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
  const [category, setCategory] = useState('All');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredBlueprints = blueprints.filter((blueprint) =>
    matchesBlueprint(blueprint, deferredQuery, category),
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      <aside>
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
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                startTransition(() => setQuery(value));
              }}
              placeholder="Search real blueprints"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 py-3 pl-12 pr-4 text-base text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-300/50"
            />
          </label>
          <div className="mt-4 text-sm text-slate-400">
            Showing {filteredBlueprints.length} of {blueprints.length} real
            blueprint{blueprints.length === 1 ? '' : 's'}, newest updates first.
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {filteredBlueprints.map((blueprint) => (
            <article
              key={blueprint.slug}
              className="rounded-3xl bg-[#05080f]/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition-colors hover:bg-slate-950"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold text-white">
                  {blueprint.name}
                </h2>
                <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-100">
                  {blueprint.category}
                </span>
                {blueprint.daemon && (
                  <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Daemon
                  </span>
                )}
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

              <Link
                href={blueprint.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-400/40 hover:text-white"
              >
                <FileText className="h-4 w-4" />
                Open blueprint
                <ExternalLink className="h-4 w-4" />
              </Link>
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
      </section>
    </div>
  );
}
