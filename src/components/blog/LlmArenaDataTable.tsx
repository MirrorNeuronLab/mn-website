'use client';

import { useMemo, useState } from 'react';
import { ARENA_MODELS } from '@/lib/llm-arena-data';
import BlogFigure from './BlogFigure';

type Filter = 'all' | 'open' | 'closed';

function fmtContext(k: number): string {
  return k >= 1000 ? `${k / 1000}M` : `${k}K`;
}

export default function LlmArenaDataTable() {
  const [filter, setFilter] = useState<Filter>('all');
  const rows = useMemo(
    () =>
      [...ARENA_MODELS]
        .filter((m) => (filter === 'all' ? true : filter === 'open' ? !m.closed : !!m.closed))
        .sort((a, b) => (a.release < b.release ? -1 : 1)),
    [filter],
  );

  const btn = (key: Filter, label: string) => (
    <button
      key={key}
      type="button"
      onClick={() => setFilter(key)}
      className={`rounded-lg border px-3 py-1.5 text-[0.7rem] font-medium transition-colors ${
        filter === key
          ? 'border-white/40 bg-white text-black'
          : 'border-white/10 bg-transparent text-[#aaa9a3] hover:border-white/25 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <BlogFigure
      label="Dataset"
      title="Every model in the race — 76 open weights, 15 closed"
      description="Same numbers the bubbles use. MMLU is 5-shot (instruct where published). Closed-model params are undisclosed estimates."
      caption="Verified Oct 2026 against vendor model cards. Arena Elo is a launch snapshot and drifts daily."
      controls={<div className="flex gap-2">{(['all', 'open', 'closed'] as Filter[]).map((f) => btn(f, f === 'all' ? `All (${ARENA_MODELS.length})` : f === 'open' ? 'Open weights' : 'Closed'))}</div>}
      contentClassName="bg-[#0d0e0d]"
    >
      <div className="overflow-x-auto" role="region" aria-label="Complete model dataset" tabIndex={0}>
        <table className="w-full min-w-[860px] border-separate border-spacing-0 font-sans text-[0.8125rem]">
          <thead>
            <tr>
              {['Model', 'Org', 'Release', 'License', 'Params', 'MMLU', 'Intel idx', 'Arena', 'HumanEval', 'Context'].map(
                (h) => (
                  <th
                    key={h}
                    className="sticky top-0 border-b border-white/10 bg-[#151614] px-4 py-3.5 text-left align-bottom text-[0.72rem] font-semibold uppercase leading-5 tracking-[0.06em] text-[#d7d5cf] sm:px-5"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id}>
                <td className="border-b border-white/[0.07] px-4 py-3.5 text-[0.8125rem] leading-6 first:min-w-[13rem] first:bg-[#10110f] first:font-medium first:text-[#deddd8] sm:px-5">
                  {m.closed ? '🔒 ' : ''}
                  {m.name}
                </td>
                <td className="border-b border-white/[0.07] px-4 py-3.5 text-[0.8125rem] leading-6 text-[#aaa9a3] sm:px-5">
                  {m.org}
                </td>
                <td className="border-b border-white/[0.07] px-4 py-3.5 font-mono text-[0.8125rem] leading-6 text-[#aaa9a3] sm:px-5">
                  {m.release}
                </td>
                <td className="border-b border-white/[0.07] px-4 py-3.5 text-[0.8125rem] leading-6 text-[#aaa9a3] sm:px-5">
                  {m.closed ? 'Closed' : 'Open'}
                </td>
                <td className="border-b border-white/[0.07] px-4 py-3.5 font-mono text-[0.8125rem] leading-6 text-[#aaa9a3] sm:px-5">
                  {m.pest ? '≈' : ''}
                  {m.params}B{m.active ? ` (${m.active}B act)` : ''}
                </td>
                <td className="border-b border-white/[0.07] px-4 py-3.5 font-mono text-[0.8125rem] leading-6 text-[#aaa9a3] sm:px-5">
                  {m.mmlu}%
                </td>
                <td className="border-b border-white/[0.07] px-4 py-3.5 font-mono text-[0.8125rem] leading-6 text-[#aaa9a3] sm:px-5">
                  {m.ii}
                </td>
                <td className="border-b border-white/[0.07] px-4 py-3.5 font-mono text-[0.8125rem] leading-6 text-[#aaa9a3] sm:px-5">
                  {m.arena}
                </td>
                <td className="border-b border-white/[0.07] px-4 py-3.5 font-mono text-[0.8125rem] leading-6 text-[#aaa9a3] sm:px-5">
                  {m.humaneval}%
                </td>
                <td className="border-b border-white/[0.07] px-4 py-3.5 font-mono text-[0.8125rem] leading-6 text-[#aaa9a3] sm:px-5">
                  {fmtContext(m.context_k)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BlogFigure>
  );
}
