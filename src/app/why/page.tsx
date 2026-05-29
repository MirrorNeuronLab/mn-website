import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  Server,
  ShieldCheck,
} from 'lucide-react';
import type { ReactNode } from 'react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageShell } from '@/components/ui/page-shell';
import SdkCodeTabs from '@/components/home/SdkCodeTabs';
import { absoluteUrl, createMetadata, jsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Why MirrorNeuron',
  path: '/why',
  description:
    'Reliable local AI workflows that keep working. Run durable agent workflows on your own machines without depending on cloud-first orchestration.',
  keywords: [
    'why MirrorNeuron',
    'reliable local AI workflows',
    'open-source AI workflow runtime',
    'edge AI runtime',
    'self-hosted AI agents',
    'AI-native workflow runtime',
    'durable AI workflows',
    'long-running AI agents',
    'Temporal alternative',
    'Airflow alternative',
    'AI workflow blueprints',
  ],
});

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
    title: 'Long-running workflow state',
    text: 'The workflow needs to wait, retry, sleep, resume, call tools, or keep background state instead of finishing in one request.',
  },
  {
    title: 'Blueprint-led adoption',
    text: 'You want a working example first, then a path to replace mock inputs with your own adapters, code, and data.',
  },
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

function WhyOpening() {
  return (
    <>
      <Button asChild variant="ghost" size="sm" className="mb-8 px-0 text-slate-400 hover:bg-transparent hover:text-white">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <section className="mb-16 max-w-5xl py-10 md:mb-20 md:py-16 lg:py-20">
        <h1 className="mn-gradient-text max-w-4xl text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl lg:leading-[1.1]">
          Reliable local AI workflows without cloud-first orchestration
        </h1>
        <div className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
          <p>
            Run durable agent workflows on your own machines, close to the
            data, tools, and compute they need. When something fails,
            MirrorNeuron helps the workflow remember where it was, try again,
            and continue.
          </p>
        </div>
      </section>
    </>
  );
}

function WhyBlock({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title?: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-20">
      <div className="max-w-3xl">
        {eyebrow && <Badge variant="outline">{eyebrow}</Badge>}
        {title && (
          <h2
            className={`text-2xl font-bold leading-tight text-white md:text-3xl ${
              eyebrow ? 'mt-4' : ''
            }`}
          >
            {title}
          </h2>
        )}
        <p
          className={`text-base leading-8 text-slate-300 ${
            eyebrow || title ? 'mt-4' : ''
          }`}
        >
          {description}
        </p>
      </div>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function BenchmarkProof() {
  return (
    <Card
      variant="plain"
      className="mt-8 bg-slate-950/60 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.24)] md:p-8"
    >
      <div className="max-w-3xl">
        <Badge variant="outline">Benchmark proof</Badge>
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
      <p className="mt-4 text-right text-xs leading-6 text-slate-500">
        Note: based on benchmarks using real blueprints with context
        compression enabled.
      </p>
    </Card>
  );
}

export default function WhyPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'Why MirrorNeuron',
            description:
              'A product explanation of MirrorNeuron for reliable local AI workflows that keep working on your own machines without depending on cloud-first orchestration.',
            url: absoluteUrl('/why'),
            inLanguage: 'en-US',
            about: [
              'durable AI workflows',
              'long-running AI agents',
              'Airflow alternative',
              'Temporal alternative',
            ],
          }),
        }}
      />
      <WhyOpening />

      <section>
        <BenchmarkProof />
        <div className="mt-8">
          <div className="max-w-3xl">
            <Badge variant="outline">Start familiar</Badge>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-white md:text-3xl">
              Start with normal code.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Start with Python or a simple manifest, reuse your existing agents
              and tools, and let MirrorNeuron handle waiting, retries, recovery,
              and repeatable runs around normal code.
            </p>
          </div>
          <div className="mt-7">
            <SdkCodeTabs />
          </div>
        </div>
      </section>

      <WhyBlock
        eyebrow="Best fit"
        title="For teams building durable AI workflows."
        description="MirrorNeuron is a good fit when AI workflows need background execution, recovery, and a first-run path that stays easy to adopt."
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
        eyebrow="On-edge first, cloud when needed"
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

      <Card variant="panel" className="mt-20 p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Badge variant="outline">Start from real workflows</Badge>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-white md:text-3xl">
              If the problem sounds familiar, start with a blueprint.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
              Blueprints show the product in the way developers care about most:
              runnable workflows with manifests, agents, recovery modes, and code
              you can change.
            </p>
          </div>
          <Button asChild className="px-5 py-3">
            <TrackedLink
              href="/blueprints"
              eventName="click_why_blueprints"
              eventParams={{ location: 'why_cta' }}
            >
              View blueprints
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </Button>
        </div>
      </Card>
    </PageShell>
  );
}
