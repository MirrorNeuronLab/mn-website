import Link from 'next/link';
import { Terminal, Box, GitBranch, Shield, MessageSquare, Play, Code, Database, Server, Layers, ArrowRight, CheckCircle2, XCircle, Activity, Workflow, Cpu, Globe, Lock, Clock, Repeat, FileCode2, Network } from 'lucide-react';
import { FaGithub, FaDiscord, FaSlack } from 'react-icons/fa';
import CookieBanner from './CookieBanner';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0f1c] text-slate-200 selection:bg-blue-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-[#0a0f1c]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/mn-logo.svg" alt="MirrorNeuron Logo" className="h-6 w-6" />
            <span className="font-bold text-lg text-white">MirrorNeuron</span>
          </Link>
          <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-400">
            <Link href="https://doc.mirrorneuron.io" target="_blank" className="hover:text-white transition-colors">Docs</Link>
            <Link href="https://github.com/homerquan/MirrorNeuron" target="_blank" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="#examples" className="hover:text-white transition-colors">Examples</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#blog" className="hover:text-white transition-colors">Blog</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/homerquan/MirrorNeuron" target="_blank" className="text-slate-400 hover:text-white transition-colors hidden sm:block">
              <FaGithub className="h-5 w-5" />
            </Link>
            <Link href="#quickstart" className="bg-white hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                  v1.0 is now live
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white text-balance leading-[1.1]">
                  Workflow engine for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">AI agents.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-xl leading-relaxed text-balance">
                  MirrorNeuron is a durable execution engine for running long-lived, stateful jobs across machines. 
                  Build AI agents, data pipelines, and background jobs with retries, state, and observability built-in.
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link href="#quickstart" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20 w-full sm:w-auto justify-center">
                    <Play className="h-4 w-4 fill-current" />
                    Run your first workflow
                  </Link>
                  <Link href="https://doc.mirrorneuron.io" target="_blank" className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-all border border-slate-700 w-full sm:w-auto justify-center">
                    <Code className="h-5 w-5 text-slate-400" />
                    Read the Docs
                  </Link>
                </div>
                
                <div className="mt-8 flex items-center gap-4 text-sm text-slate-500 font-medium">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#0a0f1c] flex items-center justify-center"><FaGithub className="text-white w-4 h-4" /></div>
                    <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#0a0f1c] flex items-center justify-center text-xs text-white">4k+</div>
                  </div>
                  <span>Trusted by engineering teams</span>
                </div>
              </div>

              {/* Code Snippet in Hero */}
              <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-[#0d1117] shadow-2xl lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/60">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="text-xs font-mono text-slate-400">agent_workflow.py</div>
                  <div className="w-10"></div>
                </div>
                <div className="p-6 font-mono text-sm overflow-x-auto text-slate-300">
                  <pre>
<span className="text-purple-400">from</span> mirrorneuron <span className="text-purple-400">import</span> workflow, step{'\n\n'}
<span className="text-yellow-300">@workflow</span>{'\n'}
<span className="text-blue-400">def</span> <span className="text-green-400">agent_research_loop</span>(topic: <span className="text-blue-300">str</span>):{'\n'}
{'    '}data = gather_context(topic){'\n'}
{'    '}draft = generate_draft(data){'\n\n'}
{'    '}<span className="text-purple-400">while not</span> check_quality(draft):{'\n'}
{'        '}feedback = get_critic_feedback(draft){'\n'}
{'        '}draft = refine_draft(draft, feedback){'\n\n'}
{'    '}<span className="text-purple-400">return</span> publish(draft){'\n\n'}
<span className="text-yellow-300">@step</span>(retries=<span className="text-orange-400">3</span>, timeout=<span className="text-green-300">"5m"</span>){'\n'}
<span className="text-blue-400">def</span> <span className="text-green-400">gather_context</span>(topic: <span className="text-blue-300">str</span>):{'\n'}
{'    '}<span className="text-slate-500"># State is persisted automatically</span>{'\n'}
{'    '}<span className="text-slate-500"># Failures retry + resume seamlessly</span>{'\n'}
{'    '}<span className="text-purple-400">return</span> web_search(topic)
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. What it does */}
        <section className="py-24 bg-slate-900/50 border-y border-slate-800/60">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Run durable tasks at scale</h2>
              <p className="text-lg text-slate-400">
                Stop writing custom retry logic, state management, and message queues. 
                MirrorNeuron handles the infrastructure so you can focus on business logic.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: <Cpu className="w-6 h-6 text-blue-400" />, title: "AI Agents", desc: "Orchestrate multi-step LLM chains with guaranteed execution and state recovery." },
                { icon: <Network className="w-6 h-6 text-purple-400" />, title: "Data Pipelines", desc: "Run complex, distributed data transformations across multiple nodes." },
                { icon: <Clock className="w-6 h-6 text-emerald-400" />, title: "Background Jobs", desc: "Replace fragile crons and queues with a robust, observable workflow engine." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 border border-slate-700/50">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. How it works (Mental Model Diagram) */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">How MirrorNeuron works</h2>
              <p className="text-lg text-slate-400">
                A simple mental model for complex distributed systems.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 -translate-y-1/2"></div>
                
                {[
                  { icon: <FileCode2 />, title: "1. Define Workflow", text: "Write deterministic code in Python or TS." },
                  { icon: <Globe />, title: "2. Distribute", text: "Tasks run across distributed workers." },
                  { icon: <Database />, title: "3. Persist", text: "State is saved automatically." },
                  { icon: <Repeat />, title: "4. Retry & Resume", text: "Failures recover exactly where they left off." }
                ].map((step, i) => (
                  <div key={i} className="bg-[#0a0f1c] border border-slate-700 p-6 rounded-xl w-full lg:w-64 relative z-10 flex flex-col items-center text-center group hover:border-blue-500/50 transition-colors">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-300 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-all border border-slate-700">
                      {step.icon}
                    </div>
                    <h3 className="font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-400">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Use Cases */}
        <section id="examples" className="py-24 bg-slate-900/30 border-y border-slate-800/60">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Built for complex use cases</h2>
              <p className="text-lg text-slate-400">
                Developers use MirrorNeuron when standard task queues aren't enough.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
              {[
                { title: "AI Agent Orchestration", text: "Manage memory, context windows, and multi-step reasoning loops without losing state on API timeouts." },
                { title: "Distributed GPU Jobs", text: "Queue and route heavy inference tasks to specific hardware pools with timeout and retry controls." },
                { title: "Async Backend Flows", text: "Handle complex user onboarding, payment processing, and provisioning sequences reliably." },
                { title: "Cron Replacement", text: "Schedule recurring tasks with full visibility, historical logs, and manual intervention capabilities." }
              ].map((uc, i) => (
                <div key={i} className="p-8 rounded-2xl bg-[#0a0f1c] border border-slate-800 hover:border-slate-700 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    {uc.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{uc.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Why not X (Comparison) */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Why not Airflow, Celery, or Temporal?</h2>
              <p className="text-lg text-slate-400">
                We built MirrorNeuron because existing tools were either too simple for complex workflows, or too heavy to run and maintain.
              </p>
            </div>

            <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1117]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/50">
                      <th className="py-4 px-6 font-semibold text-slate-300 w-1/4">Tool</th>
                      <th className="py-4 px-6 font-semibold text-slate-300">The Problem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-5 px-6 font-medium text-white flex items-center gap-2">Airflow</td>
                      <td className="py-5 px-6 text-slate-400">Built for batch data, not real-time, event-driven applications.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-5 px-6 font-medium text-white flex items-center gap-2">Celery</td>
                      <td className="py-5 px-6 text-slate-400">Lacks durability and state. Complex workflows become a mess of callbacks.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-5 px-6 font-medium text-white flex items-center gap-2">Temporal</td>
                      <td className="py-5 px-6 text-slate-400">Heavy, complex infrastructure requiring significant operational overhead.</td>
                    </tr>
                    <tr className="bg-blue-900/10 hover:bg-blue-900/20 transition-colors">
                      <td className="py-5 px-6 font-bold text-blue-400 flex items-center gap-2">
                        <img src="/mn-logo.svg" alt="MN" className="w-5 h-5" />
                        MirrorNeuron
                      </td>
                      <td className="py-5 px-6 text-white font-medium">Lightweight, AI-native, with native distributed supervision (BEAM).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Architecture / Features Grid */}
        <section id="architecture" className="py-24 bg-slate-900/30 border-t border-slate-800/60">
          <div className="container mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Under the hood</h2>
              <p className="text-lg text-slate-400 max-w-2xl">
                Built on Elixir and the BEAM VM for unmatched concurrency and fault tolerance.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Layers />, title: "Logical Workers", desc: "Cheap BEAM processes hold workflow state, mapped to bounded OpenShell sandboxes." },
                { icon: <Database />, title: "Redis-backed Persistence", desc: "Reliable state management for job state, agent snapshots, and event history." },
                { icon: <Server />, title: "Native Clustering", desc: "Utilizes libcluster and Horde for masterless distributed orchestration." }
              ].map((feat, i) => (
                <div key={i} className="bg-[#0a0f1c] border border-slate-800 p-6 rounded-xl">
                  <div className="text-blue-400 mb-4">{feat.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Docs CTA / Quickstart */}
        <section id="quickstart" className="py-24 relative border-t border-slate-800">
          <div className="absolute inset-0 bg-blue-900/5 [mask-image:radial-gradient(ellipse_at_top,#000,transparent_70%)]"></div>
          <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to run your first workflow?</h2>
            <p className="text-xl text-slate-400 mb-10">
              Get started with our local CLI and run the AI researcher example in under 2 minutes.
            </p>
            
            <div className="bg-[#0d1117] border border-slate-700 p-4 rounded-xl font-mono text-sm text-left max-w-xl mx-auto mb-10 shadow-xl">
              <div className="text-slate-500 mb-2"># Install MirrorNeuron CLI</div>
              <div className="text-slate-300 mb-4"><span className="text-blue-400">curl</span> -sSL https://mirrorneuron.io/install | bash</div>
              <div className="text-slate-500 mb-2"># Run the example</div>
              <div className="text-slate-300"><span className="text-green-400">mirrorneuron</span> run examples/agent_research</div>
            </div>

            <Link href="https://doc.mirrorneuron.io" target="_blank" className="inline-flex items-center gap-2 bg-white hover:bg-slate-200 text-slate-900 px-8 py-4 rounded-lg font-bold transition-all text-lg">
              Read the Quickstart Guide <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#05080f] py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <img src="/mn-logo.svg" alt="MirrorNeuron Logo" className="h-6 w-6 grayscale opacity-80" />
                <span className="font-bold text-lg text-white">MirrorNeuron</span>
              </Link>
              <p className="text-slate-500 text-sm max-w-xs mb-6 leading-relaxed">
                The durable execution engine for AI agents and distributed workflows. Open source and built for scale.
              </p>
              <div className="flex gap-4">
                <Link href="https://github.com/homerquan/MirrorNeuron" className="text-slate-500 hover:text-white transition-colors">
                  <FaGithub className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-slate-500 hover:text-white transition-colors">
                  <FaDiscord className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="#architecture" className="hover:text-white transition-colors">Architecture</Link></li>
                <li><Link href="#examples" className="hover:text-white transition-colors">Use Cases</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="https://github.com/homerquan/MirrorNeuron/releases" className="hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Developers</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="https://doc.mirrorneuron.io" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#quickstart" className="hover:text-white transition-colors">Quickstart</Link></li>
                <li><Link href="https://github.com/homerquan/MirrorNeuron" className="hover:text-white transition-colors">GitHub Repository</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company & Trust</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <div>© {new Date().getFullYear()} MirrorNeuron. Released under the MIT License.</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              All systems operational
            </div>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}
