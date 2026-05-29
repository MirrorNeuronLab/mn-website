import { FaGithub } from 'react-icons/fa';
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
            <Badge className="mb-6 w-fit">For AI agent workflows</Badge>
            <h1 className="mn-gradient-text max-w-2xl text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl lg:leading-[1.1]">
              Durable local AI workflows
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              For developers building AI agent workflows, MirrorNeuron helps
              you run durable local workflows.
            </p>
            <div className="mt-8">
              <InstallCommand
                command={siteConfig.installCommand}
                runCommand="mn blueprint run drug_discovery_simulation"
              />
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <BlueprintModalTrigger className="h-12 px-6 text-base">
                Run a blueprint
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
                Open source
              </Badge>
              <Badge variant="outline" className="normal-case tracking-normal">
                Local-first
              </Badge>
              <Badge variant="outline" className="normal-case tracking-normal">
                Recoverable runs
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
