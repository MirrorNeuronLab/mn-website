import { ArrowRight, LockKeyhole, Server, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import TrackedLink from '@/components/TrackedLink';
import { Card } from '@/components/ui/card';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import SdkCodeTabs from '@/components/home/SdkCodeTabs';
import { absoluteUrl, createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Why MirrorNeuron',
  path: '/why',
  description:
    'Why MirrorNeuron is on-edge AI infrastructure for durable workflows, reusable blueprints, long-running agents, and background workers that can run near data or in the cloud.',
  keywords: [
    'why MirrorNeuron',
    'on-edge AI infrastructure',
    'edge AI runtime',
    'AI-native workflow runtime',
    'durable AI workflows',
    'Temporal alternative',
    'Airflow alternative',
    'AI workflow blueprints',
  ],
});

const painSignals = [
  {
    title: 'Airflow feels like too much ceremony.',
    text: 'Great for scheduled pipelines, but on-edge agent workflows need tool calls, waiting, retries, and background work without turning every local action into DAG operations.',
  },
  {
    title: 'Temporal feels like a platform project.',
    text: 'Powerful for broad workflow infrastructure, but often slow and costly to adopt when a solo builder or small team just needs reliable agents close to their data today.',
  },
  {
    title: 'Edge-deployed agents need guardrails.',
    text: 'Tool-using agents are useful, but long-running actions near local systems can be unpredictable without durable state, checkpoints, recovery, and explicit workflow boundaries.',
  },
];

const securityReasons = [
  {
    icon: <Server className="h-5 w-5 text-cyan-300" />,
    title: 'Run on-edge first',
    text: 'Run MirrorNeuron on your own machine, edge node, private cluster, or cloud account. Agent work can stay inside infrastructure you control.',
  },
  {
    icon: <LockKeyhole className="h-5 w-5 text-cyan-300" />,
    title: 'Keep data under governance',
    text: 'Your workflows can operate where your data already lives, so sensitive inputs and outputs do not need to leave your security boundary.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-cyan-300" />,
    title: 'Sandbox exploratory AI',
    text: 'Let agents research, call tools, and explore broadly, while execution stays bounded by explicit workflow stages, policies, and recovery.',
  },
];

const bestFitSignals = [
  {
    title: 'Private or local data',
    text: 'Your workflow should run close to files, databases, research systems, financial signals, devices, or internal tools.',
  },
  {
    title: 'Long-running agent work',
    text: 'The agent needs to wait, retry, sleep, resume, call tools, or keep background state instead of finishing in one request.',
  },
  {
    title: 'Blueprint-led adoption',
    text: 'You want a working example first, then a path to replace mock inputs with your own adapters, code, and data.',
  },
];

const trustPosture = [
  'Open-source runtime you can inspect before sensitive use.',
  'Local and self-hosted operation for workflows that should stay inside your environment.',
  'No hosted workflow service or customer account is required from this website.',
  'No customer workflow data collection through the open-source runtime.',
  'Your infrastructure controls workflow data, credentials, logs, and connected tools.',
  'Review code, dependencies, and deployment configuration before production or regulated use.',
];

const marketNarrative = [
  {
    title: 'AI work is moving closer to data',
    text: 'Agents are becoming useful around private systems, local tools, devices, and domain data that teams may not want to ship to a hosted workflow layer first.',
  },
  {
    title: 'Durability is the missing step',
    text: 'A demo agent can answer once. A useful workflow needs retries, checkpoints, background execution, recovery, and a way to run again.',
  },
  {
    title: 'Blueprints lower the first-run cost',
    text: 'MirrorNeuron can start as a runnable example, then expand into normal-code workflows that move from laptop to edge, private cluster, or cloud.',
  },
];

const benchmarkHighlights = [
  {
    value: '99.2%',
    label: 'Fault recovery rate',
    base: '124 / 125 injected failures recovered',
    claim: 'Recovers from worker, tool, loop, and approval failures.',
  },
  {
    value: '95.0%',
    label: 'Workflow completion rate',
    base: '19 / 20 golden workflows completed',
    claim: 'Completes real multi-step workflows reliably.',
  },
  {
    value: '52.3% lower',
    label: 'Cost vs naive agent chain',
    base: 'Optimized vs naive GPT-5.4 mini workflow',
    claim: 'Cuts cost per successful workflow by over half.',
  },
];

function WhyBlock({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-20">
      <div className="max-w-3xl">
        <div className="mn-eyebrow mn-gradient-text">{eyebrow}</div>
        <h2 className="mt-4 text-2xl font-bold leading-tight text-white md:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-300">
          {description}
        </p>
      </div>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function BenchmarkProof() {
  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.24)] md:p-8">
      <div className="max-w-3xl">
        <div className="mn-eyebrow mn-gradient-text">Benchmark proof</div>
        <h2 className="mt-4 text-2xl font-bold leading-tight text-white md:text-3xl">
          Reliable execution. Durable recovery. Lower cost.
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-300">
          These results show why MirrorNeuron is a runtime for real AI
          workflows, not just an agent demo: workflows finish, failures recover,
          and optimized runs can cost less than a naive agent chain.
        </p>
      </div>
      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {benchmarkHighlights.map((item) => (
          <Card key={item.label} variant="soft" className="border-0 p-6">
            <div className="text-4xl font-bold tracking-tight text-cyan-200">
              {item.value}
            </div>
            <h3 className="mt-4 text-base font-semibold leading-7 text-white">
              {item.label}
            </h3>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
              {item.base}
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              {item.claim}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function WhyPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'Why MirrorNeuron',
            description:
              'A product explanation of MirrorNeuron as on-edge AI infrastructure for durable workflows.',
            url: absoluteUrl('/why'),
          }),
        }}
      />
      <PageHeader
        title="On-edge AI runtime for reliable agents"
        description="Define your multi-agent workflow in normal code and run it near data, devices, and private systems first. MirrorNeuron handles running, waiting, retries, recovery, and repeatability without making you build a workflow platform first."
      />

      <section>
        <SdkCodeTabs />
        <BenchmarkProof />
      </section>

      <WhyBlock
        eyebrow="Best fit"
        title="For teams building agents where the work already happens."
        description="MirrorNeuron is a good fit when AI workflows need to stay close to private data, local tools, connected systems, or background work, while still remaining easy to adopt."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {bestFitSignals.map((item) => (
            <Card key={item.title} variant="soft" className="border-0 p-6">
              <h3 className="text-lg font-semibold leading-7 text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </WhyBlock>

      <WhyBlock
        eyebrow="Who needs MirrorNeuron"
        title="Airflow is pipelines. Temporal is broad orchestration. MirrorNeuron is durable AI workflows."
        description="Use MirrorNeuron when cloud orchestration is too heavy for the first run, but edge agent scripts are too fragile for real work."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {painSignals.map((item) => (
            <Card key={item.title} variant="soft" className="border-0 p-6">
              <h3 className="text-lg font-semibold leading-7 text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </WhyBlock>

      <WhyBlock
        eyebrow="Security and privacy"
        title="Run AI near sensitive systems without losing control."
        description="MirrorNeuron can run fully self-hosted, inside your own governance boundary, and still support cloud deployment when that is the right operational fit. Give agents room to reason, search, and use tools, while keeping execution sandboxed, observable, and recoverable."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {securityReasons.map((item) => (
            <Card key={item.title} variant="soft" className="border-0 p-6">
              <div className="mb-5 inline-flex rounded-2xl bg-slate-950/70 p-3">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </WhyBlock>

      <WhyBlock
        eyebrow="Trust posture"
        title="Simple, explicit claims are better than enterprise theater."
        description="MirrorNeuron is early open-source infrastructure. The trust story should be clear about what the website and runtime do today, and where users remain responsible for their own deployment."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {trustPosture.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-800 bg-slate-900/55 p-4 text-sm leading-7 text-slate-300"
            >
              {item}
            </div>
          ))}
        </div>
      </WhyBlock>

      <WhyBlock
        eyebrow="Why now"
        title="The wedge is durable AI where cloud-first orchestration is not the starting point."
        description="MirrorNeuron's product narrative is simple: make durable AI workflows easy to adopt where the work already lives, then let teams carry the same workflow into larger deployments."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {marketNarrative.map((item) => (
            <Card key={item.title} variant="soft" className="border-0 p-6">
              <h3 className="text-lg font-semibold leading-7 text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </WhyBlock>

      <section className="mt-20 rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.72))] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.24)] md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mn-eyebrow mn-gradient-text">
              Start from real workflows
            </div>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-white md:text-3xl">
              If the problem sounds familiar, start with a blueprint.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
              Blueprints show the product in the way developers care about most:
              runnable workflows with manifests, agents, recovery modes, and code
              you can change.
            </p>
          </div>
          <TrackedLink
            href="/blueprints"
            eventName="click_why_blueprints"
            eventParams={{ location: 'why_cta' }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_18px_45px_rgba(34,211,238,0.18)] transition-all hover:-translate-y-0.5 hover:bg-cyan-200"
          >
            View blueprints
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </section>
    </PageShell>
  );
}
