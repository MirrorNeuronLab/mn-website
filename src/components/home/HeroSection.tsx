import { FaApple, FaGithub, FaLinux, FaWindows } from 'react-icons/fa';
import BlueprintModalTrigger from './BlueprintModalTrigger';
import HeroOutcomePanel from './HeroOutcomePanel';
import InstallCommand from './InstallCommand';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { siteConfig } from '@/lib/site';

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_55%,transparent_100%)]" />
      <div className="mn-container relative z-10 py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="flex min-w-0 max-w-3xl flex-col">
            <h1 className="mn-gradient-text max-w-2xl text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl lg:leading-[1.1]">
              The open-source runtime for reliable local AI workflows.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              MirrorNeuron helps developers run durable AI agent workflows
              close to their data, tools, and compute. Start from reusable
              blueprints, orchestrate multi-step agent workflows, and recover
              automatically when tools, agents, or machines fail.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              For agent workflows that are too long-running for scripts and too
              lightweight to justify Airflow or Temporal.
            </p>
            <div className="mt-8">
              <InstallCommand command={siteConfig.installCommand} />
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <BlueprintModalTrigger className="px-6 py-3">
                Run your first blueprint
              </BlueprintModalTrigger>
              <Card
                variant="plain"
                className="flex items-center gap-4 rounded-xl border-slate-800 bg-slate-950/40 px-4 py-3 text-slate-400"
              >
                <div className="flex items-center gap-3 text-lg">
                  <FaApple aria-label="macOS" title="macOS" />
                  <FaLinux aria-label="Linux" title="Linux" />
                  <div
                    className="inline-flex items-center gap-1"
                    aria-label="Windows WSL"
                    title="Windows WSL"
                  >
                    <FaWindows />
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em]">
                      WSL
                    </span>
                  </div>
                </div>
              </Card>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">
              <FaGithub className="h-5 w-5 text-slate-300" />
              <Badge variant="outline" className="normal-case tracking-normal">
                Open source with MIT license.
              </Badge>
            </div>
          </div>

          <div className="min-w-0">
            <HeroOutcomePanel />
          </div>
        </div>
      </div>
    </section>
  );
}
