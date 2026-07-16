import { ArrowRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import { absoluteUrl, createMetadata, jsonLd } from '@/lib/site';

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
    title: 'Start with a blueprint',
    text: 'Run a working agent flow first, then adapt its code, tools, and models to your work.',
  },
  {
    number: '02',
    title: 'Keep progress durable',
    text: 'State, retries, checkpoints, and human pauses stay with the run through failures and restarts.',
  },
  {
    number: '03',
    title: 'Operate it on your machines',
    text: 'Keep the runtime close to your files, GPUs, sensors, and private systems. Add machines only when needed.',
  },
];

const scalingPoints = [
  {
    number: '01',
    title: 'Build a cluster in minutes',
    text: 'Start on one machine, then connect trusted PCs without redesigning the workflow.',
    tags: [],
  },
  {
    number: '02',
    title: 'Pool resources with one command',
    text: 'Add another machine to share compute and keep agent work moving across the cluster.',
    tags: [],
  },
  {
    number: '03',
    title: 'Mix the hardware you already have',
    text: 'Run one private cluster across different operating systems and accelerator platforms.',
    tags: ['macOS', 'Linux', 'WSL2', 'Apple Silicon', 'NVIDIA', 'AMD', 'Intel'],
  },
];

const approaches = [
  {
    name: 'Airflow',
    category: 'Pipeline scheduler',
    bestFor: 'Scheduled data pipelines and batch DAGs',
    startingPoint: 'Define DAGs and operate a shared scheduler.',
  },
  {
    name: 'Temporal',
    category: 'Durable application platform',
    bestFor: 'Application services that need durable execution',
    startingPoint: 'Adopt its workflow model and run workers with a Temporal service.',
  },
  {
    name: 'MirrorNeuron',
    category: 'Local agent runtime',
    bestFor: 'Long-running and real-time local agents',
    startingPoint: 'Run a blueprint directly on your PC, edge machine, or private cluster.',
    featured: true,
  },
];

const fitSignals = [
  {
    number: '01',
    title: 'The work outlives one request',
    answer:
      'MirrorNeuron is useful when an agent runs for hours or days, waits for events or people, or returns to the same job repeatedly.',
  },
  {
    number: '02',
    title: 'Losing progress is expensive',
    answer:
      'Persisted state matters when restarting from the beginning would waste model calls, tool work, human review, or experimental results.',
  },
  {
    number: '03',
    title: 'The runtime should stay close to the data',
    answer:
      'Local and private deployment helps when workflows depend on internal files, engineering tools, sensors, video, or regulated systems.',
  },
  {
    number: '04',
    title: 'You want a runtime, not a platform project',
    answer:
      'MirrorNeuron is intentionally narrow. It handles the lifecycle around agent work without trying to replace every scheduler or application service.',
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

      <PageHeader
        eyebrow="Why MirrorNeuron"
        title="Build and run deep agents, locally and at scale."
        description="Run a blueprint on one PC. MirrorNeuron preserves the work through failures and pauses, then lets you pool trusted machines when you need more compute."
        actions={
          <>
            <Button asChild size="lg">
              <TrackedLink
                href="/blueprints"
                eventName="click_why_blueprints_hero"
                eventParams={{ location: 'why_hero' }}
              >
                Browse blueprints
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </Button>
            <Button asChild size="lg" variant="secondary">
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

      <section aria-labelledby="principles-heading">
        <div className="max-w-2xl">
          <Badge variant="outline">A focused runtime</Badge>
          <h2
            id="principles-heading"
            className="mt-5 font-display text-3xl font-normal leading-[1.12] text-[#f4f2ed]"
          >
            Start with the workflow, not the orchestration project.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#888781]">
            MirrorNeuron handles the lifecycle around long-running work while
            keeping the starting path small and inspectable.
          </p>
        </div>

        <ol className="mt-10 grid border-y border-white/[0.1] md:grid-cols-3">
          {principles.map((principle, index) => (
            <li
              key={principle.number}
              className={`py-7 md:px-7 md:py-8 ${
                index > 0
                  ? 'border-t border-white/[0.1] md:border-l md:border-t-0'
                  : ''
              }`}
            >
              <span className="font-mono text-[0.66rem] text-[#66655f]">
                {principle.number}
              </span>
              <h3 className="mt-5 text-sm font-medium text-[#f4f2ed]">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#888781]">
                {principle.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="scaling-heading"
        className="mt-24 overflow-hidden rounded-3xl border border-white/[0.1] bg-[#11110f]"
      >
        <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
          <div className="border-b border-white/[0.1] bg-[#0f0f0e] p-6 md:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <Badge variant="outline">From one PC to a cluster</Badge>
            <h2
              id="scaling-heading"
              className="mt-5 font-display text-3xl font-normal leading-[1.12] text-[#f4f2ed]"
            >
              One machine first. A cluster when you need it.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#888781]">
              Keep the same workflow from a developer machine to a private,
              mixed-hardware pool.
            </p>
          </div>

          <ol className="divide-y divide-white/[0.09]">
            {scalingPoints.map((point) => (
              <li
                key={point.number}
                className="grid gap-3 p-6 sm:grid-cols-[2.5rem_1fr] sm:gap-5 md:px-8 lg:px-9"
              >
                <span className="font-mono text-[0.66rem] text-[#66655f]">
                  {point.number}
                </span>
                <div>
                  <h3 className="text-sm font-medium text-[#f4f2ed]">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#888781]">
                    {point.text}
                  </p>
                  {point.tags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Supported platforms">
                      {point.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-white/[0.1] bg-white/[0.025] px-2.5 py-1 text-[0.65rem] text-[#aaa9a3]"
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

      <section className="mt-24" aria-labelledby="comparison-heading">
        <div className="rounded-3xl border border-white/[0.1] bg-[#0f0f0e] p-6 md:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div className="lg:pt-2">
              <Badge variant="outline">Different jobs, different tools</Badge>
              <h2
                id="comparison-heading"
                className="mt-5 font-display text-3xl font-normal leading-[1.12] text-[#f4f2ed]"
              >
                Pick the runtime that fits the work.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-[#888781]">
                Airflow and Temporal solve broad orchestration problems.
                MirrorNeuron stays focused on agents that run locally, keep
                working, and react in real time.
              </p>
            </div>

            <div className="space-y-3">
              {approaches.map((approach) => (
                <article
                  key={approach.name}
                  className={`rounded-2xl border p-5 ${
                    approach.featured
                      ? 'border-[#8bc9bc]/35 bg-[#8bc9bc]/[0.07]'
                      : 'border-white/[0.09] bg-[#0c0c0b]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-sm font-medium text-[#f4f2ed]">
                      {approach.name}
                    </h3>
                    {approach.featured ? (
                      <span className="rounded-full border border-[#8bc9bc]/25 bg-[#8bc9bc]/[0.08] px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.13em] text-[#8bc9bc]">
                        Local first
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-[#66655f]">
                    {approach.category}
                  </p>

                  <dl className="mt-5 grid gap-5 border-t border-white/[0.08] pt-4 sm:grid-cols-[0.9fr_1.1fr]">
                    <div>
                      <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-[#66655f]">
                        Best for
                      </dt>
                      <dd className="mt-2 text-sm leading-6 text-[#deddd8]">
                        {approach.bestFor}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-[#66655f]">
                        How it starts
                      </dt>
                      <dd className="mt-2 text-sm leading-6 text-[#888781]">
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

      <section className="mt-24" id="evaluate" aria-labelledby="evaluate-heading">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <Badge variant="outline">When it fits</Badge>
            <h2
              id="evaluate-heading"
              className="mt-5 font-display text-3xl font-normal leading-[1.12] text-[#f4f2ed]"
            >
              Use it when the work needs to keep going.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#888781]">
              These signals matter more than team size or deployment shape.
            </p>
          </div>

          <ol className="grid border-t border-white/[0.12] sm:grid-cols-2">
            {fitSignals.map((item, index) => (
              <li
                key={item.number}
                className={`border-b border-white/[0.1] py-6 sm:px-6 ${
                  index % 2 === 1 ? 'sm:border-l sm:border-white/[0.1]' : ''
                }`}
              >
                <span className="font-mono text-[0.66rem] text-[#66655f]">
                  {item.number}
                </span>
                <h3 className="mt-5 text-sm font-medium text-[#f4f2ed]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#888781]">
                  {item.answer}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <nav
        aria-label="Get started"
        className="mt-20 flex flex-col gap-3 border-t border-white/[0.1] pt-10 sm:flex-row"
      >
        <Button asChild>
          <TrackedLink
            href="/blueprints"
            eventName="click_why_blueprints_cta"
            eventParams={{ location: 'why_next_step' }}
          >
            Browse blueprints
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </Button>
        <Button asChild variant="secondary">
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
      </nav>
    </PageShell>
  );
}
