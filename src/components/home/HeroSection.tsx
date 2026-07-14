import { ArrowRight, Clock3, Cpu, ScanSearch } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import BlueprintModalTrigger from './BlueprintModalTrigger';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: Clock3,
    label: 'Long horizon',
    text: 'Keep working across hours, failures, restarts, and human pauses.',
    iconClass: 'border-cyan-300/20 bg-cyan-300/10 text-cyan-200',
  },
  {
    icon: Cpu,
    label: 'Local and on-edge',
    text: 'Run physical AI near sensors, local models, and private data.',
    iconClass: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200',
  },
  {
    icon: ScanSearch,
    label: 'Controlled and transparent',
    text: 'Inspect state, paths, scoped tools, checkpoints, and approvals.',
    iconClass: 'border-violet-300/20 bg-violet-300/10 text-violet-200',
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-20 [mask-image:radial-gradient(ellipse_72%_65%_at_50%_0%,#000_50%,transparent_100%)]" />
      <div className="absolute left-[12%] top-10 h-72 w-72 rounded-full bg-cyan-400/[0.06] blur-[100px]" />
      <div className="absolute right-[8%] top-28 h-64 w-64 rounded-full bg-indigo-400/[0.06] blur-[110px]" />

      <div className="mn-container relative z-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-6xl">
          <Badge className="mb-6 w-fit">Durable runtime for deep agents</Badge>

          <h1 className="mn-gradient-text max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl lg:leading-[1.02]">
            Run deep agents on your PCs
          </h1>

          <p className="mt-6 max-w-none text-base leading-8 text-slate-300 md:text-lg lg:whitespace-nowrap">
            Makes deep AI agents running locally, easy to build, simple to control, and fully yours to operate.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <BlueprintModalTrigger className="h-12 bg-white px-6 text-base text-slate-950 shadow-[0_18px_45px_rgba(255,255,255,0.08)] hover:bg-slate-200">
              Run a deep agent locally
            </BlueprintModalTrigger>

            <Button
              asChild
              variant="secondary"
              size="lg"
              className="border-slate-700 bg-slate-950/30 px-6"
            >
              <TrackedLink
                href="/why"
                eventName="click_why_cta"
                eventParams={{ location: 'hero' }}
              >
                See how it works
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-slate-400 sm:text-sm">
            <span>MIT licensed</span>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <span>macOS, Linux &amp; WSL2</span>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <span>Docker required</span>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.label}
                className="rounded-2xl border border-slate-800/90 bg-slate-950/45 p-4 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${benefit.iconClass}`}
                  >
                    <benefit.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-white">
                      {benefit.label}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
