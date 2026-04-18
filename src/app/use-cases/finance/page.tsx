import Link from 'next/link';
import { ArrowLeft, LineChart, ShieldCheck, Activity, Clock, Server, Zap } from 'lucide-react';
import { createMetadata, siteConfig } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Finance AI Workflow Runtime',
  path: '/use-cases/finance',
  description:
    'See how MirrorNeuron fits long-running financial workflows, market simulations, streaming telemetry, and stateful AI agents that need durable execution.',
  keywords: ['financial AI workflows', 'market simulation runtime', 'durable finance agents'],
});

export default function FinanceUseCase() {
  return (
    <main className="min-h-screen bg-[#020617] selection:bg-blue-500/30 selection:text-blue-200">
      <div className="container mx-auto px-6 py-20 md:py-24">
        <div className="mb-8">
          <Link href="/#use-cases" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full border border-blue-500/20 mb-6">
            <LineChart className="w-4 h-4" /> Finance & Market Operations
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Long-Running Financial Workflows & Market Simulations
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed mb-12">
            Build and operate agents that monitor stock markets for days, run synthetic multi-agent market simulations, and execute quantitative strategies reliably with bounded sandbox execution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mb-24">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">The Challenge</h2>
            <p className="text-slate-400 leading-relaxed">
              Financial data feeds and market operations aren&apos;t quick API calls. They require persistent, reliable execution over hours or days. Simulating a market to test quantitative strategies requires coordinating heterogeneous agents (market makers, institutional, retail) acting on an event bus without the orchestration framework buckling under the load.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Traditional frameworks either fail to maintain long-running state safely or leak memory and resources over continuous operation.
            </p>
          </div>
          
          <div className="bg-[#0a0f1c] rounded-2xl p-8 border border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-6">MirrorNeuron Capabilities</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-300">
                <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Infinite execution:</strong> Agents can run indefinitely, processing ticks or events with automatic state recovery.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Server className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Resource bounded:</strong> Continuous execution is constrained via executor leases, preventing resource exhaustion.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Deterministic replay:</strong> Log and replay events (price movements, liquidity shocks) to stress test agent strategies.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Blueprints</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0a0f1c] border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-24 h-24 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Synthetic Market Simulation</h3>
              <p className="text-slate-400 mb-6">
                A multi-agent simulation reproducing events like flash crashes and liquidity shocks. Instantiates heterogeneous agents (institutional, retail, arbitrage) acting on a simulated order book over historical timelines.
              </p>
              <Link href="https://github.com/MirrorNeuronLab/mirrorneuron-blueprints/tree/main/financial_market" target="_blank" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700">
                View Blueprint <ArrowLeft className="w-4 h-4 rotate-135" />
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0a0f1c] border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-24 h-24 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Live Streaming Telemetry</h3>
              <p className="text-slate-400 mb-6">
                Connect continuously to a live stream of data, detecting anomalies or triggering events when thresholds are met. Runs reliably in the background without dropping state.
              </p>
              <Link href="https://github.com/MirrorNeuronLab/mirrorneuron-blueprints/tree/main/streaming_peak_demo" target="_blank" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700">
                View Blueprint <ArrowLeft className="w-4 h-4 rotate-135" />
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <h2 className="text-2xl font-bold text-white">Why teams choose MirrorNeuron here</h2>
          <p className="mt-4 max-w-3xl text-slate-400 leading-8">
            Financial AI workflows often need the durability of a workflow engine,
            but teams still want a simple developer experience. MirrorNeuron aims
            to keep the programming model closer to normal code while preserving
            the recovery story that long-running market workloads need.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link
              href={siteConfig.docsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-200"
            >
              Read the docs
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-5 py-3 font-semibold text-white transition-colors hover:border-slate-500 hover:bg-slate-900/50"
            >
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
