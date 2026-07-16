import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Box,
  Cpu,
  Eye,
  FileCode2,
  MapPin,
  RadioTower,
  Scale,
  ShieldCheck,
  Sparkles,
  WifiOff,
} from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageShell } from '@/components/ui/page-shell';
import { absoluteUrl, createMetadata, jsonLd } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Why MirrorNeuron',
  path: '/why',
  description:
    'Decide whether MirrorNeuron fits your AI workflow: run long, complex jobs with visible state, recoverable execution, and local or edge deployment you control.',
  keywords: [
    'why MirrorNeuron',
    'deep AI agents',
    'local AI workflows',
    'edge AI runtime',
    'self-hosted AI workflows',
    'durable AI workflows',
    'long-running AI agents',
    'Temporal alternative',
    'Airflow alternative',
  ],
});

const reasons = [
  {
    icon: Sparkles,
    title: 'Normal code',
    text: 'Build agents and tools in Python, or start from a blueprint. The workflow stays explicit and readable.',
  },
  {
    icon: Eye,
    title: 'Visible execution',
    text: 'See state, tool use, recovery, and evidence. Pause, resume, cancel, or approve work when needed.',
  },
  {
    icon: ShieldCheck,
    title: 'Your infrastructure',
    text: 'Run locally, inside private sandboxes, or across trusted machines. Connect external services only by choice.',
  },
];

const evaluationQuestions = [
  {
    number: '01',
    icon: MapPin,
    question: 'Why do you want AI to run locally or at the edge?',
    answer:
      'Local execution gives you more control over sensitive data, latency, cost, and availability. It matters most when work needs to stay close to private files, factory systems, engineering tools, or other resources that should not depend entirely on the cloud.',
  },
  {
    number: '02',
    icon: Cpu,
    question: 'Do you have the hardware your workload needs?',
    answer:
      'Some blueprints can run on a MacBook. Larger production workloads may need more memory, faster GPUs, or dedicated machines. The right setup depends on the models, tools, and amount of work in the blueprint you choose.',
  },
  {
    number: '03',
    icon: Bot,
    question: 'Do you need a deep agent—or an interactive assistant?',
    answer:
      'Interactive assistants are excellent for work you guide turn by turn. A deep agent is for jobs that may run for hours or days, combine many model calls with ordinary software and specialized tools, and recover from interruptions while pursuing a longer goal.',
  },
  {
    number: '04',
    icon: RadioTower,
    question: 'Should AI move closer to your data?',
    answer:
      'Video, sensor, and physical-AI workloads create large, continuous data streams and often need immediate responses. Moving all of that data to the cloud can add latency, bandwidth cost, and reliability risk. Edge execution can be the practical way to operate in real time.',
  },
];

const boundaries = [
  {
    icon: WifiOff,
    title: 'Local does not always mean offline',
    text: 'Models may run entirely on your machine while browsing, email, APIs, or other connected skills still use the internet. For strict isolation, use an air-gapped environment and verify the workflow without a network connection.',
  },
  {
    icon: FileCode2,
    title: 'Open source gives you verifiability',
    text: 'You can inspect the code, review blueprint permissions, control network access, and operate on infrastructure you own. That transparency is useful, but it is not a managed-service security agreement or an automatic guarantee.',
  },
  {
    icon: Box,
    title: 'Sandboxing reduces risk',
    text: 'NVIDIA OpenShell creates a stronger boundary than running worker code directly on the host. Operators still need to review file access, uploaded content, environment variables, network policies, and available services.',
  },
  {
    icon: Scale,
    title: 'A completed run is not a correct decision',
    text: 'Successful execution means the workflow finished as designed. It does not make the result authoritative. Blueprints can produce evidence and review material, but they do not replace qualified human judgment.',
  },
];

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
              'An evaluation guide for running durable, long-running AI workflows locally, at the edge, or across infrastructure you control.',
            url: absoluteUrl('/why'),
            inLanguage: 'en-US',
            about: [
              'durable AI workflows',
              'deep AI agents',
              'local AI workflows',
              'edge AI runtime',
              'self-hosted AI workflows',
            ],
          }),
        }}
      />

      <Button
        asChild
        variant="ghost"
        size="sm"
        className="mb-8 px-0 text-slate-400 hover:bg-transparent hover:text-white"
      >
        <Link href="/">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>
      </Button>

      <header className="max-w-4xl py-6 md:py-10">
        <Badge variant="outline">Why MirrorNeuron</Badge>
        <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-white md:text-[2.75rem] md:leading-[1.1]">
          Durable AI workflows should not require an orchestration project.
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
          MirrorNeuron gives long-running agents durable state, recovery, and
          inspection without asking your team to assemble Airflow or Temporal
          infrastructure first.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="bg-white px-5 text-slate-900 hover:bg-slate-200">
            <TrackedLink
              href="/#quickstart"
              eventName="click_why_quickstart"
              eventParams={{ location: 'why_hero' }}
            >
              Run a local workflow
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </Button>
          <Button asChild variant="secondary" className="px-5">
            <Link href="#evaluate">Check whether it fits</Link>
          </Button>
        </div>
      </header>

      <section className="mt-10 md:mt-14" aria-labelledby="what-it-is-for">
        <div className="max-w-3xl">
          <div className="mn-eyebrow">What it is for</div>
          <h2
            id="what-it-is-for"
            className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl"
          >
            Serious AI work, with less operational ceremony.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            MirrorNeuron has one focused job: make durable AI work easy to
            start, inspect, recover, and own.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <Card
                key={reason.title}
                variant="soft"
                className="border-0 p-5 transition-transform hover:-translate-y-0.5 md:p-6"
              >
                <div className="inline-flex rounded-2xl bg-slate-950/70 p-3 text-cyan-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {reason.text}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      <section
        id="evaluate"
        className="mt-20 scroll-mt-28"
        aria-labelledby="evaluate-heading"
      >
        <div className="max-w-3xl">
          <div className="mn-eyebrow">Evaluate your fit</div>
          <h2
            id="evaluate-heading"
            className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl"
          >
            Four questions to answer before you adopt it.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            The value of local, durable execution depends on the work, the data,
            and the machines you already have. Start with the practical questions.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {evaluationQuestions.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.number}
                variant="plain"
                className="group bg-slate-950/55 p-5 transition-colors hover:border-cyan-400/30 md:p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold tracking-[0.2em] text-cyan-300">
                    {item.number}
                  </span>
                  <Icon className="h-5 w-5 text-slate-500 transition-colors group-hover:text-cyan-300" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-7 text-white">
                  {item.question}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {item.answer}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mt-20" aria-labelledby="boundaries-heading">
        <Card
          variant="panel"
          className="border border-amber-300/10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.08),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.78))] p-6 md:p-8"
        >
          <div className="max-w-3xl">
            <Badge variant="outline">Clear boundaries</Badge>
            <h2
              id="boundaries-heading"
              className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl"
            >
              More control is not the same as an automatic guarantee.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
              MirrorNeuron gives you control over where AI runs and how data is
              handled. Privacy, security, and correctness still depend on the
              workflow and the environment you configure.
            </p>
          </div>

          <div className="mt-8 grid gap-x-10 gap-y-8 lg:grid-cols-2">
            {boundaries.map((boundary) => {
              const Icon = boundary.icon;

              return (
                <div key={boundary.title} className="flex gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-7 text-white">
                      {boundary.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {boundary.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      <section className="mt-16" aria-labelledby="next-step-heading">
        <Card
          variant="plain"
          className="overflow-hidden border-cyan-300/15 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.13),transparent_35%),rgba(2,6,23,0.62)] p-6 md:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <Badge variant="outline">Next step</Badge>
              <h2
                id="next-step-heading"
                className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl"
              >
                Start with one safe, inspectable workflow.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
                Run a blueprint locally, inspect the result, then review its
                permissions before connecting real data or external services.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild className="bg-white px-5 text-slate-900 hover:bg-slate-200">
                <TrackedLink
                  href="https://doc.mirrorneuron.io/quickstart"
                  target="_blank"
                  rel="noreferrer"
                  eventName="click_why_docs_quickstart"
                  eventParams={{ location: 'why_next_step' }}
                >
                  Read the installation guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
              </Button>
              <Button asChild variant="secondary" className="px-5">
                <TrackedLink
                  href="/blueprints"
                  eventName="click_why_blueprints"
                  eventParams={{ location: 'why_next_step' }}
                >
                  Choose a blueprint
                </TrackedLink>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
