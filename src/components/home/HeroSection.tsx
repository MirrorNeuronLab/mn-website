import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import TrackedLink from '@/components/TrackedLink';
import BlueprintModalTrigger from './BlueprintModalTrigger';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Console image as background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/sample.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-left-top opacity-70 [filter:saturate(0.85)_contrast(1.08)] md:object-center"
        />
      </div>

      {/* Readability filters: 45deg gradient wash (clear bottom-left → dark center/top) + dotted overlay + text spotlight */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(45deg, rgba(12,12,11,0.12) 0%, rgba(12,12,11,0.32) 16%, rgba(12,12,11,0.68) 42%, rgba(12,12,11,0.88) 75%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(rgba(12,12,11,0.5) 1px, transparent 1.8px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, rgba(12,12,11,0.55) 0%, transparent 26%, transparent 62%, rgba(12,12,11,0.9) 100%), radial-gradient(ellipse 55% 60% at 50% 45%, rgba(12,12,11,0.8) 0%, rgba(12,12,11,0.45) 50%, transparent 72%)',
        }}
      />
      {/* Ambient top glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-full max-w-6xl -translate-x-1/2 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-[-110px] h-[340px] w-[80%] max-w-4xl -translate-x-1/2 rounded-full bg-[#56ccf2]/[0.09] blur-[120px]" />
      </div>

      <div className="mn-container relative z-10 py-20 md:py-28 lg:py-32">
        {/* Centered Hero Header on top of console background */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mn-display-title mx-auto text-4xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-[-0.03em] leading-[1.1] text-[#f4f2ed] [text-shadow:0_2px_28px_rgba(0,0,0,0.85),0_0_2px_rgba(0,0,0,0.6)]">
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

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#e2e1db] sm:text-base sm:leading-8 [text-shadow:0_1px_18px_rgba(0,0,0,0.85)]">
            Bring your work. MirrorNeuron handles execution.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row [filter:drop-shadow(0_4px_16px_rgba(0,0,0,0.6))]">
            <BlueprintModalTrigger className="h-11 rounded-full bg-[#f4f2ed] px-6 text-sm font-medium text-[#151514] shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-all hover:bg-white hover:scale-[1.02]">
              Try it now
            </BlueprintModalTrigger>

            <Button
              asChild
              variant="secondary"
              className="h-11 rounded-full border-white/20 bg-[#0c0c0b]/60 px-6 text-sm text-[#f4f2ed] shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all hover:border-white/30 hover:bg-[#0c0c0b]/80"
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

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-[#c9c8c2] [text-shadow:0_1px_14px_rgba(0,0,0,0.85)]">
            <span className="font-mono">MIT licensed</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">macOS, Linux &amp; WSL2</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">Docker required</span>
          </div>
        </div>
      </div>
      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0c0c0b] to-transparent" aria-hidden="true" />
    </section>
  );
}
