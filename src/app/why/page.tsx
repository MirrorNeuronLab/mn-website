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
    'MirrorNeuron gives developers durable execution for long-running AI workflows without Airflow DAGs or Temporal-style platform complexity. Start locally with normal code and scale when needed.',
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
    title: 'Run in your environment',
    text: 'Use a desktop, workstation, private cluster, or your cloud account. The runtime does not require a managed control plane.',
  },
  {
    icon: <LockKeyhole className="h-5 w-5 text-cyan-300" />,
    title: 'Keep data inside your boundary',
    text: 'Place workflows beside private files, databases, feeds, and tools so inputs and artifacts can remain in infrastructure you govern.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-cyan-300" />,
    title: 'Bound tool execution',
    text: 'Use explicit workflow stages, configured sandboxes, and execution policies to put practical limits around agent tool use.',
  },
];

const bestFitSignals = [
  {
    title: 'The work outlives one process',
    text: 'A job may run for hours, sleep between events, or need to continue after a machine or worker restarts.',
  },
  {
    title: 'AI tools need a reliable lifecycle',
    text: 'The workflow calls models, browsers, scripts, APIs, or people and needs clear state around every step.',
  },
  {
    title: 'You want to prove value first',
    text: 'Start from a runnable blueprint on one machine, then replace the examples and expand the deployment when the workflow earns it.',
  },
];

const orchestrationChoices = [
  {
    title: 'Airflow',
    text: 'A strong choice for scheduled data pipelines. Agent loops, tool calls, and human pauses often require teams to translate the work into DAG-oriented patterns.',
  },
  {
    title: 'Temporal',
    text: 'A powerful durable-execution platform for distributed applications. Teams adopt a broader programming and operating model than many early AI workflows need.',
  },
  {
    title: 'MirrorNeuron',
    text: 'Focused on durable AI workflows. Start from a blueprint or normal Python and JSON on one machine, then add runtime nodes when the workload grows.',
  },
];

const runtimeResponsibilities = [
  {
    title: 'Remember what happened',
    text: 'Persist job state and event history so a workflow is inspectable and does not lose its place after a restart.',
  },
  {
    title: 'Handle ordinary failure',
    text: 'Apply retries and recovery policies around workers, tools, and long-running stages instead of rebuilding that logic in every agent.',
  },
  {
    title: 'Keep deployment flexible',
    text: 'Run locally by default, connect trusted machines for more capacity, or place the runtime in your cloud environment.',
  },
];

const benchmarkHighlights = [
  {
    value: '95.0%',
    label: 'Workflow completion rate',
    base: '19 / 20 golden workflows completed',
    claim: 'Measures whether a complete multi-step workflow reached its intended result.',
  },
  {
    value: '99.2%',
    label: 'Fault recovery rate',
    base: '124 / 125 injected failures recovered',
    claim: 'Measures recovery from injected worker, tool, loop, and approval failures.',
  },
  {
    value: '52.3% lower',
    label: 'Cost vs naive agent chain',
    base: 'Optimized vs naive GPT-5.4 mini workflow',
    claim: 'Measures the evaluated workflow with context compression enabled.',
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
          The shortest path from an agent script to a durable workflow.
        </h1>
        <div className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
          <p>
            MirrorNeuron adds persisted state, retries, recovery, and runtime
            visibility around the agents and tools you already use. Start on one
            machine, in normal code, without turning the first workflow into an
            orchestration project.
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
          Measure the whole workflow, not the best demo run.
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-300">
          MirrorNeuron&apos;s current internal evaluation tracks whether workflows
          finish, whether they recover from injected failures, and what a
          successful run costs. These results describe the evaluated suite—not
          a universal guarantee for every workload.
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
        Internal benchmark results using the current blueprint evaluation set.{' '}
        <Link
          href="/blog/verification-for-agent-workflows"
          className="text-cyan-300 hover:text-cyan-200"
        >
          Read the benchmark context.
        </Link>
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
              'Why MirrorNeuron is a simpler runtime for durable AI workflows: normal code, persisted state, retries, recovery, and self-hosted deployment without general-purpose orchestration complexity.',
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
        <div className="max-w-3xl">
          <Badge variant="outline">Start familiar</Badge>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-white md:text-3xl">
            Keep writing code. Let the runtime manage the lifecycle.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Define agents and workflows in Python or a readable JSON manifest.
            Reuse your existing models, tools, and libraries while MirrorNeuron
            handles the state and recovery work around them.
          </p>
        </div>
        <div className="mt-7">
          <SdkCodeTabs />
        </div>
      </section>

      <WhyBlock
        eyebrow="A focused alternative"
        title="Choose the amount of orchestration your workload actually needs."
        description="Airflow and Temporal are capable platforms with broad jobs to do. MirrorNeuron narrows the problem to durable AI workflows, which makes the first useful run smaller and easier to own."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {orchestrationChoices.map((item) => (
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

      <BenchmarkProof />

      <WhyBlock
        eyebrow="Deployment and control"
        title="Run near sensitive systems without giving up a growth path."
        description="MirrorNeuron can run fully self-hosted inside your governance boundary and still move into a private cluster or cloud environment when scale or collaboration requires it."
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
        eyebrow="What the runtime owns"
        title="Make durability a runtime feature, not repeated application code."
        description="The runtime takes responsibility for the operational behavior every long-running agent eventually needs, while your code stays focused on the actual work."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {runtimeResponsibilities.map((item) => (
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
              See the runtime through a workflow you can run.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
              Each blueprint includes a runnable workflow, example inputs,
              recovery behavior, and code you can inspect and change. Pick the
              closest workload and get to a concrete result first.
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
