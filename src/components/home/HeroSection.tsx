import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import TrackedLink from '@/components/TrackedLink';
import BlueprintModalTrigger from './BlueprintModalTrigger';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative">
      <div className="mn-container py-18 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge>Open-source agent runtime</Badge>
          <h1 className="mn-display-title mx-auto mt-6 max-w-2xl text-[#f4f2ed]">
            Run deep agents on your PCs
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#aaa9a3] md:text-[0.95rem]">
            For AI work that must keep running, stay private, and remain under your control.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <BlueprintModalTrigger className="h-10 bg-[#f4f2ed] px-5 text-sm font-medium text-[#151514] hover:bg-white">
              Try it
            </BlueprintModalTrigger>
            <Button asChild variant="ghost" className="h-10 px-5">
              <TrackedLink
                href="/blueprints"
                eventName="click_blueprints_cta"
                eventParams={{ location: 'hero' }}
              >
                Explore blueprints
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-x-3 gap-y-2 text-[0.7rem] text-[#66655f]">
            <span>MIT licensed</span>
            <span aria-hidden="true">·</span>
            <span>macOS, Linux &amp; WSL2</span>
            <span aria-hidden="true">·</span>
            <span>Docker required</span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#080807] md:mt-18">
          <Image
            src="/sample.png"
            alt="MirrorNeuron workbench showing a running multi-agent workflow"
            width={1600}
            height={1000}
            sizes="(max-width: 1023px) calc(100vw - 3rem), 1024px"
            priority
            className="h-auto w-full opacity-80 [filter:saturate(0.45)_contrast(1.03)]"
          />
        </div>
      </div>
    </section>
  );
}
