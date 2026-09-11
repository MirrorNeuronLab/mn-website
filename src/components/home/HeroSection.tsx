import { ArrowRight, Braces, Cpu, ShieldCheck, Terminal, Workflow } from 'lucide-react';
import Image from 'next/image';
import TrackedLink from '@/components/TrackedLink';
import BlueprintModalTrigger from './BlueprintModalTrigger';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: Braces,
    label: 'Easy to build',
    text: 'Write normal Python or start from a working blueprint. No new orchestration vocabulary.',
    tag: 'Normal code',
  },
  {
    icon: Workflow,
    label: 'Durable by default',
    text: 'State, retries, checkpoints, and recovery come with the runtime — not bolted on later.',
    tag: 'Checkpoints',
  },
  {
    icon: Cpu,
    label: 'Yours to operate',
    text: 'Run on one machine or a private cluster. Data leaves only through the tools you configure.',
    tag: 'Local & private',
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-full max-w-6xl -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-100px] -translate-x-1/2 h-[380px] w-[80%] max-w-4xl rounded-full bg-[#8bc9bc]/[0.06] blur-[120px]" />
      </div>

      <div className="mn-container relative z-10">
        {/* Centered Hero Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mn-display-title mx-auto text-4xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-[-0.03em] leading-[1.1] text-[#f4f2ed]">
            Run complex AI workflows<br/> {' '}
            <span className="whitespace-nowrap">
              on your own machines
              <Image
                src="/no-cloud.png"
                alt="No cloud required"
                width={110}
                height={110}
                priority
                className="ml-2.5 inline-block h-[1.1em] w-[1.1em] align-[-0.15em] drop-shadow-md select-none"
              />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#aaa9a3] sm:text-base sm:leading-8">
            Bring your work. MirrorNeuron handles execution.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BlueprintModalTrigger className="h-11 rounded-full bg-[#f4f2ed] px-6 text-sm font-medium text-[#151514] shadow-[0_12px_32px_rgba(255,255,255,0.09)] transition-all hover:bg-white hover:scale-[1.02]">
              Try it now
            </BlueprintModalTrigger>

            <Button
              asChild
              variant="secondary"
              className="h-11 rounded-full border-white/15 bg-white/[0.03] px-6 text-sm backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/[0.08]"
            >
              <TrackedLink
                href="https://github.com/MirrorNeuronLab/MirrorNeuron"
                eventName="click_why_cta"
                eventParams={{ location: 'hero' }}
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-[#777671]">
            <span className="font-mono">MIT licensed</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">macOS, Linux &amp; WSL2</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">Docker required</span>
          </div>
        </div>

        {/* Workbench Showcase Frame */}
        <div className="relative mx-auto mt-12 max-w-5xl md:mt-16">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0b] shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)]">
            {/* Window title bar */}
            <div className="flex h-10 items-center justify-between border-b border-white/[0.08] bg-[#11110f]/90 px-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              </div>
              <div className="font-mono text-[0.7rem] text-[#777671]">
                mirrorneuron-workbench · run_id: 8f2a9c · checkpoint active
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[#8bc9bc]/25 bg-[#8bc9bc]/[0.08] px-2.5 py-0.5 font-mono text-[0.65rem] text-[#8bc9bc]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8bc9bc] animate-pulse" />
                local node ready
              </div>
            </div>

            {/* Workbench screenshot */}
            <div className="relative aspect-[1000/340] w-full overflow-hidden bg-[#080807]">
              <Image
                src="/sample.png"
                alt="MirrorNeuron workbench showing a running multi-agent workflow with checkpoints and state"
                width={1000}
                height={340}
                priority
                className="h-full w-full object-cover object-left-top opacity-90 [filter:saturate(0.65)_contrast(1.04)]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0c0b]/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* 3 Benefit Cards Shelf */}
        <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.label}
              className="group relative rounded-2xl border border-white/[0.08] bg-[#11110f]/80 p-5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-[#141412]"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#8bc9bc]/25 bg-[#8bc9bc]/10 text-[#8bc9bc] transition-colors group-hover:border-[#8bc9bc]/40 group-hover:bg-[#8bc9bc]/15">
                  <benefit.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm font-medium text-[#f4f2ed]">
                      {benefit.label}
                    </h2>
                    <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[#777671]">
                      {benefit.tag}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#aaa9a3]">
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
