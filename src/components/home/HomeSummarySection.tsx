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
    eyebrow: 'Define the workflow',
    title: 'Agents, tools, Python or JSON',
    text: 'Use familiar code or adapt a working blueprint. Your workflow stays explicit and portable.',
    icon: Braces,
  },
  {
    eyebrow: 'We run it',
    title: 'Reliable, safe execution',
    text: 'MirrorNeuron handles durable state, retries, checkpoints, recovery, and scoped tool access.',
    icon: Workflow,
    featured: true,
  },
  {
    eyebrow: 'Operate it your way',
    title: 'Local first, deploy when needed',
    text: 'Run on your PC, at the edge, or inside a trusted environment—and keep control of the runtime.',
    icon: ServerCog,
  },
];

const teamNeeds = [
  {
    label: 'Physical AI & edge',
    title: 'AI close to the data',
    text: 'Run sensor, video, and physical AI workflows near the machines and data they depend on.',
    examples: [
      'Manufacturing inspection',
      'Warehouse robotics',
      'Smart sensor monitoring',
    ],
    icon: ServerCog,
  },
  {
    label: 'Private & regulated',
    title: 'Privacy by deployment',
    text: 'Keep workflow state and artifacts inside compliant, regulated, or air-gapped environments.',
    examples: [
      'Financial risk analysis',
      'Clinical data processing',
      'Regulated document review',
    ],
    icon: ShieldCheck,
  },
  {
    label: 'Blueprint-led',
    title: 'A fast, guided start',
    text: 'Run a predefined blueprint, inspect a working workflow, then adapt normal code to your use case.',
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
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:whitespace-nowrap">
            An agent framework and a local-first runtime.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
            You define the workflow. MirrorNeuron runs it reliably and safely—
            without asking you to become an orchestration expert.
          </p>
        </div>

        <Card
          variant="soft"
          className="mt-12 overflow-hidden border border-slate-800/80 p-5 md:p-7"
        >
          <div className="grid gap-3 md:grid-cols-[1fr_auto_1.08fr_auto_1fr] md:items-stretch">
            {fitSteps.map((step, index) => (
              <div key={step.title} className="contents">
                <div
                  className={`rounded-2xl border p-5 ${
                    step.featured
                      ? 'border-cyan-300/25 bg-cyan-300/[0.08] shadow-[0_16px_50px_rgba(34,211,238,0.08)]'
                      : 'border-slate-800 bg-slate-950/45'
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    <step.icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">
                    {step.eyebrow}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold leading-7 text-white">
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

          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/35 p-4 md:flex-row md:items-center md:justify-between md:px-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
              <p className="max-w-3xl text-sm leading-6 text-slate-300">
                Workflow state and artifacts can stay on your infrastructure.
                External models and tools receive data only when you configure
                the workflow to use them.
              </p>
            </div>
            <Badge variant="outline" className="shrink-0">
              Software runtime, not hardware
            </Badge>
          </div>
        </Card>

        <div className="mx-auto mt-16 max-w-4xl text-center">
          <Badge variant="outline">Built for focused teams</Badge>
          <h3 className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl">
            For individuals and small teams that need local AI.
          </h3>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {teamNeeds.map((need) => (
            <Card
              key={need.title}
              variant="soft"
              className="rounded-3xl border border-slate-800/80 p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                <need.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <Badge variant="outline" className="mt-5">
                {need.label}
              </Badge>
              <h4 className="mt-4 text-xl font-semibold text-white">
                {need.title}
              </h4>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {need.text}
              </p>
              <div className="mt-5 border-t border-slate-800/80 pt-4">
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

        <div className="mt-16 flex justify-center">
          <Button asChild variant="link">
            <Link href="/blueprints">
              See all blueprints
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="relative mt-24 border-t border-slate-800/80 pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline">Deploy on your terms</Badge>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
              Start on one PC. Scale to a private cluster.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              MirrorNeuron keeps the same workflow model from a compact desktop
              to accelerated workstations and multi-machine deployments. Run
              close to your data, then add hardware only when the workload needs it.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {deploymentTargets.map((target) => (
              <Card
                key={target.title}
                variant="plain"
                className="overflow-hidden rounded-3xl border border-slate-800/80 p-4"
              >
                <div className="flex min-h-56 items-center justify-center rounded-2xl border border-cyan-300/10 bg-black/70 p-5">
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
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {target.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
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
                    Hardware-accelerated AI inference
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Use the inference stack that fits your machine while keeping
                    the workflow definition and runtime controls consistent.
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
