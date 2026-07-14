import { ArrowRight, Clock3, Cpu, ScanSearch } from 'lucide-react';
import Image from 'next/image';
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
      <div className="mn-container relative z-10 py-20 md:py-28 lg:py-32">
        <div className="relative z-10 max-w-3xl">
          <Badge className="mb-6 w-fit">Durable runtime for deep agents</Badge>

          <h1 className="mn-gradient-text max-w-2xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl lg:leading-[1.02]">
            Run deep agents on your PCs
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
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
              className="border-slate-700 bg-slate-950/50 px-6 backdrop-blur-sm"
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
        </div>

        <div className="relative z-0 mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950 shadow-[0_24px_70px_rgba(0,0,0,0.3)] lg:pointer-events-none lg:absolute lg:inset-y-0 lg:right-[calc((100vw-100%)/-2)] lg:mt-0 lg:aspect-auto lg:w-[calc(62%+(100vw-100%)/2)] lg:rounded-none lg:border-0 lg:shadow-none">
          <Image
            src="/sample.png"
            alt=""
            fill
            sizes="(max-width: 1023px) calc(100vw - 3rem), 62vw"
            loading="eager"
            className="object-cover object-left-top opacity-85 [filter:saturate(0.62)_contrast(1.04)]"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,#0f172a_0%,rgba(15,23,42,0.94)_18%,rgba(15,23,42,0.35)_46%,transparent_68%)] lg:block" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,28,0.2)_0%,transparent_28%,transparent_70%,#07101c_100%)]" />
        </div>

        <div className="relative z-10 mt-10 grid gap-4 md:mt-12 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.label}
              className="rounded-2xl border border-slate-800/90 bg-slate-950/80 p-4 backdrop-blur-md"
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
    </section>
  );
}
