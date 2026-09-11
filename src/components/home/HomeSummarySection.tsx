import Link from 'next/link';
import Image from 'next/image';
import { Activity, ArrowDown, ArrowRight, Bot, Code2, Cpu, Database, Lock, Package, RotateCcw, Rocket, Save, Settings, ShieldCheck, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';

const runtimeCapabilities = [
  { label: 'Sandbox', icon: Package },
  { label: 'Model setup', icon: Settings },
  { label: 'State', icon: Database },
  { label: 'Checkpoints', icon: Save },
  { label: 'Recovery', icon: RotateCcw },
  { label: 'Human gates', icon: UserCheck },
  { label: 'Resources', icon: Cpu },
  { label: 'Observability', icon: Activity },
];

const approaches = [
  {
    name: 'Python script',
    bestFor: 'The job is short and restarting is cheap',
    featured: false,
  },
  {
    name: 'Agent framework',
    bestFor: "You're designing agents, prompts, tools, and control flow",
    featured: false,
  },
  {
    name: 'Temporal / Airflow',
    bestFor: 'You need general-purpose workflow orchestration',
    featured: false,
  },
  {
    name: 'MirrorNeuron',
    bestFor: 'Long-running AI work needs dependable execution on infrastructure you control',
    featured: true,
  },
];

const useCases = [
  {
    title: 'Deep knowledge work',
    tag: 'Long-running work',
    text: 'Research, analysis, and multi-step reasoning that can run for minutes or hours, preserve intermediate results, and resume without starting over.',
    examples: ['Research', 'Analysis', 'Long-running agents'],
    icon: Bot,
    href: 'https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/vc_assistant',
  },
  {
    title: 'Decisions with humans in the loop',
    tag: 'Human-governed work',
    text: 'Workflows where new information can change the plan and important actions need review, approval, or intervention — without losing state or history.',
    examples: ['Review', 'Approval', 'Dynamic workflows'],
    icon: ShieldCheck,
    href: 'https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/financial_advisor',
  },
  {
    title: 'Local & edge execution',
    tag: 'Close to data & hardware',
    text: 'Keep AI close to the data, devices, and systems it depends on. Run on private infrastructure, tolerate unreliable connectivity, and avoid mandatory cloud dependencies.',
    examples: ['Private infrastructure', 'Edge AI', 'Physical systems'],
    icon: Cpu,
    href: 'https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/ros_amr_controller',
  },
];

export function HomeSummarySection() {
  return (
    <>
      {/* 2. How it works: Bring your work, get a runtime */}
      <Section className="border-t border-white/[0.08]">
        <div className="mn-container">
          <div className="mn-section-head">
            <Badge variant="outline">How it works</Badge>
            <h2 className="mn-section-title">
              Bring your work. Get a runtime.
            </h2>
            <p className="mn-section-lede">
              Turn working code into a dependable workflow — without building the execution stack yourself.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-stretch gap-3 xl:flex-row xl:items-center">
              {/* Your work */}
              <div className="flex-1 rounded-2xl border border-white/[0.08] bg-[#141412] p-4">
                <div>
                  <div className="flex items-center gap-1.5 mn-eyebrow-muted">
                    <Code2 className="h-3 w-3 text-[#56ccf2]" aria-hidden="true" />
                    Your work
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#f4f2ed]">
                    Code · Agents · Models · Tools
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center xl:px-1" aria-hidden="true">
                <ArrowDown className="h-4 w-4 text-[#aaa9a3] xl:hidden" />
                <ArrowRight className="hidden h-4 w-4 text-[#aaa9a3] xl:block" />
              </div>

              {/* MirrorNeuron runtime */}
              <div className="flex-[1.5] rounded-2xl border border-white/[0.08] bg-[#141412] p-4">
                <div className="flex items-center justify-center gap-1.5 mn-eyebrow-muted">
                  <Image src="/mn-logo.svg" alt="" width={14} height={14} className="h-3.5 w-3.5" aria-hidden="true" />
                  MirrorNeuron
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2">
                  {runtimeCapabilities.map((capability) => (
                    <div
                      key={capability.label}
                      className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#0c0c0b] px-3 py-2.5 text-xs text-[#deddd8]"
                    >
                      <capability.icon className="h-4 w-4 shrink-0 text-[#aaa9a3]" aria-hidden="true" />
                      {capability.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center xl:px-1" aria-hidden="true">
                <ArrowDown className="h-4 w-4 text-[#aaa9a3] xl:hidden" />
                <ArrowRight className="hidden h-4 w-4 text-[#aaa9a3] xl:block" />
              </div>

              {/* Your compute */}
              <div className="flex-1 rounded-2xl border border-white/[0.08] bg-[#141412] p-4">
                <div>
                  <div className="flex items-center gap-1.5 mn-eyebrow-muted">
                    <Cpu className="h-3 w-3 text-[#56ccf2]" aria-hidden="true" />
                    Your compute
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#f4f2ed]">
                    macOS · Linux · WSL2
                  </div>
                  <div className="mt-1 font-mono text-[0.65rem] text-[#888781]">
                    one machine → private cluster
                </div>
              </div>
            </div>
          </div>

          {/* Freedoms row — part of How it works */}
          <div className="mt-10 text-center">
            <div className="mn-eyebrow-muted">
              What this enables
            </div>
          </div>
          <div className="mt-5 mn-panel">
            <div className="grid md:grid-cols-3 md:divide-x md:divide-white/[0.07]">
              <div className="group p-5 transition-colors hover:bg-white/[0.015] sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="mn-eyebrow-muted">
                    01 / Dependability
                  </div>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#777671] transition-colors group-hover:border-[#56ccf2]/30 group-hover:text-[#56ccf2]">
                    <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-2.5 text-sm font-medium text-[#f4f2ed]">
                  Reliable workflow execution.
                </div>
                <div className="mt-1.5 text-xs leading-relaxed text-[#888781]">
                  Durable state, checkpoints, and recovery keep long-running work moving through failures.
                </div>
              </div>
              <div className="group border-t border-white/[0.07] p-5 transition-colors hover:bg-white/[0.015] sm:p-6 md:border-t-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="mn-eyebrow-muted">
                    02 / Easy deployment
                  </div>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#777671] transition-colors group-hover:border-[#56ccf2]/30 group-hover:text-[#56ccf2]">
                    <Rocket className="h-3 w-3" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-2.5 text-sm font-medium text-[#f4f2ed]">
                  Ready in one command.
                </div>
                <div className="mt-1.5 text-xs leading-relaxed text-[#888781]">
                  One command sets up the runtime, models, and dependencies you need.
                </div>
              </div>
              <div className="group border-t border-white/[0.07] p-5 transition-colors hover:bg-white/[0.015] sm:p-6 md:border-t-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="mn-eyebrow-muted">
                    03 / Control
                  </div>
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#777671] transition-colors group-hover:border-[#56ccf2]/30 group-hover:text-[#56ccf2]">
                    <Lock className="h-3 w-3" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-2.5 text-sm font-medium text-[#f4f2ed]">
                  Cloud optional.
                </div>
                <div className="mt-1.5 text-xs leading-relaxed text-[#888781]">
                  Keep execution on your machines, with cloud services optional and workflows portable.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Where it fits: Smallest tool that solves the problem */}
      <Section className="border-t border-white/[0.08]">
        <div className="mn-container">
          <div className="mn-section-head">
            <Badge variant="outline">Where it fits</Badge>
            <h2 className="mn-section-title">
              Use the smallest runtime that solves the problem.
            </h2>
            <p className="mn-section-lede">
              Start simple. Add infrastructure only when the work demands it.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl mn-panel">
            {/* Header row */}
            <div className="hidden border-b border-white/[0.08] bg-white/[0.02] px-6 py-3 sm:grid sm:grid-cols-[1fr_1.8fr] sm:items-center sm:gap-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#777671]">
              <div>Approach</div>
              <div>Best when</div>
            </div>

            {/* Approach rows */}
            <div className="divide-y divide-white/[0.07]">
              {approaches.map((approach) => (
                <div
                  key={approach.name}
                  className={`grid gap-1 border-l-2 border-l-transparent px-6 py-4 sm:grid-cols-[1fr_1.8fr] sm:items-center sm:gap-6 transition-colors ${
                    approach.featured
                      ? 'bg-[#56ccf2]/[0.06] border-l-[#56ccf2]'
                      : 'hover:bg-white/[0.015]'
                  }`}
                >
                  <div className="text-sm font-medium text-[#f4f2ed]">
                    {approach.name}
                  </div>
                  <div className="text-xs sm:text-sm leading-relaxed text-[#aaa9a3]">
                    {approach.bestFor}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Proof: real workloads that need this runtime */}
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl">
              Work that outlives a chat.
            </h2>
            <p className="mn-section-lede">
              Long-running AI work that needs to survive failures,
              adapt, or stay local.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {useCases.map((useCase) => (
              <Link
                key={useCase.title}
                href={useCase.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#11110f]/80 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.2] hover:bg-[#141412] sm:p-6"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#56ccf2]/25 bg-[#56ccf2]/10 text-[#56ccf2] transition-colors group-hover:border-[#56ccf2]/40 group-hover:bg-[#56ccf2]/15">
                      <useCase.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="mn-eyebrow-muted">
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

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#56ccf2]">
                  <span>Run a sample</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="link" className="text-sm text-[#56ccf2] hover:text-[#9be1fa]">
              <Link href="/why">
                Why choose MirrorNeuron
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
