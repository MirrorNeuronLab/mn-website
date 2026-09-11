import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import TrackedLink from '@/components/TrackedLink';
import BlueprintModalTrigger from './BlueprintModalTrigger';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-16">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-full max-w-6xl -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-100px] -translate-x-1/2 h-[380px] w-[80%] max-w-4xl rounded-full bg-[#56ccf2]/[0.06] blur-[120px]" />
      </div>

      <div className="mn-container relative z-10">
        {/* Centered Hero Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mn-display-title mx-auto text-4xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-[-0.03em] leading-[1.1] text-[#f4f2ed]">
            Run dependable AI workflows<br/> {' '}
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
              <div className="flex items-center gap-1.5 rounded-full border border-[#56ccf2]/25 bg-[#56ccf2]/[0.08] px-2.5 py-0.5 font-mono text-[0.65rem] text-[#56ccf2]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#56ccf2] animate-pulse" />
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
      </div>
    </section>
  );
}
