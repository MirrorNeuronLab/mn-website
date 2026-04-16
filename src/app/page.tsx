import Link from 'next/link';
import { Terminal, Box, GitBranch, Shield, MessageSquare, Play, Code, Database, Server, Layers, Command } from 'lucide-react';
import { FaGithub, FaDiscord, FaSlack } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
              <Command className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">MirrorNeuron</span>
          </div>
          <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-slate-300">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#architecture" className="hover:text-white transition-colors">Architecture</Link>
            <Link href="#examples" className="hover:text-white transition-colors">Examples</Link>
            <Link href="https://doc.mirrorneuron.io" target="_blank" className="hover:text-white transition-colors">Docs</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/homerquan/MirrorNeuron" target="_blank" className="text-slate-400 hover:text-white transition-colors">
              <FaGithub className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-slate-400 hover:text-white transition-colors">
              <MessageSquare className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
          
          <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
              <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
              Open Source BEAM Orchestration
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white text-balance">
              Orchestrate Multi-Agent <br />
              <span className="text-gradient">Workflows at Scale</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 text-balance max-w-2xl mx-auto leading-relaxed">
              MirrorNeuron is an Elixir/BEAM runtime designed for event-driven, message-oriented workflows where logical agents collaborate with bounded sandbox execution.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="https://github.com/homerquan/MirrorNeuron" target="_blank" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25">
                <FaGithub className="h-5 w-5" />
                Star on GitHub
              </Link>
              <Link href="#quickstart" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-3.5 rounded-lg font-medium transition-all border border-slate-700">
                <Terminal className="h-5 w-5 text-slate-400" />
                View Quickstart
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-24 bg-slate-900 border-y border-slate-800">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Not a general-purpose batch scheduler.</h2>
              <p className="text-slate-400 text-lg">Designed specifically for scalable, agentic collaboration and execution heavy paths.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Layers className="h-6 w-6 text-blue-400" />,
                  title: "Logical Workers vs Leases",
                  desc: "Cheap BEAM processes hold workflow state, while scarce OpenShell sandbox capacity is strictly managed for bounded execution."
                },
                {
                  icon: <GitBranch className="h-6 w-6 text-purple-400" />,
                  title: "Message-Driven Topologies",
                  desc: "Workflows are defined as graph bundles via manifest.json. Domain logic lives in the bundle, keeping the kernel clean."
                },
                {
                  icon: <Shield className="h-6 w-6 text-emerald-400" />,
                  title: "Bounded Sandbox Execution",
                  desc: "OpenShell handles isolated execution for executor nodes, sharing sandbox reuse per job per runtime node."
                },
                {
                  icon: <Database className="h-6 w-6 text-orange-400" />,
                  title: "Redis-backed Persistence",
                  desc: "Reliable state management for job state, agent snapshots, and event history, ensuring durability across restarts."
                },
                {
                  icon: <Server className="h-6 w-6 text-pink-400" />,
                  title: "BEAM Cluster Support",
                  desc: "Built on Elixir and Erlang/OTP, utilizing libcluster and Horde for native distributed supervision and orchestration."
                },
                {
                  icon: <Terminal className="h-6 w-6 text-cyan-400" />,
                  title: "Terminal-first Tooling",
                  desc: "Validate, run, inspect, and monitor complex topologies effortlessly with the built-in mirror_neuron CLI."
                }
              ].map((feat, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl hover:bg-slate-800 transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center mb-6">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feat.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quickstart / Code Snippet Section */}
        <section id="quickstart" className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-white mb-6">Start orchestrating in minutes</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  MirrorNeuron keeps the built-in runtime small: router, executor, aggregator, and sensor. Run your first multi-agent workflow using our pre-built examples.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Clone the repository and fetch dependencies",
                    "Build the terminal-first escript CLI",
                    "Validate and run graph bundles instantly",
                    "Monitor events and agent state in real-time"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold border border-blue-500/30">
                        {i + 1}
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:w-1/2 w-full">
                <div className="rounded-xl overflow-hidden border border-slate-700 bg-[#0d1117] shadow-2xl">
                  <div className="flex items-center px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="mx-auto text-xs font-mono text-slate-400">~/MirrorNeuron</div>
                  </div>
                  <div className="p-6 font-mono text-sm overflow-x-auto text-slate-300 terminal-scroll">
                    <div className="text-slate-500 mb-2"># Setup the runtime</div>
                    <div><span className="text-blue-400">mix</span> deps.get</div>
                    <div><span className="text-blue-400">mix</span> test</div>
                    <div className="mb-4"><span className="text-blue-400">mix</span> escript.build</div>
                    
                    <div className="text-slate-500 mb-2"># Run an example workflow</div>
                    <div><span className="text-green-400">./mirror_neuron</span> validate examples/research_flow</div>
                    <div><span className="text-green-400">./mirror_neuron</span> run examples/research_flow</div>
                    <div className="mb-4"><span className="text-green-400">./mirror_neuron</span> monitor</div>
                    
                    <div className="text-slate-500 mb-2"># Inspect job execution</div>
                    <div><span className="text-green-400">./mirror_neuron</span> job list --live</div>
                    <div className="animate-pulse">_</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Community Section */}
        <section className="py-24 bg-gradient-to-b from-slate-900 to-[#0f172a] border-t border-slate-800">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join the Community</h2>
            <p className="text-slate-400 text-lg mb-10">
              MirrorNeuron is open source and built for developers. Whether you're building LLM codegen loops, large-scale ecosystem simulations, or complex data pipelines, we'd love to have you.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="https://github.com/homerquan/MirrorNeuron" target="_blank" className="flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-slate-100 px-6 py-4 rounded-xl font-semibold transition-colors">
                <FaGithub className="h-6 w-6" />
                GitHub Repository
              </Link>
              <Link href="#" className="flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-4 rounded-xl font-semibold transition-colors">
                <FaDiscord className="h-6 w-6" />
                Join Discord
              </Link>
              <Link href="#" className="flex items-center justify-center gap-3 bg-[#4A154B] hover:bg-[#361036] text-white px-6 py-4 rounded-xl font-semibold transition-colors">
                <FaSlack className="h-6 w-6" />
                Join Slack
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Command className="h-5 w-5 text-blue-500" />
            <span className="font-bold text-lg text-white">MirrorNeuron</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Homer Quan. Released under the MIT License.
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/homerquan/MirrorNeuron" className="text-slate-400 hover:text-white transition-colors">
              <FaGithub className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
