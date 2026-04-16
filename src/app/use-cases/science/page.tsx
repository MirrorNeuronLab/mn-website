import Link from 'next/link';
import { ArrowLeft, Beaker, Network, Dna, Database, Microscope, Share2, Workflow } from 'lucide-react';

export default function ScienceUseCase() {
  return (
    <main className="min-h-screen bg-[#020617] selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="container mx-auto px-6 py-24">
        <div className="mb-8">
          <Link href="/#use-cases" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full border border-emerald-500/20 mb-6">
            <Beaker className="w-4 h-4" /> Science & Research
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Large-Scale Simulations & Deep Research Flows
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed mb-12">
            Execute long-running research tasks like large scale ecosystem simulations, iterative drug discovery workflows, and deep AI-driven literature reviews without worrying about infrastructure timeouts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mb-24">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">The Challenge</h2>
            <p className="text-slate-400 leading-relaxed">
              Scientific workloads and complex research flows often require tasks that execute over hours. A single drug discovery iteration might involve querying databases, running structural predictions, and evaluating results before planning the next step. Simulating an entire ecosystem involves large fan-out scale where thousands of entities interact.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Serverless architectures fail due to execution time limits. Custom monolithic runners lack the fault-tolerance to recover seamlessly if a single step fails halfway through a 12-hour job.
            </p>
          </div>
          
          <div className="bg-[#0a0f1c] rounded-2xl p-8 border border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-6">MirrorNeuron Capabilities</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-300">
                <Network className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Large Fan-out Scale:</strong> Spawn massive numbers of logical workers natively distributed across a BEAM cluster.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Workflow className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Iterative Flow Control:</strong> Define multi-step graph bundles where agents interact, pass artifacts, and loop recursively.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Database className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">State Persistence:</strong> Redis-backed job state ensures your long-running computations survive process restarts and updates.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Blueprints</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0a0f1c] border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Dna className="w-24 h-24 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Ecosystem Simulation</h3>
              <p className="text-slate-400 mb-6">
                A massive scale simulation where numerous agents interact within a virtual environment. Demonstrates MirrorNeuron's ability to handle high-volume message passing and state updates efficiently over time.
              </p>
              <Link href="https://github.com/MirrorNeuronLab/mirrorneuron-blueprints/tree/main/ecosystem_simulation" target="_blank" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700">
                View Blueprint <ArrowLeft className="w-4 h-4 rotate-135" />
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0a0f1c] border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Microscope className="w-24 h-24 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Deep Research Flow</h3>
              <p className="text-slate-400 mb-6">
                An orchestrated agent loop that systematically explores topics, aggregates findings, and self-corrects based on intermediate results without blocking the core orchestration engine.
              </p>
              <Link href="https://github.com/MirrorNeuronLab/mirrorneuron-blueprints/tree/main/research_flow" target="_blank" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700">
                View Blueprint <ArrowLeft className="w-4 h-4 rotate-135" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
