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
    'Why MirrorNeuron is an AI-native, easy-to-adopt runtime for durable AI workflows, reusable blueprints, long-running agents, and background workers.',
  keywords: [
    'why MirrorNeuron',
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
    text: 'Great for scheduled pipelines, but agent workflows need tool calls, waiting, retries, and background work without turning every idea into DAG operations.',
  },
  {
    title: 'Temporal feels like a platform project.',
    text: 'Powerful for broad workflow infrastructure, but often slow and costly to adopt when a solo builder or small team just needs reliable agents today.',
  },
  {
    title: 'OpenClaw-style agents need guardrails.',
    text: 'Tool-using agents are useful, but long-running actions can be unpredictable without durable state, checkpoints, recovery, and explicit workflow boundaries.',
  },
];

const securityReasons = [
  {
    icon: <Server className="h-5 w-5 text-cyan-300" />,
    title: 'Self-host the runtime',
    text: 'Run MirrorNeuron on your own machine, edge node, cloud account, or cluster. Agent work stays inside infrastructure you control.',
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
              'A product explanation of MirrorNeuron as an AI-native runtime for durable workflows.',
            url: absoluteUrl('/why'),
          }),
        }}
      />
      <PageHeader
        title="Reliable agent runtime for anyone"
        description="Define your multi-agent workflow in normal code. MirrorNeuron handles the running, waiting, retries, recovery, and repeatability without making you build a workflow platform first."
      />

      <section>
        <SdkCodeTabs />
      </section>

      <WhyBlock
        eyebrow="Who needs MirrorNeuron"
        title="When orchestration is too heavy, but agent scripts are too fragile."
        description="MirrorNeuron is for builders who want durable multi-agent workflows without slow platform setup, high operational cost, or unpredictable tool-use loops."
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
        title="Explore with AI without losing control of your data."
        description="MirrorNeuron can run fully self-hosted, inside your own governance boundary. Give agents room to reason, search, and use tools, while keeping execution sandboxed, observable, and recoverable."
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
