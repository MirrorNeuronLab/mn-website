import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';

const atAGlance = [
  ['Run a blueprint', 'Start directly'],
  ['State, retries, recovery', 'Durable execution'],
  ['Local, private, edge', 'Deployment'],
  ['MIT', 'License'],
];

const workflowSteps = [
  {
    number: '01',
    title: 'Start with a blueprint',
    text: 'Run a blueprint directly, then adapt its code and tools to your work.',
  },
  {
    number: '02',
    title: 'Let it keep going',
    text: 'MirrorNeuron persists state, retries failed steps, and resumes from known checkpoints.',
  },
  {
    number: '03',
    title: 'Stay in control',
    text: 'Inspect what happened, pause for approval, and choose exactly where the runtime operates.',
  },
];

const approaches = [
  {
    name: 'One-off script',
    strength: 'Fast to start',
    tradeoff: 'You own state and recovery',
  },
  {
    name: 'Airflow or Temporal',
    strength: 'General orchestration',
    tradeoff: 'A larger platform and vocabulary',
  },
  {
    name: 'MirrorNeuron',
    strength: 'Durable agent work',
    tradeoff: 'Normal code and a small runtime',
  },
];

const useCases = [
  {
    title: 'Background agents',
    text: 'Research, monitor, call tools, wait, and resume without keeping one process alive.',
    href: '/use-cases/ai-worker',
  },
  {
    title: 'Private analysis',
    text: 'Keep workflow state close to financial, scientific, or regulated data.',
    href: '/use-cases/finance',
  },
  {
    title: 'Physical and edge AI',
    text: 'Run near sensors, video, machines, and local models when latency and ownership matter.',
    href: '/blueprints',
  },
];

export function HomeSummarySection() {
  return (
    <>
      <Section className="border-t border-white/[0.08]">
        <div className="mn-container">
          <div className="text-center">
            <Badge variant="outline">At a glance</Badge>
          </div>
          <dl className="mt-10 grid border-y border-white/[0.1] sm:grid-cols-2 lg:grid-cols-4">
            {atAGlance.map(([value, label], index) => (
              <div
                key={label}
                className={`py-6 sm:px-6 lg:py-7 ${
                  index > 0 ? 'border-t border-white/[0.08] sm:border-t-0' : ''
                } ${index % 2 === 1 ? 'sm:border-l sm:border-white/[0.08]' : ''} ${
                  index > 1 ? 'sm:border-t lg:border-t-0' : ''
                } ${index > 0 ? 'lg:border-l lg:border-white/[0.08]' : ''}`}
              >
                <dt className="text-sm text-[#f4f2ed]">{value}</dt>
                <dd className="mt-1.5 text-xs text-[#777671]">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section className="border-t border-white/[0.08]">
        <div className="mn-container">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div className="max-w-md">
              <Badge variant="outline">How it works</Badge>
              <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] tracking-[-0.025em] text-[#f4f2ed] md:text-5xl">
                A small runtime for work that keeps going.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#888781]">
                The agent code remains yours. MirrorNeuron handles the lifecycle
                around it.
              </p>
            </div>

            <ol className="border-t border-white/[0.12]">
              {workflowSteps.map((step) => (
                <li
                  key={step.number}
                  className="grid gap-3 border-b border-white/[0.1] py-6 sm:grid-cols-[3rem_11rem_1fr] sm:gap-5"
                >
                  <span className="font-mono text-[0.68rem] text-[#66655f]">
                    {step.number}
                  </span>
                  <h3 className="text-sm font-medium text-[#f4f2ed]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-6 text-[#888781]">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section className="border-t border-white/[0.08]">
        <div className="mn-container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline">Choose the smallest tool that fits</Badge>
            <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] tracking-[-0.025em] text-[#f4f2ed] md:text-5xl">
              Durable execution without the orchestration project.
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-4xl border-t border-white/[0.12]">
            {approaches.map((approach) => (
              <div
                key={approach.name}
                className="grid gap-2 border-b border-white/[0.1] py-5 sm:grid-cols-[1fr_1fr_1.2fr] sm:items-center sm:gap-6"
              >
                <div className="text-sm font-medium text-[#f4f2ed]">
                  {approach.name}
                </div>
                <div className="text-sm text-[#aaa9a3]">{approach.strength}</div>
                <div className="text-sm text-[#777671]">{approach.tradeoff}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="link">
              <Link href="/why">
                See where MirrorNeuron fits
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section className="border-t border-white/[0.08]">
        <div className="mn-container">
          <div className="mx-auto max-w-xl text-center">
            <Badge variant="outline">Use cases</Badge>
            <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] tracking-[-0.025em] text-[#f4f2ed] md:text-5xl">
              Work that outlives a chat.
            </h2>
          </div>

          <div className="mt-12 grid border-t border-white/[0.12] md:grid-cols-3">
            {useCases.map((useCase, index) => (
              <Link
                key={useCase.title}
                href={useCase.href}
                className={`group border-b border-white/[0.1] py-7 text-center md:border-b-0 md:px-7 md:py-8 ${
                  index > 0 ? 'md:border-l md:border-white/[0.1]' : ''
                }`}
              >
                <h3 className="text-sm font-medium text-[#f4f2ed]">
                  {useCase.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#777671]">
                  {useCase.text}
                </p>
                <span className="mt-5 inline-flex items-center justify-center gap-2 text-xs text-[#8bc9bc]">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
