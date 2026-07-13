import {
  Bot,
  Code,
  ExternalLink,
  MessageSquare,
  Repeat,
  Settings,
  ShieldAlert,
} from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import { createMetadata, siteConfig } from '@/lib/site';

const capabilities = [
  {
    icon: <Repeat className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />,
    title: 'Sleep and wake without polling',
    text: 'Pause work between events or review cycles, then resume it without keeping an active agent process busy.',
  },
  {
    icon: <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />,
    title: 'Constrain tool execution',
    text: 'Run terminal and tool work in configured OpenShell sandboxes with policy controls around process, workspace, and network access.',
  },
  {
    icon: <Settings className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />,
    title: 'Recover after local restarts',
    text: 'Persist workflow state so long-running jobs can continue from a known recovery point after a worker or machine restarts.',
  },
];

const featuredBlueprints = [
  {
    icon: <MessageSquare className="h-24 w-24 text-orange-400" />,
    title: 'Python SDK Live Research Daemon',
    text: 'A long-lived Python workflow that keeps state across repeated research turns, sleeps between runs, and adapts easily to internal monitoring or recurring analysis.',
    href: 'https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/general_python_sdk_live_research_daemon',
    slug: 'general_python_sdk_live_research_daemon',
  },
  {
    icon: <Code className="h-24 w-24 text-orange-400" />,
    title: 'LLM Codegen & Review Loop',
    text: 'One agent writes code while another runs tests and reviews the result. The workflow repeats until the review passes, with execution contained in OpenShell.',
    href: 'https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/general_sandboxed_llm_codegen_review_loop',
    slug: 'general_sandboxed_llm_codegen_review_loop',
  },
];

export const metadata = createMetadata({
  title: 'Agent Workflows and Background Loops',
  path: '/use-cases/ai-worker',
  description:
    'Run background AI agents and long-running workflow loops with durable state, retries, sleep, resume, and bounded tool execution on infrastructure you control.',
  keywords: [
    'background agent workflows',
    'local AI workflows',
    'autonomous workflow runtime',
  ],
});

export default function AiWorkerUseCase() {
  return (
    <PageShell>
      <PageHeader
        backHref="/blueprints"
        backLabel="Back to Blueprints"
        eyebrow="Background agent workflows"
        title="Background agents that keep their place."
        description="Run agents that monitor, research, call tools, wait for new work, and resume after interruptions. MirrorNeuron manages the lifecycle while your code stays focused on the job."
      />

      <div className="mb-24 grid max-w-5xl gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <Badge variant="outline">
            <Bot className="h-4 w-4" />
            The challenge
          </Badge>
          <h2 className="text-2xl font-bold text-white">
            A script is easy to start. Keeping it running is the hard part.
          </h2>
          <p className="leading-relaxed text-slate-400">
            Useful background agents rarely finish in one request. They wait on
            events, call unreliable tools, pause for people, checkpoint progress,
            and return later with the right context.
          </p>
          <p className="leading-relaxed text-slate-400">
            Building that lifecycle into every script creates duplicated retry,
            state, scheduling, and recovery code. Adopting a broad orchestration
            platform can be more infrastructure than the first workflow needs.
          </p>
        </div>

        <Card className="p-8">
          <h3 className="mb-6 text-lg font-semibold text-white">
            What MirrorNeuron handles
          </h3>
          <ul className="space-y-4">
            {capabilities.map((item) => (
              <li key={item.title} className="flex items-start gap-3 text-slate-300">
                {item.icon}
                <span>
                  <strong className="text-white">{item.title}:</strong>{' '}
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold text-white">
          Start from a working agent loop
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredBlueprints.map((blueprint) => (
            <Card
              key={blueprint.slug}
              className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-[#0a0f1c] p-8 transition-colors hover:border-cyan-400/30"
            >
              <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
                {blueprint.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                {blueprint.title}
              </h3>
              <p className="mb-6 text-slate-400">{blueprint.text}</p>
              <Button asChild variant="outline" size="sm">
                <TrackedLink
                  href={blueprint.href}
                  target="_blank"
                  rel="noreferrer"
                  eventName="open_featured_blueprint"
                  eventParams={{
                    location: 'ai_worker_use_case',
                    blueprint: blueprint.slug,
                  }}
                >
                  View Blueprint <ExternalLink className="h-4 w-4" />
                </TrackedLink>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <Card variant="plain" className="bg-slate-900/50 p-8">
        <h2 className="text-2xl font-bold text-white">
          Give long-running agents a small, dependable runtime.
        </h2>
        <p className="mt-4 max-w-3xl leading-8 text-slate-400">
          MirrorNeuron handles persisted state, retries, recovery, and scheduled
          wake-ups around normal agent code. Start on one machine near the tools
          and data the workflow needs, then expand the runtime only when the
          workload grows.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Button asChild className="bg-white px-5 py-3 text-slate-900 hover:bg-slate-200">
            <TrackedLink
              href={siteConfig.docsUrl}
              target="_blank"
              rel="noreferrer"
              eventName="click_use_case_docs"
              eventParams={{ use_case: 'ai_worker' }}
            >
              Read the docs
            </TrackedLink>
          </Button>
          <Button asChild variant="secondary" className="px-5 py-3">
            <TrackedLink
              href="/why"
              eventName="click_use_case_why"
              eventParams={{ use_case: 'ai_worker' }}
            >
              Compare orchestration approaches
            </TrackedLink>
          </Button>
        </div>
      </Card>
    </PageShell>
  );
}
