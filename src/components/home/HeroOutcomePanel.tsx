'use client';

import { useState } from 'react';
import { FlaskConical, Megaphone, TrendingUp, type LucideIcon } from 'lucide-react';
import ShellCommand from '@/components/ui/shell-command';
import { trackEvent } from '@/lib/analytics';

type ResultLink = {
  category: string;
  title: string;
  description: string;
  blueprintId: string;
  icon: LucideIcon;
  accent: string;
  glow: string;
};

const resultLinks: ResultLink[] = [
  {
    category: 'Marketing',
    title: 'Personal email outreach, every day',
    description:
      'Find the right audience, draft personal follow-ups, send approval-ready variants, and track replies as a repeatable campaign worker.',
    blueprintId: 'business_email_campaign_deamon',
    icon: Megaphone,
    accent: 'text-orange-300 bg-orange-400/10 border-orange-400/20',
    glow: 'from-orange-400/16',
  },
  {
    category: 'Finance',
    title: 'Market risk monitor that does not stop',
    description:
      'Watch market signals, detect anomalies, compare scenarios, and summarize exposure as a durable analyst loop for live conditions.',
    blueprintId: 'finance_market_observer',
    icon: TrendingUp,
    accent: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/20',
    glow: 'from-cyan-400/16',
  },
  {
    category: 'Science',
    title: 'Research loops that keep moving',
    description:
      'Search papers, call tools, checkpoint evidence, review results, and plan the next experiment with memory and recovery.',
    blueprintId: 'science_drug_discovery_deamon',
    icon: FlaskConical,
    accent: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
    glow: 'from-emerald-400/16',
  },
];

export default function HeroOutcomePanel() {
  const [activeCategory, setActiveCategory] = useState(resultLinks[0].category);
  const activeItem =
    resultLinks.find((item) => item.category === activeCategory) ?? resultLinks[0];
  const ActiveIcon = activeItem.icon;
  const runCommand = `mn blueprint run ${activeItem.blueprintId}`;

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_30%),linear-gradient(180deg,#0d1628_0%,#07101d_52%,#05080f_100%)] p-5 shadow-2xl shadow-black/25">
      <div className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10">
        <div className="px-1 py-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-base font-semibold leading-6 text-cyan-50">
                Start from a blueprint
              </div>
              <div className="mt-1 text-sm leading-6 text-slate-400">
                Pick one, run one command, customize later.
              </div>
            </div>
            <div className="rounded-full bg-cyan-300/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-cyan-200">
              Ready in minutes
            </div>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Outcome examples"
          className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-slate-950/70 p-1.5 ring-1 ring-white/10"
        >
          {resultLinks.map((item) => (
            <button
              key={item.category}
              type="button"
              role="tab"
              aria-selected={item.category === activeItem.category}
              aria-controls="hero-outcome-panel"
              onClick={() => {
                setActiveCategory(item.category);
                trackEvent('select_outcome_tab', {
                  category: item.category,
                  title: item.title,
                });
              }}
              className={`flex items-center justify-center gap-2 rounded-xl px-2.5 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                item.category === activeItem.category
                  ? 'bg-cyan-300 text-slate-950'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.category}</span>
            </button>
          ))}
        </div>

        <div
          id="hero-outcome-panel"
          role="tabpanel"
          aria-label={`${activeItem.category} outcome`}
          className={`mt-4 relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${activeItem.glow} via-slate-950/86 to-slate-950/92 p-5 ring-1 ring-white/10`}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/5 blur-2xl" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${activeItem.accent}`}
                >
                  <ActiveIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {activeItem.category}
                  </div>
                  <div className="mt-1 text-lg font-semibold leading-6 text-slate-100">
                    {activeItem.title}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              {activeItem.description}
            </p>

            <ShellCommand
              command={runCommand}
              label="Run the blueprint"
              eventName="copy_blueprint_run_command"
              eventParams={{
                category: activeItem.category,
                blueprint_id: activeItem.blueprintId,
              }}
              variant="compact"
              className="mt-4"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
