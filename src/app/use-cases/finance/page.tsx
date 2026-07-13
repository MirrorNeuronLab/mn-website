import {
  Activity,
  ArrowRight,
  Clock,
  ExternalLink,
  LineChart,
  Server,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import ShellCommand from '@/components/ui/shell-command';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import { createMetadata, siteConfig } from '@/lib/site';

const financeCommand = 'mn blueprint run finance_liquidity_microstructure_radar';

const proofPoints = [
  {
    title: 'Keep private feeds close',
    text: 'Place the workflow beside sensitive market data and internal risk systems.',
  },
  {
    title: 'Recover long-running monitors',
    text: 'Preserve progress across failed tools, interrupted workers, and restarts.',
  },
  {
    title: 'Scale without a rewrite',
    text: 'Keep the workflow model as you add private nodes or move into your cloud account.',
  },
];

const capabilityItems = [
  {
    icon: <Clock className="h-5 w-5 text-cyan-300" />,
    title: 'Work that outlives a request',
    text: 'Keep market monitors, event processors, and review cycles running for as long as the analysis requires.',
  },
  {
    icon: <Server className="h-5 w-5 text-cyan-300" />,
    title: 'Explicit runtime control',
    text: 'Use defined workflow stages, executor leases, and resource-aware placement to keep continuous work bounded and observable.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-cyan-300" />,
    title: 'State you can inspect',
    text: 'Persist job state, events, and artifacts so teams can understand what ran and recover from a known point.',
  },
];

const featuredBlueprints = [
  {
    icon: <Activity className="h-16 w-16 text-cyan-300" />,
    title: 'Liquidity Microstructure Radar',
    text: 'A live market microstructure workflow that generates ticks, analyzes signals, and produces liquidity-risk explanations as conditions change.',
    href: 'https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/finance_liquidity_microstructure_radar',
    slug: 'finance_liquidity_microstructure_radar',
  },
  {
    icon: <Zap className="h-16 w-16 text-cyan-300" />,
    title: 'Portfolio Crash Stress Lab',
    text: 'Stress a portfolio against drawdowns, rate shocks, and liquidity pressure before recommending hedge, cash, or defensive rebalance actions.',
    href: 'https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/finance_portfolio_crash_stress_lab',
    slug: 'finance_portfolio_crash_stress_lab',
  },
];

export const metadata = createMetadata({
  title: 'Finance AI Workflow Runtime',
  path: '/use-cases/finance',
  description:
    'Run durable financial AI workflows, market simulations, and risk monitors near sensitive data with persisted state, recovery, and self-hosted deployment.',
  keywords: [
    'self-hosted finance AI',
    'financial AI workflows',
    'market simulation runtime',
    'durable finance agents',
  ],
});

export default function FinanceUseCase() {
  return (
    <PageShell>
      <PageHeader
        backHref="/blueprints"
        backLabel="Back to Blueprints"
        eyebrow="Finance and market operations"
        title="Durable financial AI workflows near sensitive data."
        description="Run market monitors, risk simulations, and analysis loops beside the feeds and systems they need. Preserve state through failures, keep results reviewable, and scale the deployment when the workload demands it."
      />

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <Card variant="panel" className="p-5 md:p-8">
          <Badge>
            <LineChart className="h-4 w-4" />
            Runnable example
          </Badge>
          <h2 className="mt-5 max-w-2xl text-2xl font-bold leading-tight text-white md:text-3xl">
            Test the workflow before designing the platform.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            Run a complete market-risk blueprint, inspect its stages and output,
            then replace the mock feeds with your adapters, models, and review
            controls. The first useful result stays a workflow problem—not an
            infrastructure program.
          </p>
          <ShellCommand
            command={financeCommand}
            label="Run finance blueprint"
            eventName="copy_finance_blueprint_command"
            eventParams={{ location: 'finance_hero' }}
            variant="compact"
            className="mt-6"
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-white px-5 py-3 text-slate-900 hover:bg-slate-200">
              <TrackedLink
                href="/blueprints"
                eventName="click_use_case_blueprints"
                eventParams={{ use_case: 'finance', location: 'hero' }}
              >
                Explore all blueprints
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </Button>
            <Button asChild variant="secondary" className="px-5 py-3">
              <TrackedLink
                href={siteConfig.docsUrl}
                target="_blank"
                rel="noreferrer"
                eventName="click_use_case_docs"
                eventParams={{ use_case: 'finance', location: 'hero' }}
              >
                Read the docs
                <ExternalLink className="h-4 w-4" />
              </TrackedLink>
            </Button>
          </div>
        </Card>

        <div className="grid gap-3">
          {proofPoints.map((item) => (
            <Card key={item.title} variant="soft" className="border-0 p-5">
              <h3 className="text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <Badge variant="outline">The challenge</Badge>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-white md:text-3xl">
            Market workflows keep moving after a model responds.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Feeds update, tools fail, limits change, and people need to review
            decisions. A useful workflow must preserve its state across those
            events without forcing every team to build custom recovery logic or
            adopt a broad orchestration stack first.
          </p>
        </div>
        <div className="grid gap-4">
          {capabilityItems.map((item) => (
            <Card key={item.title} variant="soft" className="border-0 p-5">
              <div className="flex gap-4">
                <div className="mt-1 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-2">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {item.text}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-7 max-w-3xl">
          <Badge variant="outline">Featured blueprints</Badge>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-white md:text-3xl">
            Start from finance workflows you can inspect.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredBlueprints.map((blueprint) => (
            <TrackedLink
              key={blueprint.slug}
              href={blueprint.href}
              target="_blank"
              rel="noreferrer"
              eventName="open_featured_blueprint"
              eventParams={{
                location: 'finance_use_case',
                blueprint: blueprint.slug,
              }}
              className="group block"
            >
              <Card variant="gradient" className="h-full p-6">
                <div className="pointer-events-none float-right opacity-15 transition-opacity group-hover:opacity-25">
                  {blueprint.icon}
                </div>
                <h3 className="max-w-xl text-xl font-bold leading-7 text-white">
                  {blueprint.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  {blueprint.text}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  View blueprint
                  <ExternalLink className="h-4 w-4" />
                </div>
              </Card>
            </TrackedLink>
          ))}
        </div>
      </section>

      <Card variant="panel" className="mt-16 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white">
          Durable execution without moving the work away from the data.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          MirrorNeuron provides workflow state, event history, retries, and
          recovery in a runtime you can deploy inside your environment. Teams
          keep sensitive adapters and data paths close while starting with the
          simplicity of normal code and a runnable blueprint.
        </p>
      </Card>
    </PageShell>
  );
}
