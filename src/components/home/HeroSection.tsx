import { FaApple, FaGithub, FaLinux, FaWindows } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import BlueprintModalTrigger from './BlueprintModalTrigger';
import HeroOutcomePanel from './HeroOutcomePanel';
import InstallCommand from './InstallCommand';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_55%,transparent_100%)]" />
      <div className="mn-container relative z-10 py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="flex min-w-0 max-w-3xl flex-col">
            <Badge className="mb-6 w-fit">Open-source local runtime</Badge>
            <h1 className="mn-gradient-text max-w-2xl text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl lg:leading-[1.1]">
              The open-source runtime for reliable local AI workers.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Your AI agent is not a demo anymore. It needs to keep working,
              stay private, recover from failure, and run where your data lives.
              MirrorNeuron gives developers a local runtime for durable AI
              workers that wait, retry, checkpoint, and continue.
            </p>
            <p className="mt-4 max-w-2xl rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-sm leading-7 text-slate-300">
              For agent workflows that are too long-running for scripts and too
              lightweight to justify Airflow or Temporal.
            </p>
            <div className="mt-8">
              <InstallCommand
                command={siteConfig.installCommand}
                runCommand="mn blueprint run drug_discovery_simulation"
              />
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <BlueprintModalTrigger className="h-12 px-6 text-base">
                Run your first blueprint
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
                MIT open source
              </Badge>
              <Badge variant="outline" className="normal-case tracking-normal">
                <FaApple aria-hidden="true" className="h-3.5 w-3.5" />
                macOS
              </Badge>
              <Badge variant="outline" className="normal-case tracking-normal">
                <FaLinux aria-hidden="true" className="h-3.5 w-3.5" />
                Linux
              </Badge>
              <Badge variant="outline" className="normal-case tracking-normal">
                <FaWindows aria-hidden="true" className="h-3.5 w-3.5" />
                Windows WSL
              </Badge>
            </div>
          </div>

          <div className="min-w-0 lg:pt-2">
            <HeroOutcomePanel />
          </div>
        </div>
      </div>
    </section>
  );
}
