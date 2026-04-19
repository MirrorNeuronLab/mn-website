'use client';

import {
  ExternalLink,
  FlaskConical,
  Megaphone,
  PlayCircle,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

type ResultLink = {
  category: string;
  title: string;
  href: string;
  icon: LucideIcon;
  accent: string;
};

const resultLinks: ResultLink[] = [
  {
    category: 'Marketing',
    title: 'Email campaign automation',
    href: 'https://www.youtube.com/watch?v=MNEmailDemo',
    icon: Megaphone,
    accent: 'text-orange-300 bg-orange-400/10 border-orange-400/20',
  },
  {
    category: 'Finance',
    title: 'Stock market risk analysis',
    href: 'https://www.youtube.com/watch?v=MNMarketDemo',
    icon: TrendingUp,
    accent: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/20',
  },
  {
    category: 'Science',
    title: 'Drug discovery',
    href: 'https://www.youtube.com/watch?v=MNDrugDemo0',
    icon: FlaskConical,
    accent: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
  },
];

export default function HeroOutcomePanel() {
  return (
    <div className="relative flex h-full flex-col justify-start rounded-[2rem] border border-slate-800 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_28%),linear-gradient(180deg,#0d1628_0%,#0a101c_100%)] p-6 shadow-2xl lg:min-h-[32rem]">
      <div className="pointer-events-none absolute -right-2 -top-2 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative z-10 rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Watch real outcomes
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          {resultLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-800/90 bg-[#05080f]/75 p-3 transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-[#07111f]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${item.accent}`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {item.category}
                  </div>
                  <div className="truncate text-sm font-semibold text-slate-100 transition-colors group-hover:text-cyan-100">
                    {item.title}
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors group-hover:border-red-400/40 group-hover:text-white">
                <PlayCircle className="h-4 w-4 text-red-400" />
                Watch
                <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-slate-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
