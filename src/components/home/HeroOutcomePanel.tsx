import {
  Database,
  PlayCircle,
  RotateCcw,
  Save,
  StepForward,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type RuntimeStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const runtimeSteps: RuntimeStep[] = [
  {
    title: 'Local run',
    description: 'Start the worker next to your models, tools, and compute.',
    icon: PlayCircle,
  },
  {
    title: 'Private tools/data',
    description: 'Keep prompts, files, APIs, and lab systems inside your boundary.',
    icon: Database,
  },
  {
    title: 'Checkpoint',
    description: 'Persist progress before long waits, tool calls, and handoffs.',
    icon: Save,
  },
  {
    title: 'Recover',
    description: 'Retry after crashes or flaky dependencies without restarting the job.',
    icon: RotateCcw,
  },
  {
    title: 'Continue',
    description: 'Resume the workflow and finish the next durable step.',
    icon: StepForward,
  },
];

export default function HeroOutcomePanel() {
  return (
    <Card
      variant="soft"
      className="relative w-full min-w-0 overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_32%),linear-gradient(180deg,#0d1628_0%,#07101d_54%,#05080f_100%)] p-5 shadow-2xl shadow-black/25"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-6 left-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-4 px-1">
          <div className="min-w-0">
            <Badge className="mb-4">Worker runtime</Badge>
            <h2 className="max-w-sm text-xl font-semibold leading-7 text-cyan-50">
              A local AI worker that can pause, recover, and keep going.
            </h2>
          </div>
          <Badge
            variant="success"
            className="normal-case tracking-normal"
          >
            Durable by design
          </Badge>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Run state
              </div>
              <div className="mt-1 truncate font-mono text-sm text-cyan-100">
                drug_discovery_simulation
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.7)]" />
              recoverable
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            {runtimeSteps.map((item, index) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-800/90 bg-slate-900/35 p-3 transition-colors hover:border-cyan-400/30"
              >
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Step {index + 1}
                      </span>
                      <span className="font-semibold text-slate-100">
                        {item.title}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
