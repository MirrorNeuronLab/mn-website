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
import { Card } from '@/components/ui/card';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import { createMetadata, siteConfig } from '@/lib/site';

const financeCommand = 'mn blueprint run finance_liquidity_microstructure_radar';

const proofPoints = [
  {
    title: 'Private feeds',
    text: 'Run analysis close to sensitive market data and internal systems.',
  },
  {
    title: 'Durable monitors',
    text: 'Keep risk loops alive with retries, checkpoints, and recovery.',
  },
  {
    title: 'Cloud-ready path',
    text: 'Move the same workflow shape to larger deployments when needed.',
  },
];

const capabilityItems = [
  {
    icon: <Clock className="h-5 w-5 text-cyan-300" />,
    title: 'Long-running execution',
    text: 'Agents can keep processing ticks, events, or review cycles without turning every step into a platform project.',
  },
  {
    icon: <Server className="h-5 w-5 text-cyan-300" />,
    title: 'Bounded runtime control',
    text: 'Executor leases and explicit workflow stages keep continuous work observable and resource-aware.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-cyan-300" />,
    title: 'Recoverable decisions',
    text: 'Persisted state, replayable events, and checkpoints help teams recover from failed tools or restarted workers.',
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
    'See how MirrorNeuron fits on-edge financial AI workflows, market simulations, streaming telemetry, and stateful agents that need durable execution near sensitive data.',
  keywords: [
    'on-edge finance AI',
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
        title="On-edge financial workflows and market simulations"
        description="Build agents that monitor market signals, test risk scenarios, and summarize exposure close to private data feeds and internal systems, with cloud deployment still available when scale calls for it."
      />

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <div className="mn-page-panel p-5 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-200">
            <LineChart className="h-4 w-4" />
            Fast proof
          </div>
          <h2 className="mt-5 max-w-2xl text-2xl font-bold leading-tight text-white md:text-3xl">
            Run a market-risk blueprint before building a workflow platform.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            MirrorNeuron keeps the finance workflow close to normal code:
            install, run a blueprint, inspect the trace, then swap mock feeds
            for your adapters and controls.
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
            <TrackedLink
              href="/blueprints"
              eventName="click_use_case_blueprints"
              eventParams={{ use_case: 'finance', location: 'hero' }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-200"
            >
              Explore all blueprints
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              href={siteConfig.docsUrl}
              target="_blank"
              rel="noreferrer"
              eventName="click_use_case_docs"
              eventParams={{ use_case: 'finance', location: 'hero' }}
              className="mn-secondary-action px-5 py-3"
            >
              Read the docs
              <ExternalLink className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>

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
          <div className="mn-eyebrow mn-gradient-text">The challenge</div>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-white md:text-3xl">
            Financial AI work rarely fits a one-shot agent script.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Market data feeds, risk monitors, and simulation loops often run
            for hours or days. Teams need durable execution near controlled
            systems without committing every early workflow to heavyweight
            orchestration.
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
          <div className="mn-eyebrow mn-gradient-text">
            Featured blueprints
          </div>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-white md:text-3xl">
            Start from concrete finance workflows.
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
              className="mn-gradient-card group block p-6"
            >
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
            </TrackedLink>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.72))] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.24)] md:p-8">
        <h2 className="text-2xl font-bold text-white">
          Why teams choose MirrorNeuron here
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          Financial AI workflows often need the durability of a workflow engine,
          but teams still want a simple developer experience and data-local
          execution. MirrorNeuron keeps the runtime on-edge first while
          preserving the recovery story that long-running market workloads need.
        </p>
      </section>
    </PageShell>
  );
}
