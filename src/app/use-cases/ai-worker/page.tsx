import Link from 'next/link';
import { ArrowLeft, Bot, MessageSquare, Code, Settings, CheckCircle2, Repeat, ShieldAlert } from 'lucide-react';

export default function AiWorkerUseCase() {
  return (
    <main className="min-h-screen bg-[#020617] selection:bg-orange-500/30 selection:text-orange-200">
      <div className="container mx-auto px-6 py-24">
        <div className="mb-8">
          <Link href="/#use-cases" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 text-sm font-medium rounded-full border border-orange-500/20 mb-6">
            <Bot className="w-4 h-4" /> Autonomous AI Workers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Indefinite Background Monitors & Automated Loops
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed mb-12">
            Deploy AI workers that run persistently in the background. From Slack monitors waiting for specific conversational cues to infinite code generation and review cycles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mb-24">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">The Challenge</h2>
            <p className="text-slate-400 leading-relaxed">
              True autonomous workers are rarely "one-and-done" scripts. They need to sit idle listening to streams (like Slack or Discord), wake up on specific events, process them, and go back to sleep. Alternatively, they might be engaged in infinite iterative loops—like a developer agent that continuously pulls tickets, writes code, submits PRs, and incorporates reviewer feedback.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Managing the lifecycle, failure recovery, and isolation of these background workers is complex and error-prone when building custom orchestration.
            </p>
          </div>
          
          <div className="bg-[#0a0f1c] rounded-2xl p-8 border border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-6">MirrorNeuron Capabilities</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-300">
                <Repeat className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Delayed Self-Scheduling:</strong> Agents can put themselves to sleep and wake up periodically without consuming active execution resources.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <ShieldAlert className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">OpenShell Isolation:</strong> Give agents terminal capabilities with confidence. OpenShell bounded execution ensures workers can't break the host system.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <Settings className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Local Restart Recovery:</strong> If the underlying node restarts, long-lived workflows can resume their exact state upon reboot.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Blueprints</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0a0f1c] border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <MessageSquare className="w-24 h-24 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Persistent Slack Monitor</h3>
              <p className="text-slate-400 mb-6">
                An infinite loop workflow that listens to a workspace, analyzes conversations, and only engages when it detects actionable requests, all while sleeping efficiently between checks.
              </p>
              <Link href="https://github.com/MirrorNeuronLab/mirrorneuron-blueprints/tree/main/slack_monitor" target="_blank" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700">
                View Blueprint <ArrowLeft className="w-4 h-4 rotate-135" />
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0a0f1c] border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Code className="w-24 h-24 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">LLM Codegen & Review Loop</h3>
              <p className="text-slate-400 mb-6">
                A multi-agent setup where one agent writes code to fulfill a spec, and another agent runs tests and reviews the code. They iterate until the review passes, executed safely within OpenShell.
              </p>
              <Link href="https://github.com/MirrorNeuronLab/mirrorneuron-blueprints/tree/main/llm_codegen_review" target="_blank" className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700">
                View Blueprint <ArrowLeft className="w-4 h-4 rotate-135" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
