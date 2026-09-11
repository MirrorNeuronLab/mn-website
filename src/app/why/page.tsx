import {
  ArrowRight,
  Braces,
  Clock,
  Cpu,
  HardDrive,
  Network,
  RotateCcw,
  Share2,
  ShieldCheck,
  Terminal,
  Workflow,
} from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import ShellCommand from '@/components/ui/shell-command';
import { absoluteUrl, createMetadata, jsonLd, siteConfig } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Why MirrorNeuron',
  path: '/why',
  description:
    'Build and run durable, long-running AI agents locally, then pool trusted machines when the work needs more compute.',
  keywords: [
    'why MirrorNeuron',
    'durable AI workflows',
    'long-running AI agents',
    'self-hosted AI workflows',
    'Temporal alternative',
    'Airflow alternative',
  ],
});

const principles = [
  {
    number: '01',
    tag: 'Executable blueprints',
    title: 'Start with a blueprint',
    text: 'Run a working agent flow first, then adapt its code, tools, and models to your work.',
    icon: Braces,
  },
  {
    number: '02',
    tag: 'Durable state',
    title: 'Keep progress durable',
    text: 'State, retries, checkpoints, and human pauses stay with the run through failures and restarts.',
    icon: RotateCcw,
  },
  {
    number: '03',
    tag: 'Self-hosted',
    title: 'Operate it on your machines',
    text: 'Keep the runtime close to your files, GPUs, sensors, and private systems. Add machines only when needed.',
    icon: Cpu,
  },
];

const scalingPoints = [
  {
    number: '01',
    tag: 'Zero redesign',
    title: 'Build a cluster in minutes',
    text: 'Start on one machine, then connect trusted PCs without redesigning the workflow.',
    icon: Network,
    tags: [],
  },
  {
    number: '02',
    tag: 'mn node join',
    title: 'Pool resources with one command',
    text: 'Add another machine to share compute and keep agent work moving across the cluster.',
    icon: Share2,
    tags: [],
  },
  {
    number: '03',
    tag: 'Cross-platform',
    title: 'Mix the hardware you already have',
    text: 'Run one private cluster across different operating systems and accelerator platforms.',
    icon: Cpu,
    tags: ['macOS', 'Linux', 'WSL2', 'Apple Silicon', 'NVIDIA', 'AMD', 'Intel'],
  },
];

const approaches = [
  {
    name: 'Airflow',
    category: 'Pipeline scheduler',
    badge: 'Batch pipelines',
    bestFor: 'Scheduled data pipelines and batch DAGs',
    startingPoint: 'Define DAGs and operate a shared scheduler.',
    featured: false,
  },
  {
    name: 'Temporal',
    category: 'Durable application platform',
    badge: 'Microservices',
    bestFor: 'Application services that need durable execution',
    startingPoint: 'Adopt its workflow model and run workers with a Temporal service.',
    featured: false,
  },
  {
    name: 'MirrorNeuron',
    category: 'Local agent runtime',
    badge: 'Agent runtime',
    bestFor: 'Long-running and real-time local agents',
    startingPoint: 'Run a blueprint directly on your PC, edge machine, or private cluster.',
    featured: true,
  },
];

const fitSignals = [
  {
    number: '01',
    tag: 'Long-running',
    title: 'The work outlives one request',
    answer:
      'MirrorNeuron is useful when an agent runs for hours or days, waits for events or people, or returns to the same job repeatedly.',
    icon: Clock,
  },
  {
    number: '02',
    tag: 'State integrity',
    title: 'Losing progress is expensive',
    answer:
      'Persisted state matters when restarting from the beginning would waste model calls, tool work, human review, or experimental results.',
    icon: ShieldCheck,
  },
  {
    number: '03',
    tag: 'Data sovereignty',
    title: 'The runtime should stay close to the data',
    answer:
      'Local and private deployment helps when workflows depend on internal files, engineering tools, sensors, video, or regulated systems.',
    icon: HardDrive,
  },
  {
    number: '04',
    tag: 'Zero ceremony',
    title: 'You want a runtime, not a platform project',
    answer:
      'MirrorNeuron is intentionally narrow. It handles the lifecycle around agent work without trying to replace every scheduler or application service.',
    icon: Terminal,
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
              'Build and run durable, long-running AI agents locally, then pool trusted machines when the work needs more compute.',
            url: absoluteUrl('/why'),
            inLanguage: 'en-US',
          }),
        }}
      />

      {/* Header */}
      <PageHeader
        eyebrow="Why MirrorNeuron"
        title="Build and run deep agents, locally and at scale."
        description="Run a blueprint on one PC. MirrorNeuron preserves the work through failures and pauses, then lets you pool trusted machines when you need more compute."
        actions={
          <>
            <Button asChild size="lg" className="h-11 rounded-full bg-[#f4f2ed] px-6 text-sm font-medium text-[#151514] shadow-[0_12px_32px_rgba(255,255,255,0.08)] hover:bg-white hover:scale-[1.02] transition-all">
              <TrackedLink
                href="/blueprints"
                eventName="click_why_blueprints_hero"
                eventParams={{ location: 'why_hero' }}
              >
                Browse blueprints
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </Button>
            <Button asChild size="lg" variant="secondary" className="h-11 rounded-full border-white/15 bg-white/[0.03] px-6 text-sm hover:border-white/30 hover:bg-white/[0.08]">
              <TrackedLink
                href="https://doc.mirrorneuron.io/installation"
                target="_blank"
                rel="noreferrer"
                eventName="click_why_installation_hero"
                eventParams={{ location: 'why_hero' }}
              >
                Installation guide
              </TrackedLink>
            </Button>
          </>
        }
      />

      {/* Section 1: Principles */}
      <section aria-labelledby="principles-heading" className="mt-8">
        <div className="max-w-2xl">
          <Badge variant="outline">A focused runtime</Badge>
          <h2
            id="principles-heading"
            className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl"
          >
            Start with the workflow, not the orchestration project.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#888781] sm:text-base">
            MirrorNeuron handles the lifecycle around long-running work while
            keeping the starting path small and inspectable.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {principles.map((principle) => (
            <div
              key={principle.number}
              className="group rounded-2xl border border-white/[0.08] bg-[#11110f]/80 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-[#141412]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#56ccf2]/25 bg-[#56ccf2]/10 text-[#56ccf2] transition-colors group-hover:border-[#56ccf2]/40 group-hover:bg-[#56ccf2]/15">
                  <principle.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-[#777671]">
                  {principle.number}
                </span>
              </div>

              <div className="mt-5">
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[#777671]">
                  {principle.tag}
                </span>
                <h3 className="mt-1.5 text-base font-medium text-[#f4f2ed] group-hover:text-white">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#888781]">
                  {principle.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Scaling from one PC to a cluster */}
      <section
        aria-labelledby="scaling-heading"
        className="mt-24 overflow-hidden rounded-3xl border border-white/[0.1] bg-[#11110f] shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
      >
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left panel */}
          <div className="flex flex-col justify-between border-b border-white/[0.1] bg-[#0c0c0b]/80 p-6 md:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div>
              <Badge variant="outline">From one PC to a cluster</Badge>
              <h2
                id="scaling-heading"
                className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl"
              >
                One machine first. A cluster when you need it.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#888781] sm:text-base">
                Keep the same workflow from a developer machine to a private,
                mixed-hardware pool without rewriting execution logic.
              </p>
            </div>

            {/* Terminal node list snippet */}
            <div className="mt-8 rounded-xl border border-white/[0.08] bg-[#080807] p-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[0.68rem] text-[#66655f]">
                <span>$ mn node list</span>
                <span className="text-emerald-400">3 connected</span>
              </div>
              <div className="mt-3 space-y-1.5 text-[0.72rem]">
                <div className="flex justify-between text-[#f4f2ed]">
                  <span>macbook-m3</span>
                  <span className="text-[#777671]">coordinator · ready</span>
                </div>
                <div className="flex justify-between text-[#56ccf2]">
                  <span>linux-gpu-box</span>
                  <span className="text-[#777671]">worker · active</span>
                </div>
                <div className="flex justify-between text-[#aaa9a3]">
                  <span>edge-sensor-01</span>
                  <span className="text-[#777671]">worker · ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right points */}
          <ol className="divide-y divide-white/[0.08]">
            {scalingPoints.map((point) => (
              <li
                key={point.number}
                className="group flex gap-5 p-6 md:p-8 transition-colors hover:bg-white/[0.015]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-[#56ccf2] group-hover:border-[#56ccf2]/30 group-hover:bg-[#56ccf2]/10 transition-colors">
                  <point.icon className="h-4 w-4" aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[#777671]">
                      {point.tag}
                    </span>
                    <span className="font-mono text-xs text-[#66655f]">
                      {point.number}
                    </span>
                  </div>

                  <h3 className="mt-1.5 text-base font-medium text-[#f4f2ed] group-hover:text-white">
                    {point.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#888781]">
                    {point.text}
                  </p>

                  {point.tags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Supported platforms">
                      {point.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-0.5 font-mono text-[0.65rem] text-[#aaa9a3]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Section 3: Comparison with Airflow & Temporal */}
      <section className="mt-24" aria-labelledby="comparison-heading">
        <div className="rounded-3xl border border-white/[0.1] bg-[#0c0c0b] p-6 md:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div className="lg:pt-2">
              <Badge variant="outline">Different jobs, different tools</Badge>
              <h2
                id="comparison-heading"
                className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl"
              >
                Pick the runtime that fits the work.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#888781] sm:text-base">
                Airflow and Temporal solve broad enterprise orchestration problems.
                MirrorNeuron stays focused on agents that run locally, keep
                working through interruption, and react in real time.
              </p>
            </div>

            <div className="space-y-4">
              {approaches.map((approach) => (
                <article
                  key={approach.name}
                  className={`rounded-2xl border p-6 transition-all duration-200 ${
                    approach.featured
                      ? 'border-[#56ccf2]/35 bg-[#56ccf2]/[0.06] shadow-[0_8px_30px_rgba(86,204,242,0.06)]'
                      : 'border-white/[0.08] bg-[#11110f]/80'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-medium text-[#f4f2ed]">
                        {approach.name}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs text-[#777671]">
                        {approach.category}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider ${
                        approach.featured
                          ? 'border border-[#56ccf2]/30 bg-[#56ccf2]/15 text-[#56ccf2]'
                          : 'border border-white/10 bg-white/[0.03] text-[#777671]'
                      }`}
                    >
                      {approach.badge}
                    </span>
                  </div>

                  <dl className="mt-5 grid gap-5 border-t border-white/[0.08] pt-4 sm:grid-cols-[0.95fr_1.05fr]">
                    <div>
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[#777671]">
                        Best for
                      </dt>
                      <dd className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#deddd8]">
                        {approach.bestFor}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[#777671]">
                        How it starts
                      </dt>
                      <dd className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#888781]">
                        {approach.startingPoint}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Fit signals */}
      <section className="mt-24" id="evaluate" aria-labelledby="evaluate-heading">
        <div className="max-w-2xl">
          <Badge variant="outline">When it fits</Badge>
          <h2
            id="evaluate-heading"
            className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl"
          >
            Use it when the work needs to keep going.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#888781] sm:text-base">
            These operational signals matter more than team size or deployment shape.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {fitSignals.map((item) => (
            <div
              key={item.number}
              className="group rounded-2xl border border-white/[0.08] bg-[#11110f]/80 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-[#141412]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#56ccf2]/25 bg-[#56ccf2]/10 text-[#56ccf2] transition-colors group-hover:border-[#56ccf2]/40 group-hover:bg-[#56ccf2]/15">
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-[#777671]">
                  Signal {item.number}
                </span>
              </div>

              <div className="mt-5">
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[#777671]">
                  {item.tag}
                </span>
                <h3 className="mt-1.5 text-base font-medium text-[#f4f2ed] group-hover:text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#888781]">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Bottom CTA Banner */}
      <section className="mt-24">
        <div className="rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#11110f] to-[#0c0c0b] p-8 sm:p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <Badge variant="outline" className="mb-4">
            Get started
          </Badge>
          <h2 className="font-display text-3xl font-normal leading-[1.15] text-[#f4f2ed] sm:text-4xl">
            Give your agent a durable runtime.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#888781] sm:text-base">
            Install the runtime in one command, launch a complete blueprint, and inspect execution from your own terminal.
          </p>

          <div className="mx-auto mt-8 max-w-lg">
            <ShellCommand
              command={siteConfig.installCommand}
              label="Install MirrorNeuron"
              eventName="copy_install_command"
              eventParams={{ location: 'why_bottom_cta' }}
              copyControl="icon"
              variant="compact"
            />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="h-11 rounded-full bg-[#f4f2ed] px-6 text-sm font-medium text-[#151514] shadow-[0_12px_32px_rgba(255,255,255,0.08)] hover:bg-white hover:scale-[1.02] transition-all">
              <TrackedLink
                href="/blueprints"
                eventName="click_why_blueprints_cta"
                eventParams={{ location: 'why_next_step' }}
              >
                Browse blueprints
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </Button>
            <Button asChild variant="secondary" className="h-11 rounded-full border-white/15 bg-white/[0.03] px-6 text-sm hover:border-white/30 hover:bg-white/[0.08]">
              <TrackedLink
                href="https://doc.mirrorneuron.io/installation"
                target="_blank"
                rel="noreferrer"
                eventName="click_why_docs_quickstart"
                eventParams={{ location: 'why_next_step' }}
              >
                Installation guide
              </TrackedLink>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

