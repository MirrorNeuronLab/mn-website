import { FaGithub } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import BlueprintModalTrigger from './BlueprintModalTrigger';
import InstallCommand from './InstallCommand';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_55%,transparent_100%)]" />

      <div className="mn-container relative z-10 py-24 md:py-32">
        <div className="grid w-full gap-14 lg:grid-cols-[1.2fr_0.9fr] lg:items-stretch">
          <div className="flex min-w-0 flex-col">
            <Badge className="mb-6 w-fit">
              Deep research super agents, running locally
            </Badge>

            <h1 className="mn-gradient-text max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.05]">
              Reliable local workflows for deep AI agents
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              MirrorNeuron helps developers build durable super-agent workflows that
              can plan, research, run tools, and recover from failures — all on your
              local machine.
            </p>

            <div className="mt-8">
              <InstallCommand
                command={siteConfig.installCommand}
                runCommand="mn blueprint run drug_discovery_simulation"
              />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <BlueprintModalTrigger className="h-12 px-6 text-base">
                Run a deep research blueprint
              </BlueprintModalTrigger>

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="border-slate-700 bg-slate-950/30"
              >
                <TrackedLink
                  href={siteConfig.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventName="click_github_cta"
                  eventParams={{ location: 'hero' }}
                >
                  <FaGithub className="h-4 w-4" />
                  View GitHub
                  <ArrowUpRight className="h-4 w-4" />
                </TrackedLink>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <Badge variant="outline" className="normal-case tracking-normal">
                Open source, MIT License
              </Badge>
              <Badge variant="outline" className="normal-case tracking-normal">
                Local-first execution
              </Badge>
              <Badge variant="outline" className="normal-case tracking-normal">
                Built for durable agents
              </Badge>
            </div>
          </div>

          <div className="relative block min-h-[20rem] w-full lg:hidden">
            <Image
              src="/sample.png"
              alt="MirrorNeuron in action on a developer workstation"
              fill
              sizes="(min-width: 1024px) calc(100vw - 52rem), (max-width: 1023px) calc(100vw - 3rem)"
              className="object-cover object-left"
              priority
            />
          </div>

          <div className="relative hidden min-h-[20rem] w-full lg:block" />
        </div>
      </div>

      <div className="relative z-0 hidden h-full lg:block lg:absolute lg:right-0 lg:inset-y-24 lg:w-[calc(100vw-52rem)]">
        <Image
          src="/sample.png"
          alt="MirrorNeuron in action on a developer workstation"
          fill
          sizes="(min-width: 1024px) calc(100vw - 52rem), (max-width: 1023px) calc(100vw - 3rem)"
          className="object-cover object-left"
          priority
        />
      </div>
    </section>
  );
}
