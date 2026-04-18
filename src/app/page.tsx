import Link from 'next/link';
import {
  ArrowRight,
  Clock3,
  Database,
  FileCode2,
  Globe,
  Lock,
  Play,
  RefreshCcw,
  Server,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { FaApple, FaGithub, FaLinux, FaWindows } from 'react-icons/fa';
import InstallCommand from '@/components/InstallCommand';
import { createMetadata, siteConfig, useCaseLinks } from '@/lib/site';

export const metadata = createMetadata({
  description:
    'MirrorNeuron is the simple durable runtime for AI workflows. Run your first AI workflow in minutes, then build multi-agent workflows in normal Python or TypeScript without Airflow DAG sprawl or Temporal cluster complexity.',
  keywords: [
    'simple workflow runtime',
    'AI workflow SDK',
    'run AI workflow fast',
    'durable execution for AI agents',
    'background worker runtime',
    'long-running workflow orchestration',
  ],
});

const sdkExample = `from mn_sdk import agent, workflow
from mn_sdk.decorators import registry


def test_agent_decorator():
    @agent.defn(type="map")
    def my_test_agent(data):
        return data

    assert "my_test_agent" in registry.agents
    agent_def = registry.agents["my_test_agent"]
    assert agent_def.agent_type == "map"
    assert agent_def.name == "my_test_agent"


def test_workflow_decorator():
    @workflow.defn(name="TestFlow")
    class TestFlow:
        @workflow.run
        def run_flow(self):
            pass

    assert "TestFlow" in registry.workflows
    wf_def = registry.workflows["TestFlow"]
    assert wf_def.name == "TestFlow"
    assert wf_def.run_method.__name__ == "run_flow"`;

const comparisonRows = [
  {
    label: 'Primary model',
    airflow: 'DAGs and scheduled data pipelines',
    temporal: 'Workflow engine with durable state and broader orchestration scope',
    mirrorNeuron: 'Normal Python or TypeScript for durable AI workflows',
  },
  {
    label: 'Operational feel',
    airflow: 'More scheduler and pipeline infrastructure',
    temporal: 'Powerful, but typically heavier to learn and operate',
    mirrorNeuron: 'Simple path from install to first durable workflow',
  },
  {
    label: 'Fit for AI agents',
    airflow: 'Works, but agent loops feel bolted on',
    temporal: 'Capable, but often more ceremony than teams want',
    mirrorNeuron: 'Designed for long-lived agents, retries, sleep, resume, and recovery',
  },
  {
    label: 'Deployment style',
    airflow: 'Usually centralized pipeline infrastructure',
    temporal: 'Commonly a dedicated orchestration platform',
    mirrorNeuron: 'Run local, on-edge, cloud, or hybrid without changing the story',
  },
];

const capabilities = [
  {
    icon: <FileCode2 className="h-6 w-6 text-blue-400" />,
    title: 'Write normal code',
    description:
      'Use standard Python or TypeScript instead of learning a separate workflow language just to get durability.',
  },
  {
    icon: <RefreshCcw className="h-6 w-6 text-emerald-400" />,
    title: 'Recover automatically',
    description:
      'Persist state, retry work, and resume long-running workflows without rebuilding everything around timeouts.',
  },
  {
    icon: <Lock className="h-6 w-6 text-violet-400" />,
    title: 'Keep control of data',
    description:
      'Run on your own hardware or private infrastructure when privacy, latency, or policy matter.',
  },
  {
    icon: <Workflow className="h-6 w-6 text-orange-400" />,
    title: 'Stay focused on the workflow',
    description:
      'MirrorNeuron is for teams that want reliability without turning workflow orchestration into its own platform project.',
  },
];

const faqItems = [
  {
    question: 'What is MirrorNeuron?',
    answer:
      'MirrorNeuron is an open-source runtime for durable AI workflows, long-running agents, and background workers. It is built for teams who want reliable workflow execution in Python or TypeScript without a heavyweight orchestration experience.',
  },
  {
    question: 'How is MirrorNeuron different from Temporal?',
    answer:
      'Temporal is extremely capable, but many teams experience it as a larger conceptual and operational commitment. MirrorNeuron focuses on the narrower promise of durable AI workflows with a lighter path from install to first production-shaped use case.',
  },
  {
    question: 'When would I choose MirrorNeuron over Airflow?',
    answer:
      'Choose MirrorNeuron when your workload looks more like long-running AI agents, iterative background loops, or stateful workflow execution than traditional batch scheduling and DAG-based data pipelines.',
  },
  {
    question: 'Can MirrorNeuron run locally or on-prem?',
    answer:
      'Yes. MirrorNeuron is positioned for local, on-edge, cloud, or hybrid deployments, which makes it a strong fit for private or sensitive AI workflow environments.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      sameAs: [siteConfig.repoUrl],
    },
    {
      '@type': 'SoftwareApplication',
      name: siteConfig.name,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Linux, macOS, Windows',
      description: siteConfig.description,
      url: siteConfig.siteUrl,
      softwareHelp: siteConfig.docsUrl,
      codeRepository: siteConfig.repoUrl,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      description: siteConfig.description,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="selection:bg-blue-500/30">
      <section className="relative overflow-hidden border-b border-slate-800/70">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_55%,transparent_100%)]" />
        <div className="container relative z-10 mx-auto px-6 py-20 md:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                Start fast, keep the workflow durable
              </div>
              <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl lg:leading-[1.04]">
                Run your first
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  AI workflow in minutes
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Create multi-agent workflows from reusable blueprints and share
                them with anyone. From deep research to email automation, on a single machine or a cluster, at the edge or
                in the cloud, easy and reliable.
              </p>
              <div className="mt-8">
                <InstallCommand command={siteConfig.installCommand} />
              </div>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/#quickstart"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-200"
                >
                  <Play className="h-4 w-4" />
                  Run an example in 1 minute
                </Link>
                <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-slate-400">
                  <div className="flex items-center gap-3 text-lg">
                    <FaApple aria-label="macOS" title="macOS" />
                    <FaLinux aria-label="Linux" title="Linux" />
                    <div
                      className="inline-flex items-center gap-1"
                      aria-label="Windows WSL"
                      title="Windows WSL"
                    >
                      <FaWindows />
                      <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                        WSL
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">
                <FaGithub className="h-5 w-5 text-slate-300" />
                <span>Open source on GitHub, MIT license.</span>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl border border-slate-800 bg-[#0b1020] p-6 shadow-2xl">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                  1-minute path
                </div>
                <h2 className="mt-4 text-3xl font-bold text-white">
                  The easy path from first run to repeatable workflow
                </h2>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      step: '01',
                      title: 'Run an example quickly',
                      text: 'Install the CLI, start a working example, and get to a real result before you need to learn a platform.',
                    },
                    {
                      step: '02',
                      title: 'Turn it into a multi-agent workflow',
                      text: 'Compose agents and workflow logic in normal code instead of stitching together DAGs or orchestration infrastructure.',
                    },
                    {
                      step: '03',
                      title: 'Save it, share it, repeat it',
                      text: 'Keep the workflow durable so your team can rerun, recover, and reuse the same process without ceremony.',
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
                    >
                      <div className="text-sm font-semibold text-cyan-300">{item.step}</div>
                      <div>
                        <div className="text-base font-semibold text-white">{item.title}</div>
                        <p className="mt-1 text-sm leading-7 text-slate-400">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                  Positioning
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  MirrorNeuron aims to do for durable AI workflows what{' '}
                  <Link
                    href="https://ollama.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-4"
                  >
                    Ollama
                  </Link>{' '}
                  did for local models: make the powerful path feel obvious,
                  direct, and fast to adopt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="comparison" className="border-b border-slate-800/70 bg-slate-900/40 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              Simpler by design
            </div>
            <h2 className="mt-4 text-4xl font-bold text-white">
              A simpler alternative to Airflow and Temporal for durable AI workflows
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Airflow is excellent for scheduled pipelines. Temporal is excellent
              when you want a broad workflow platform. MirrorNeuron is for teams
              who want durable AI workflows, long-running agents, and recovery
              semantics without turning workflow orchestration into a second
              product to run.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto rounded-3xl border border-slate-800 bg-[#0b1020] shadow-2xl">
            <table className="min-w-full text-left">
              <thead className="border-b border-slate-800 bg-slate-900/70">
                <tr className="text-sm text-slate-300">
                  <th className="px-5 py-4 font-semibold text-white">Decision lens</th>
                  <th className="px-5 py-4 font-semibold text-white">Airflow</th>
                  <th className="px-5 py-4 font-semibold text-white">Temporal</th>
                  <th className="px-5 py-4 font-semibold text-cyan-300">MirrorNeuron</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-b border-slate-800/70 align-top">
                    <th className="px-5 py-5 text-sm font-semibold text-white">{row.label}</th>
                    <td className="px-5 py-5 text-sm leading-7 text-slate-300">{row.airflow}</td>
                    <td className="px-5 py-5 text-sm leading-7 text-slate-300">{row.temporal}</td>
                    <td className="px-5 py-5 text-sm leading-7 text-cyan-100">{row.mirrorNeuron}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/70 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-white">Why teams adopt MirrorNeuron quickly</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              The product differentiation is not just durability. It is durable
              execution delivered through an easier mental model and a shorter
              path to production-shaped workflows.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-[#0a0f1c] p-7 shadow-[0_12px_50px_rgba(0,0,0,0.18)]"
              >
                <div className="mb-5 inline-flex rounded-xl border border-slate-700 bg-slate-900/70 p-3">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="border-b border-slate-800/70 bg-slate-900/30 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
              Real workloads
            </div>
            <h2 className="mt-4 text-4xl font-bold text-white">Use cases where simplicity and durability both matter</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              MirrorNeuron fits teams building long-running AI agents, background
              automation, and stateful workflows that need to keep running long
              after a single request or batch job would have timed out.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {useCaseLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-3xl border border-slate-800 bg-[#0a0f1c] p-8 transition-colors hover:border-slate-600"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {item.title}
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-white">{item.description}</h3>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  {item.title === 'Finance' &&
                    'Run market simulations, stream telemetry, and keep stateful agents alive without building a workflow platform around them.'}
                  {item.title === 'Science & Research' &&
                    'Coordinate long-running simulations and iterative research loops with recovery semantics built into the runtime.'}
                  {item.title === 'AI Workers' &&
                    'Deploy persistent monitors and autonomous background workers that can sleep, wake, retry, and keep moving.'}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-300">
                  Explore use case
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="sdk" className="border-b border-slate-800/70 bg-[#08111e] py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                SDK integration
              </div>
              <h2 className="mt-4 text-4xl font-bold text-white">
                Build agents and workflows in code your team already understands
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                The SDK is where MirrorNeuron should feel obviously lighter than
                Airflow or Temporal. Define agents, register workflows, and keep
                the developer experience close to normal Python instead of making
                orchestration its own project.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Decorators register agents and workflows directly in code.',
                  'The same workflow can be saved, shared, rerun, and recovered later.',
                  'This is designed for multi-agent processes that need durability without heavy workflow ceremony.',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm leading-7 text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-[#0d1117] shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-700/70 px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs font-mono text-slate-400">sdk_example.py</div>
                <div className="w-10" />
              </div>
              <div className="overflow-x-auto p-6">
                <pre className="font-mono text-sm leading-7 text-slate-200">
                  <code>{sdkExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/70 py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">
                Product proof
              </div>
              <h2 className="mt-4 text-4xl font-bold text-white">
                Built for long-running AI agents, not just one-shot jobs
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                MirrorNeuron is designed around the practical problems teams hit
                when agent workflows stop being demos: retries, state recovery,
                sleeping workers, private deployment, and keeping systems useful
                even when steps fail.
              </p>
              <div className="mt-8 space-y-6">
                {[
                  {
                    icon: <Clock3 className="h-5 w-5 text-cyan-300" />,
                    title: 'Long-running execution',
                    text: 'Run workflows for hours, days, or longer without redesigning everything around request limits.',
                  },
                  {
                    icon: <Database className="h-5 w-5 text-cyan-300" />,
                    title: 'Durable state',
                    text: 'Persist job state so failed work can retry and workflows can resume instead of starting from zero.',
                  },
                  {
                    icon: <ShieldCheck className="h-5 w-5 text-cyan-300" />,
                    title: 'Private deployment options',
                    text: 'Keep sensitive models, tools, and data in your environment when local, edge, or hybrid execution matters.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-1 rounded-lg border border-slate-700 bg-slate-900/70 p-2">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#0b1020] p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="text-sm font-semibold text-white">Runtime activity</div>
                  <div className="text-sm text-slate-400">A lightweight view of durable workflow execution</div>
                </div>
                <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Healthy
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  ['Active workers', '24'],
                  ['Persisted states', '18,402'],
                  ['Recovered retries', '126'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</div>
                    <div className="mt-3 text-3xl font-bold text-white">{value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-3 rounded-2xl border border-slate-800 bg-[#05080f] p-5 font-mono text-sm text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">workflow.market-sim</span>
                  <span className="text-emerald-300">resumed successfully</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">worker.deep-research</span>
                  <span className="text-cyan-300">sleeping until next trigger</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">agent.incident-monitor</span>
                  <span className="text-orange-300">retry 2/3 after timeout</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">state.persistence</span>
                  <span className="text-emerald-300">checkpoint committed</span>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-2">
                  <Server className="h-4 w-4 text-blue-400" />
                  Local, cloud, or hybrid
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-2">
                  <Workflow className="h-4 w-4 text-violet-400" />
                  Workflow retries and resume
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-2">
                  <Globe className="h-4 w-4 text-emerald-400" />
                  Built for production-shaped AI loops
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/70 bg-[#07101c] py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-300">
                Security and deployment
              </div>
              <h2 className="mt-4 text-4xl font-bold text-white">
                Own your runtime, your data, and your deployment story
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                MirrorNeuron is built for teams that care about private execution
                environments as much as simple developer experience. Run it
                locally, on-edge, in the cloud, or across hybrid environments
                without changing the core promise of the product.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  title: 'Local-first options',
                  text: 'Useful for private research, internal agents, and sensitive workflows that should stay on your infrastructure.',
                },
                {
                  title: 'Bounded execution',
                  text: 'Positioned around safe, controlled execution rather than giving long-lived agents unrestricted access by default.',
                },
                {
                  title: 'Durable recovery',
                  text: 'Workflow state and retry semantics help teams recover from failure without rebuilding business logic around outages.',
                },
                {
                  title: 'Clear trust pages',
                  text: 'Security, privacy, pricing, and terms pages now exist so buyers and crawlers both understand the product earlier.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800/70 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
                Search-friendly answers
              </div>
              <h2 className="mt-4 text-4xl font-bold text-white">Frequently asked questions about MirrorNeuron</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                These are the questions buyers and search engines both need the
                site to answer clearly: what MirrorNeuron is, who it is for, and
                why it differs from heavyweight workflow tooling.
              </p>
            </div>

            <div className="mt-12 space-y-5">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-2xl border border-slate-800 bg-[#0a0f1c] p-6">
                  <h3 className="text-xl font-semibold text-white">{item.question}</h3>
                  <p className="mt-3 text-base leading-8 text-slate-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="quickstart" className="relative py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_45%)]" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-white">Run your first durable workflow in minutes</h2>
            <p className="mt-5 text-xl leading-8 text-slate-300">
              Start with the local CLI, inspect the open-source repository, and
              move from a first run to a real use case without switching to a
              heavier orchestration model.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-800 bg-[#0d1117] p-5 font-mono text-sm shadow-2xl">
            <div className="text-slate-500"># Install MirrorNeuron</div>
            <div className="mt-2 break-all text-slate-200">
              <span className="text-blue-400">curl</span> -fsSL https://mirrorneuron.io/install.sh | bash
            </div>
            <div className="mt-5 text-slate-500"># Run an example workflow</div>
            <div className="mt-2 text-slate-200">
              <span className="text-emerald-400">mn</span> run examples/agent_research
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={siteConfig.docsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-200"
            >
              Read the quickstart guide
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-8 py-4 text-lg font-semibold text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-900/60"
            >
              Explore the GitHub repository
            </Link>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
