import { ArrowRight, Braces, Cpu, ScanSearch } from 'lucide-react';
import Image from 'next/image';
import TrackedLink from '@/components/TrackedLink';
import BlueprintModalTrigger from './BlueprintModalTrigger';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: Braces,
    label: 'Easy to build',
    text: 'Use normal Python or begin with a working blueprint.',
    iconClass: 'border-cyan-300/20 bg-cyan-300/10 text-cyan-200',
  },
  {
    icon: ScanSearch,
    label: 'Simple to control',
    text: 'See the work, tools, results, and approvals in one place.',
    iconClass: 'border-violet-300/20 bg-violet-300/10 text-violet-200',
  },
  {
    icon: Cpu,
    label: 'Yours to operate',
    text: 'Run on your PCs and connect outside services only by choice.',
    iconClass: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200',
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mn-container relative z-10 py-16 md:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-14">
          <div className="relative z-10 max-w-2xl">
            <Badge className="mb-5 w-fit">Local-first runtime for deep agents</Badge>

            <h1 className="max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]">
              Run deep agents on your PCs
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              MirrorNeuron makes deep AI agents running locally easy to build,
              simple to control, and fully yours to operate.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <BlueprintModalTrigger className="h-11 bg-white px-5 text-sm text-slate-950 shadow-[0_16px_36px_rgba(255,255,255,0.07)] hover:bg-slate-200">
                Run a deep agent locally
              </BlueprintModalTrigger>

              <Button
                asChild
                variant="secondary"
                className="h-11 border-slate-700 bg-slate-950/50 px-5 text-sm backdrop-blur-sm"
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

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
              <span>MIT licensed</span>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <span>macOS, Linux &amp; WSL2</span>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <span>Docker required</span>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-950 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
            <Image
              src="/sample.png"
              alt="MirrorNeuron workflow workbench showing a running agent"
              fill
              sizes="(max-width: 1023px) calc(100vw - 3rem), 54vw"
              loading="eager"
              className="object-cover object-left-top opacity-80 [filter:saturate(0.58)_contrast(1.04)]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,28,0.08)_0%,transparent_62%,rgba(7,16,28,0.72)_100%)]" />
          </div>
        </div>

        <div className="relative z-10 mt-8 grid gap-3 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.label}
              className="rounded-2xl border border-slate-800/90 bg-slate-950/65 p-4 backdrop-blur-md"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${benefit.iconClass}`}
                >
                  <benefit.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    {benefit.label}
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
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
