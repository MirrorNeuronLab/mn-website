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
    'MirrorNeuron for on-edge scientific AI workflows, large-scale simulations, deep research loops, and durable agents that need recovery near private research data.',
  keywords: ['on-edge scientific AI', 'scientific workflows', 'deep research runtime', 'simulation workflow engine'],
});

export default function ScienceUseCase() {
  return (
    <PageShell>
      <PageHeader
        backHref="/blueprints"
        backLabel="Back to Blueprints"
        eyebrow="Science and research"
        title="On-edge simulations and deep research flows"
        description="Run long research loops close to lab data, internal tools, and private compute. MirrorNeuron keeps simulation and discovery workflows durable on-edge first, with cloud deployment when scale or collaboration calls for it."
      />

      <div className="mb-24 grid max-w-5xl gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <Badge variant="outline">
            <Beaker className="h-4 w-4" />
            The challenge
          </Badge>
          <h2 className="text-2xl font-bold text-white">The Challenge</h2>
          <p className="leading-relaxed text-slate-400">
            Scientific workloads and complex research flows often require tasks
            that execute over hours. A single drug discovery iteration might
            involve querying databases, running structural predictions, and
            evaluating results before planning the next step. Simulating an
            entire ecosystem involves large fan-out scale where thousands of
            entities interact.
          </p>
          <p className="leading-relaxed text-slate-400">
            Serverless architectures fail due to execution time limits. Custom
            monolithic runners lack the fault-tolerance to recover seamlessly if
            a single step fails halfway through a 12-hour job.
          </p>
        </div>

        <Card className="p-8">
          <h3 className="mb-6 text-lg font-semibold text-white">
            MirrorNeuron Capabilities
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-300">
              <Network className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <span>
                <strong className="text-white">Large Fan-out Scale:</strong>{' '}
                Spawn massive numbers of logical workers natively distributed
                across a BEAM cluster.
              </span>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <Workflow className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <span>
                <strong className="text-white">Iterative Flow Control:</strong>{' '}
                Define multi-step graph bundles where agents interact, pass
                artifacts, and loop recursively.
              </span>
            </li>
            <li className="flex items-start gap-3 text-slate-300">
              <Database className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <span>
                <strong className="text-white">State Persistence:</strong>{' '}
                Redis-backed job state ensures your long-running computations
                survive process restarts and updates.
              </span>
            </li>
          </ul>
        </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Blueprints</h2>
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
                A long-running scientific pipeline that keeps generating,
                scoring, extracting, and reviewing candidate artifacts across
                repeated agent stages.
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
          <h2 className="text-2xl font-bold text-white">Why simplicity matters for research teams</h2>
          <p className="mt-4 max-w-3xl text-slate-400 leading-8">
            Scientific and research workflows are already complex enough. Teams
            often need durable execution near private research data without
            signing up for a much larger workflow platform. MirrorNeuron is
            positioned for that lighter on-edge path.
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
