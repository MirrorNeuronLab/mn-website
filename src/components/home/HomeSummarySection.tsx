import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowRight,
  Braces,
  Cpu,
  ServerCog,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';

const fitSteps = [
  {
    eyebrow: 'Write it',
    title: 'Normal Python or a blueprint',
    text: 'Use familiar code and tools. Start from a working example when you want a faster path.',
    icon: Braces,
  },
  {
    eyebrow: 'Keep it running',
    title: 'Durability is built in',
    text: 'State, retries, checkpoints, recovery, and scoped tool access come with the runtime.',
    icon: Workflow,
    featured: true,
  },
  {
    eyebrow: 'Deploy it',
    title: 'Start local, scale when needed',
    text: 'Run on one PC, at the edge, or in a private cluster without changing the workflow model.',
    icon: ServerCog,
  },
];

const teamNeeds = [
  {
    label: 'Physical AI & edge',
    title: 'Work close to the data',
    text: 'Keep sensor, video, and physical AI workflows near the systems they depend on.',
    examples: [
      'Manufacturing inspection',
      'Warehouse robotics',
      'Smart sensor monitoring',
    ],
    icon: ServerCog,
  },
  {
    label: 'Private & regulated',
    title: 'Keep sensitive work private',
    text: 'Run workflow state and artifacts inside regulated, private, or air-gapped environments.',
    examples: [
      'Financial risk analysis',
      'Clinical data processing',
      'Regulated document review',
    ],
    icon: ShieldCheck,
  },
  {
    label: 'Long-running agents',
    title: 'Start from a working pattern',
    text: 'Run a blueprint, inspect every step, then adapt the code and tools to your use case.',
    examples: [
      'Scientific research loops',
      'Code generation and review',
      'Private knowledge agents',
    ],
    icon: Workflow,
  },
];

const deploymentTargets = [
  {
    label: 'Single PC',
    title: 'Developer desktop',
    text: 'Build and run deep-agent workflows on the machine you already use, with no cluster required.',
    image: '/on-edge/desktop.png',
    alt: 'Line illustration of a compact developer desktop computer',
  },
  {
    label: 'Scale out',
    title: 'Private cluster',
    text: 'Add trusted machines when a workflow needs more capacity, uptime, or shared access.',
    image: '/on-edge/cluster.png',
    alt: 'Line illustration of two connected private cluster nodes',
  },
  {
    label: 'Accelerated',
    title: 'GPU workstation',
    text: 'Keep model inference close to sensors, video, private data, and other demanding workloads.',
    image: '/on-edge/workstaion.png',
    alt: 'Line illustration of a GPU workstation tower',
  },
];

const inferenceHardware = [
  ['Mac', 'Apple Silicon'],
  ['NVIDIA', 'GPU acceleration'],
  ['AMD', 'CPU & GPU'],
  ['Intel', 'CPU & GPU'],
];

export function HomeSummarySection() {
  return (
    <Section id="overview">
      <div className="mn-container">
        <div className="mx-auto max-w-5xl text-center">
          <Badge variant="outline">Where MirrorNeuron fits</Badge>
          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-white md:text-3xl lg:whitespace-nowrap">
            Write the workflow. MirrorNeuron keeps it running.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Durable execution without learning Airflow or building Temporal
            infrastructure around every agent.
          </p>
        </div>

        <Card
          variant="soft"
          className="mt-9 overflow-hidden border border-slate-800/80 p-4 md:p-5"
        >
          <div className="grid gap-3 md:grid-cols-[1fr_auto_1.08fr_auto_1fr] md:items-stretch">
            {fitSteps.map((step, index) => (
              <div key={step.title} className="contents">
                <div
                  className={`rounded-2xl border p-4 md:p-5 ${
                    step.featured
                      ? 'border-cyan-300/25 bg-cyan-300/[0.08] shadow-[0_16px_50px_rgba(34,211,238,0.08)]'
                      : 'border-slate-800 bg-slate-950/45'
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    <step.icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-cyan-300">
                    {step.eyebrow}
                  </div>
                  <h3 className="mt-2 text-base font-semibold leading-6 text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {step.text}
                  </p>
                </div>

                {index < fitSteps.length - 1 ? (
                  <div className="flex items-center justify-center py-1 text-slate-600 md:px-1 md:py-0">
                    <ArrowDown className="h-5 w-5 md:hidden" aria-hidden="true" />
                    <ArrowRight className="hidden h-5 w-5 md:block" aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/35 p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
              <p className="max-w-3xl text-sm leading-6 text-slate-300">
                Keep workflow state and artifacts on your infrastructure. Data
                leaves only through the models and tools you configure.
              </p>
            </div>
            <Badge variant="outline" className="shrink-0">
              Software runtime, not hardware
            </Badge>
          </div>
        </Card>

        <div className="mx-auto mt-14 max-w-4xl text-center">
          <Badge variant="outline">Built for real workloads</Badge>
          <h3 className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl">
            Serious AI work, without a platform team.
          </h3>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {teamNeeds.map((need) => (
            <Card
              key={need.title}
              variant="soft"
              className="rounded-3xl border border-slate-800/80 p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                <need.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <Badge variant="outline" className="mt-4">
                {need.label}
              </Badge>
              <h4 className="mt-3 text-lg font-semibold text-white">
                {need.title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {need.text}
              </p>
              <div className="mt-4 border-t border-slate-800/80 pt-4">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Example workflows
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {need.examples.map((example) => (
                    <li key={example} className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300"
                        aria-hidden="true"
                      />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="link">
            <Link href="/blueprints">
              Choose a runnable blueprint
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="relative mt-20 border-t border-slate-800/80 pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline">Deploy on your terms</Badge>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-white md:text-3xl">
              Start on one PC. Scale to a private cluster.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
              Keep the same workflow from a developer machine to an accelerated
              workstation or private cluster. Add hardware only when the work needs it.
            </p>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {deploymentTargets.map((target) => (
              <Card
                key={target.title}
                variant="plain"
                className="overflow-hidden rounded-3xl border border-slate-800/80 p-4"
              >
                <div className="flex min-h-48 items-center justify-center rounded-2xl border border-cyan-300/10 bg-black/70 p-5">
                  <Image
                    src={target.image}
                    alt={target.alt}
                    width={300}
                    height={225}
                    sizes="(max-width: 1023px) calc(100vw - 4rem), 30vw"
                    className="h-auto w-full max-w-72 object-contain"
                  />
                </div>
                <div className="p-2 pb-3 pt-5">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">
                    {target.label}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {target.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {target.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <Card
            variant="soft"
            className="mt-6 rounded-3xl border border-cyan-300/15 p-5 md:p-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex max-w-xl items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <Cpu className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Use the hardware you already trust
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Choose the inference stack that fits each machine while the
                    workflow and runtime controls stay consistent.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {inferenceHardware.map(([vendor, detail]) => (
                  <div
                    key={vendor}
                    className="min-w-28 rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-center"
                  >
                    <div className="text-sm font-semibold text-slate-100">
                      {vendor}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">{detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
