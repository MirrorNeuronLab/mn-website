import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import SdkCodeTabs from '@/components/home/SdkCodeTabs';
import {
  comparisonHighlights,
  comparisonRows,
  productProofItems,
  runtimeBadges,
  runtimeEvents,
  runtimeStats,
  securityItems,
} from '@/components/home/data';
import { absoluteUrl, createMetadata, useCaseLinks } from '@/lib/site';

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

const useCaseCards = useCaseLinks.map((item) => {
  if (item.title === 'Science & Research') {
    return {
      ...item,
      title: 'Science',
      description: 'Keep research loops moving without losing progress.',
      body: 'Coordinate experiments, hypotheses, and simulations with checkpoints and recovery built in.',
    };
  }

  if (item.title === 'AI Workers') {
    return {
      ...item,
      title: 'Marketing',
      description: 'Run campaign work that reacts while your team sleeps.',
      body: 'Automate research, audience signals, follow-up, and drafts as a workflow you can review and reuse.',
    };
  }

  return {
    ...item,
    description: 'Watch market risk continuously, not only on demand.',
    body: 'Turn changing signals into durable analysis that keeps running and surfaces decisions when conditions move.',
  };
});

const sdkPoints = [
  'Define agents and workflows in normal code.',
  'Save, share, rerun, and recover the same workflow.',
  'Use durability without turning orchestration into its own project.',
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
    <section className="mt-16">
      <div className="max-w-3xl">
        <div className="mn-eyebrow mn-gradient-text">{eyebrow}</div>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-white">
          {title}
        </h2>
        <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
          {description}
        </p>
      </div>
      <div className="mt-8">{children}</div>
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
        eyebrow="Why MirrorNeuron"
        title="Simple durable workflows for AI work that matters"
        description="MirrorNeuron helps you start from a working blueprint, keep agents reliable over time, and run workflows wherever your work needs to live."
      />

      <WhyBlock
        eyebrow="Launch real-impact workflows instantly"
        title="Start from useful work, not setup work."
        description="Pick a blueprint for research, marketing, finance, science, or operations, then customize it for your tools and goals."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {useCaseCards.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mn-card-soft group rounded-3xl p-6 transition-transform hover:-translate-y-0.5"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
                {item.title}
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-7 text-white">
                {item.description}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {item.body}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                View example
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </WhyBlock>

      <WhyBlock
        eyebrow="AI native and easy to use"
        title="Reliability for agents, without workflow ceremony."
        description="AI workflows need retries, tool calls, sleep, resume, and background execution. MirrorNeuron gives you those primitives without making every builder become an orchestration specialist."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {comparisonHighlights.map((item) => (
            <Card
              key={item.title}
              variant="soft"
              className="group p-6 transition-transform hover:-translate-y-0.5"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
                {item.eyebrow}
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-7 text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </WhyBlock>

      <WhyBlock
        eyebrow="From first workflow to long-term value"
        title="Prove value early, then grow without repainting the system."
        description="The point is not more machinery. It is useful AI workflows today, reliable operation tomorrow, and an adoption path that still makes sense as usage grows."
      >
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-[#0b1020] shadow-2xl">
          <table className="min-w-full text-left">
            <thead className="border-b border-slate-800 bg-slate-900/70">
              <tr className="text-sm text-slate-300">
                <th className="px-5 py-4 font-semibold text-white">
                  Question
                </th>
                <th className="px-5 py-4 font-semibold text-white">Airflow</th>
                <th className="px-5 py-4 font-semibold text-white">
                  Temporal
                </th>
                <th className="bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_38%),linear-gradient(180deg,rgba(15,23,42,0.62),rgba(2,6,23,0.5))] px-5 py-4 font-semibold text-cyan-200">
                  MirrorNeuron
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-slate-800/70 align-top"
                >
                  <th className="px-5 py-5 text-sm font-semibold text-white">
                    {row.label}
                  </th>
                  <td className="px-5 py-5 text-sm leading-7 text-slate-300">
                    {row.airflow}
                  </td>
                  <td className="px-5 py-5 text-sm leading-7 text-slate-300">
                    {row.temporal}
                  </td>
                  <td className="bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_36%),linear-gradient(180deg,rgba(15,23,42,0.54),rgba(2,6,23,0.42))] px-5 py-5 text-sm font-medium leading-7 text-cyan-50">
                    {row.mirrorNeuron}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WhyBlock>

      <WhyBlock
        eyebrow="SDK integration"
        title="Use code your team already understands."
        description="Define agents, register workflows, and keep the developer experience close to normal code instead of moving simple AI work into a heavy platform project."
      >
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            {sdkPoints.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm leading-7 text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
          <SdkCodeTabs />
        </div>
      </WhyBlock>

      <WhyBlock
        eyebrow="OpenClaw users"
        title="Turn assistant actions into reliable workflows."
        description="If you like agents that can act through tools, MirrorNeuron helps you make the next step durable: constrain the action, checkpoint progress, resume safely, and repeat the result."
      >
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            {productProofItems.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="mt-1 rounded-lg border border-slate-700 bg-slate-900/70 p-2">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-sm font-semibold text-white">
                  Controlled workflow trace
                </div>
                <div className="text-sm text-slate-400">
                  What changes when agent actions become durable workflows
                </div>
              </div>
              <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Guarded
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {runtimeStats.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {label}
                  </div>
                  <div className="mt-3 text-3xl font-bold text-white">
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3 rounded-2xl border border-slate-800 bg-[#05080f] p-5 font-mono text-sm text-slate-300">
              {runtimeEvents.map(([name, status, color]) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-slate-500">{name}</span>
                  <span className={color}>{status}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
              {runtimeBadges.map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-2"
                >
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </WhyBlock>

      <WhyBlock
        eyebrow="Security and deployment"
        title="Keep the runtime close to your data and your controls."
        description="Run locally, at the edge, in the cloud, or across a cluster. The goal is simple adoption without giving up deployment control."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {securityItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </WhyBlock>
    </PageShell>
  );
}
