import {
  Beaker,
  Database,
  Dna,
  ExternalLink,
  Microscope,
  Network,
  Workflow,
} from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import { createMetadata, siteConfig } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Science and Research Workflows',
  path: '/use-cases/science',
  description:
    'Run durable scientific AI workflows, simulations, and research loops near private data with persisted state, parallel workers, and recovery after interruptions.',
  keywords: ['self-hosted scientific AI', 'scientific workflows', 'deep research runtime', 'simulation workflow engine'],
});

export default function ScienceUseCase() {
  return (
    <PageShell>
      <PageHeader
        backHref="/blueprints"
        backLabel="Back to Blueprints"
        eyebrow="Science and research"
        title="Research workflows that do not lose the experiment."
        description="Run simulations, discovery loops, and multi-stage analysis close to lab data, internal tools, and private compute. Preserve progress through long runs and recover from ordinary infrastructure failure."
      />

      <div className="mb-24 grid max-w-5xl gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <Badge variant="outline">
            <Beaker className="h-4 w-4" />
            The challenge
          </Badge>
          <h2 className="text-2xl font-bold text-white">
            Research is iterative. The runtime has to remember every turn.
          </h2>
          <p className="leading-relaxed text-slate-400">
            A discovery loop can query databases, run predictions, score
            candidates, ask for review, and use the result to plan another
            round. A simulation may fan out across many entities before
            aggregating a result. Either workflow can run for hours or days.
          </p>
          <p className="leading-relaxed text-slate-400">
            Short-lived compute limits and one-off runners make that lifecycle
            fragile. When a tool or worker fails late in the run, the workflow
            needs a known recovery point—not another start from the beginning.
          </p>
        </div>

        <Card className="p-8">
          <h3 className="mb-6 text-lg font-semibold text-white">
            What MirrorNeuron handles
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-300">
              <Network className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <span>
                <strong className="text-white">Parallel workflow graphs:</strong>{' '}
                Distribute logical workers across eligible runtime nodes, then
                aggregate their outputs into the next stage.
              </span>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <Workflow className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <span>
                <strong className="text-white">Multi-stage research loops:</strong>{' '}
                Define explicit stages where agents exchange artifacts, branch,
                and repeat based on intermediate results.
              </span>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <Database className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <span>
                <strong className="text-white">Persisted run state:</strong>{' '}
                Store job metadata, events, and terminal state in Redis so runs
                remain inspectable and recovery-aware after interruptions.
              </span>
            </li>
          </ul>
        </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            Start from a working research loop
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-[#0a0f1c] p-8 transition-colors hover:border-cyan-400/30">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Dna className="w-24 h-24 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Ecosystem Intervention Sandbox</h3>
              <p className="text-slate-400 mb-6">
                A multi-region population simulation where regional agents,
                coordinator logic, and summary outputs help evaluate
                intervention scenarios over time.
              </p>
              <Button asChild variant="outline" size="sm">
                <TrackedLink
                  href="https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/science_ecosystem_intervention_sandbox"
                  target="_blank"
                  rel="noreferrer"
                  eventName="open_featured_blueprint"
                  eventParams={{
                    location: 'science_use_case',
                    blueprint: 'science_ecosystem_intervention_sandbox',
                  }}
                >
                    View Blueprint <ExternalLink className="h-4 w-4" />
                </TrackedLink>
              </Button>
            </Card>

            <Card className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-[#0a0f1c] p-8 transition-colors hover:border-cyan-400/30">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Microscope className="w-24 h-24 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Drug Discovery Closed Loop Lab</h3>
              <p className="text-slate-400 mb-6">
                A long-running discovery workflow that generates, scores,
                extracts, and reviews candidate artifacts across repeated agent
                stages.
              </p>
              <Button asChild variant="outline" size="sm">
                <TrackedLink
                  href="https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/science_drug_discovery_closed_loop_lab"
                  target="_blank"
                  rel="noreferrer"
                  eventName="open_featured_blueprint"
                  eventParams={{
                    location: 'science_use_case',
                    blueprint: 'science_drug_discovery_closed_loop_lab',
                  }}
                >
                    View Blueprint <ExternalLink className="h-4 w-4" />
                </TrackedLink>
              </Button>
            </Card>
          </div>
        </div>

        <Card variant="plain" className="bg-slate-900/50 p-8">
          <h2 className="text-2xl font-bold text-white">
            Keep infrastructure from becoming another research project.
          </h2>
          <p className="mt-4 max-w-3xl text-slate-400 leading-8">
            MirrorNeuron adds durable state, recovery, and distributed execution
            around normal workflow code. Teams can start beside private research
            data on one machine, then add capacity without redesigning the
            workflow around a general-purpose orchestration platform.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild className="bg-white px-5 py-3 text-slate-900 hover:bg-slate-200">
              <TrackedLink
                href={siteConfig.docsUrl}
                target="_blank"
                rel="noreferrer"
                eventName="click_use_case_docs"
                eventParams={{ use_case: 'science' }}
              >
                Read the docs
              </TrackedLink>
            </Button>
            <Button asChild variant="secondary" className="px-5 py-3">
              <TrackedLink
                href="/why"
                eventName="click_use_case_why"
                eventParams={{ use_case: 'science' }}
              >
                Why MirrorNeuron
              </TrackedLink>
            </Button>
          </div>
        </Card>
    </PageShell>
  );
}
