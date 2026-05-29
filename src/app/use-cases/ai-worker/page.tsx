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
    title: 'Delayed Self-Scheduling',
    text: 'Agents can put themselves to sleep and wake up periodically without consuming active execution resources.',
  },
  {
    icon: <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />,
    title: 'OpenShell Isolation',
    text: "Give agents terminal capabilities with confidence. OpenShell bounded execution ensures sandboxed processes can't break the host system.",
  },
  {
    icon: <Settings className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />,
    title: 'Local Restart Recovery',
    text: 'If the underlying node restarts, long-lived workflows can resume their exact state upon reboot.',
  },
];

const featuredBlueprints = [
  {
    icon: <MessageSquare className="h-24 w-24 text-orange-400" />,
    title: 'Python SDK Live Research Daemon',
    text: 'A long-lived Python-defined daemon that keeps state across repeated turns, sleeps between work, and can be adapted to internal monitoring, research, or scheduled analysis loops.',
    href: 'https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/general_python_sdk_live_research_daemon',
    slug: 'general_python_sdk_live_research_daemon',
  },
  {
    icon: <Code className="h-24 w-24 text-orange-400" />,
    title: 'LLM Codegen & Review Loop',
    text: 'A multi-agent setup where one agent writes code to fulfill a spec, and another agent runs tests and reviews the code. They iterate until the review passes, executed safely within OpenShell.',
    href: 'https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/general_sandboxed_llm_codegen_review_loop',
    slug: 'general_sandboxed_llm_codegen_review_loop',
  },
];

export const metadata = createMetadata({
  title: 'Agent Workflows and Background Loops',
  path: '/use-cases/ai-worker',
  description:
    'MirrorNeuron for background agent workflows, persistent monitors, and long-running agent loops that need retries, sleep, resume, and bounded execution near private systems.',
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
        title="On-edge agent workflows and automated loops"
        description="Run agent workflows that persist near local tools, private data, and internal systems. Keep the runtime on-edge first, then move the same workflow to cloud when the workload belongs there."
      />

      <div className="mb-24 grid max-w-5xl gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <Badge variant="outline">
            <Bot className="h-4 w-4" />
            The challenge
          </Badge>
          <h2 className="text-2xl font-bold text-white">The Challenge</h2>
          <p className="leading-relaxed text-slate-400">
            Useful autonomous workflows are rarely &quot;one-and-done&quot;
            scripts. They need to wait on streams, wake up on specific events,
            process them, checkpoint progress, and go back to sleep.
          </p>
          <p className="leading-relaxed text-slate-400">
            Managing lifecycle, failure recovery, and isolation for background
            agent workflows becomes complex when teams have to build custom
            orchestration before proving the workflow.
          </p>
        </div>

        <Card className="p-8">
          <h3 className="mb-6 text-lg font-semibold text-white">
            MirrorNeuron Capabilities
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
          Featured Blueprints
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
          Why MirrorNeuron fits background agent workflows
        </h2>
        <p className="mt-4 max-w-3xl leading-8 text-slate-400">
          Long-lived agent workflows need to wait, retry, checkpoint, recover,
          and continue safely near the systems they operate. MirrorNeuron keeps
          that operational story closer to a simple on-edge runtime than a
          heavyweight orchestration platform.
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
