import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { siteConfig } from '@/lib/site';

export function QuickstartSection() {
  return (
    <Section id="quickstart">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_45%)]" />
      <div className="mn-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white">
            Run your first durable workflow in minutes
          </h2>
          <p className="mt-5 text-xl leading-8 text-slate-300">
            Start with the local CLI, inspect the open-source repository, and
            move from a first run to a real use case without switching to a
            heavier orchestration model.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-800 bg-[#0d1117] p-5 font-mono text-sm shadow-2xl">
          <div className="text-slate-500"># Install MirrorNeuron</div>
          <div className="mt-2 break-all text-slate-200">
            <span className="text-blue-400">curl</span> -fsSL
            https://mirrorneuron.io/install.sh | bash
          </div>
          <div className="mt-5 text-slate-500"># Run an example workflow</div>
          <div className="mt-2 text-slate-200">
            <span className="text-emerald-400">mn</span> run
            examples/agent_research
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={siteConfig.docsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-200"
          >
            Read the quickstart guide
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href={siteConfig.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="mn-secondary-action px-8 py-4 text-lg"
          >
            Explore the GitHub repository
          </Link>
        </div>
      </div>
    </Section>
  );
}
