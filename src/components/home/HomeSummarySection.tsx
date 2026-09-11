import Link from 'next/link';
import { ArrowRight, Bot, CheckCircle2, Code2, Cpu, RotateCcw, ShieldCheck, Terminal, Workflow } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';

const atAGlance = [
  {
    category: '01 / Launch',
    title: 'Start with a blueprint',
    detail: 'Two commands to run end-to-end',
  },
  {
    category: '02 / Durability',
    title: 'Checkpoints & state',
    detail: 'Recover automatically on failure',
  },
  {
    category: '03 / Scope',
    title: 'Local to private cluster',
    detail: 'Zero cloud dependencies required',
  },
  {
    category: '04 / License',
    title: '100% MIT licensed',
    detail: 'Inspect, modify, and self-host',
  },
];

const workflowSteps = [
  {
    number: '01',
    eyebrow: 'Step 01 · Launch',
    title: 'Write normal Python or run a blueprint',
    text: 'Use familiar code and tools. Start from a working example when you want a faster path without boilerplate.',
    codeChip: '$ mn blueprint run vc_assistant',
    icon: Code2,
  },
  {
    number: '02',
    eyebrow: 'Step 02 · Durability',
    title: 'Failure is a state transition, not a restart',
    text: 'A crash becomes a recoverable run state. The workflow resumes from its last checkpoint instead of losing an afternoon of work.',
    codeChip: '✓ checkpoint saved → resume from step 04',
    icon: RotateCcw,
  },
  {
    number: '03',
    eyebrow: 'Step 03 · Control',
    title: 'Inspect, pause, and stay in control',
    text: 'Every run has state, history, and control. Pause for human approval, resume, or cancel — from the CLI, SDK, or API.',
    codeChip: '◉ waiting_approval · human checkpoint active',
    icon: CheckCircle2,
  },
];

const approaches = [
  {
    name: 'Python script',
    badge: 'Direct code',
    role: 'Fast prototypes & short scripts',
    tradeoff: 'No durable state. Process crashes lose all run progress.',
    featured: false,
  },
  {
    name: 'Agent framework',
    badge: 'Graph authoring',
    role: 'Prompts, tools & agent graphs',
    tradeoff: 'Authoring abstractions only. You still operate the long-running execution.',
    featured: false,
  },
  {
    name: 'Temporal / Airflow',
    badge: 'Enterprise platform',
    role: 'General enterprise orchestration',
    tradeoff: 'Heavyweight platform project, complex DSLs, difficult to run locally.',
    featured: false,
  },
  {
    name: 'MirrorNeuron',
    badge: 'Agent runtime',
    role: 'Durable agent workflows & edge compute',
    tradeoff: 'Normal Python, automatic checkpoints, runs on 1 machine or private cluster.',
    featured: true,
  },
];

const useCases = [
  {
    title: 'Background agents',
    tag: 'Autonomous execution',
    text: 'Research, monitor, call tools, wait, and resume without keeping one process alive.',
    examples: ['VC Assistant', 'Web Research Agent'],
    icon: Bot,
    href: '/use-cases/ai-worker',
  },
  {
    title: 'Private & regulated work',
    tag: 'Data sovereignty',
    text: 'Run workflow state and artifacts inside regulated, private, or air-gapped environments.',
    examples: ['Drug Discovery', 'Financial Analysis'],
    icon: ShieldCheck,
    href: '/use-cases/finance',
  },
  {
    title: 'Physical and edge AI',
    tag: 'Hardware proximity',
    text: 'Keep sensor, video, and physical AI workflows near the systems and local models they depend on.',
    examples: ['Ecosystem Science', 'Edge Sensor Loop'],
    icon: Cpu,
    href: '/blueprints',
  },
];

export function HomeSummarySection() {
  return (
    <>
      {/* 1. At a glance stats ribbon */}
      <Section className="border-t border-white/[0.08] py-12 md:py-16">
        <div className="mn-container">
          <div className="rounded-2xl border border-white/[0.08] bg-[#11110f]/70 p-6 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {atAGlance.map((item, index) => (
                <div
                  key={item.category}
                  className={`flex flex-col justify-between ${
                    index > 0 ? 'lg:border-l lg:border-white/[0.08] lg:pl-7' : ''
                  }`}
                >
                  <div className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#777671]">
                    {item.category}
                  </div>
                  <div className="mt-2 text-sm font-medium text-[#f4f2ed]">
                    {item.title}
                  </div>
                  <div className="mt-1 text-xs text-[#888781]">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 2. How it works: Workflow lifecycle */}
      <Section className="border-t border-white/[0.08]">
        <div className="mn-container">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div className="max-w-md">
              <Badge variant="outline">How it works</Badge>
              <h2 className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl">
                Write the workflow. MirrorNeuron keeps it running.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#888781] sm:text-base">
                The agent code remains yours. MirrorNeuron handles durable
                state, retries, checkpoints, and recovery around it.
              </p>
              <div className="mt-8">
                <Button asChild variant="secondary" className="h-10 rounded-full border-white/15 px-5 text-xs">
                  <Link href="/blueprints">
                    Browse ready-made blueprints
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {workflowSteps.map((step) => (
                <div
                  key={step.number}
                  className="group rounded-2xl border border-white/[0.08] bg-[#11110f]/80 p-5 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.16] hover:bg-[#141412]"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#8bc9bc]/25 bg-[#8bc9bc]/10 text-[#8bc9bc]">
                      <step.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[0.68rem] uppercase tracking-wider text-[#777671]">
                          {step.eyebrow}
                        </span>
                        <span className="font-mono text-xs font-semibold text-[#8bc9bc]/80">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-base font-medium text-[#f4f2ed]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#888781]">
                        {step.text}
                      </p>
                      <div className="mt-3.5 inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#080807] px-3 py-1.5 font-mono text-xs text-[#8bc9bc]">
                        <span className="text-[#66655f]">&gt;</span>
                        {step.codeChip}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Where it fits: Smallest tool that solves the problem */}
      <Section className="border-t border-white/[0.08]">
        <div className="mn-container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline">Where it fits</Badge>
            <h2 className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl">
              Use the smallest runtime that solves the problem.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#888781] sm:text-base">
              Different starting assumptions, not exaggerated feature gaps.
              Pick the tool whose scope matches the work.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-white/[0.1] bg-[#11110f] shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
            {/* Header row */}
            <div className="hidden border-b border-white/[0.08] bg-white/[0.02] px-6 py-3.5 sm:grid sm:grid-cols-[1.2fr_1.1fr_1.7fr] sm:items-center sm:gap-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#777671]">
              <div>Approach</div>
              <div>Primary Role</div>
              <div>Operational Reality</div>
            </div>

            {/* Approach rows */}
            <div className="divide-y divide-white/[0.07]">
              {approaches.map((approach) => (
                <div
                  key={approach.name}
                  className={`grid gap-2 p-5 sm:grid-cols-[1.2fr_1.1fr_1.7fr] sm:items-center sm:gap-6 sm:px-6 sm:py-5 transition-colors ${
                    approach.featured
                      ? 'bg-[#8bc9bc]/[0.06] border-l-2 border-l-[#8bc9bc]'
                      : 'hover:bg-white/[0.015]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-medium text-[#f4f2ed]">
                      {approach.name}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider ${
                        approach.featured
                          ? 'border border-[#8bc9bc]/30 bg-[#8bc9bc]/15 text-[#8bc9bc]'
                          : 'border border-white/10 bg-white/[0.03] text-[#777671]'
                      }`}
                    >
                      {approach.badge}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-[#deddd8]">
                    {approach.role}
                  </div>
                  <div className="text-xs sm:text-sm leading-relaxed text-[#888781]">
                    {approach.tradeoff}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="link" className="text-sm text-[#8bc9bc] hover:text-[#aee2d7]">
              <Link href="/why">
                See detailed comparison and architecture in /why
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* 4. Real workloads */}
      <Section className="border-t border-white/[0.08]">
        <div className="mn-container">
          <div className="mx-auto max-w-xl text-center">
            <Badge variant="outline">Real workloads</Badge>
            <h2 className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl">
              Work that outlives a chat.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#888781] sm:text-base">
              Serious AI work without a platform team. Start from one machine,
              scale when the work demands it.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {useCases.map((useCase) => (
              <Link
                key={useCase.title}
                href={useCase.href}
                className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#11110f]/80 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.2] hover:bg-[#141412]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#8bc9bc]/25 bg-[#8bc9bc]/10 text-[#8bc9bc] transition-colors group-hover:border-[#8bc9bc]/40 group-hover:bg-[#8bc9bc]/15">
                      <useCase.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[#777671]">
                      {useCase.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-medium text-[#f4f2ed] group-hover:text-white">
                    {useCase.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#888781]">
                    {useCase.text}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {useCase.examples.map((example) => (
                      <span
                        key={example}
                        className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[0.65rem] text-[#aaa9a3]"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#8bc9bc]">
                  <span>Explore blueprint</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
