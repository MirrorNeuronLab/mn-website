'use client';

import Link from 'next/link';
import { Terminal, Box, GitBranch, Shield, MessageSquare, Play, Code, Database, Server, Layers, ArrowRight, CheckCircle2, XCircle, Activity, Workflow, Cpu, Globe, Lock, Clock, Repeat, FileCode2, Network } from 'lucide-react';
import { FaGithub, FaDiscord, FaSlack, FaApple, FaUbuntu, FaWindows } from 'react-icons/fa';
import CookieBanner from './CookieBanner';
import { useEffect, useState } from 'react';

export default function Home() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    // Check localStorage for maintenance mode (default: false)
    const isMaintenanceMode = localStorage.getItem('MAINTENANCE_MODE') !== 'false';
    setMaintenanceMode(isMaintenanceMode);

    // Add global console function to disable maintenance mode
    (window as any).disableMaintenance = () => {
      localStorage.setItem('MAINTENANCE_MODE', 'false');
      setMaintenanceMode(false);
      window.location.reload();
    };

    (window as any).enableMaintenance = () => {
      localStorage.setItem('MAINTENANCE_MODE', 'true');
      setMaintenanceMode(true);
      window.location.reload();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0f1c] text-slate-200 selection:bg-blue-500/30">
      {maintenanceMode && (
        <div className="fixed inset-0 z-[9998] bg-black/60 pointer-events-none"></div>
      )}
      <div style={maintenanceMode ? { filter: 'blur(5px)' } : {}}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-[#0a0f1c]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/mn-logo.svg" alt="MirrorNeuron Logo" className="h-8 w-8" />
            <span className="font-bold text-lg text-white">MirrorNeuron</span>
          </Link>
          <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-400">
            <Link href="https://doc.mirrorneuron.io" target="_blank" className="hover:text-white transition-colors">Docs</Link>
            <div className="relative group py-4">
              <Link href="#use-cases" className="flex items-center gap-1 hover:text-white transition-colors">
                Use Cases
                <svg className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </Link>
              <div className="absolute top-full left-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-[#0d1117] border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                <Link href="/use-cases/finance" className="flex items-start gap-3 px-4 py-3 hover:bg-slate-800/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Activity className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-0.5">Finance</div>
                    <div className="text-xs text-slate-500">Market simulations & monitoring</div>
                  </div>
                </Link>
                <Link href="/use-cases/science" className="flex items-start gap-3 px-4 py-3 hover:bg-slate-800/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Network className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-0.5">Science & Research</div>
                    <div className="text-xs text-slate-500">Large-scale ecosystem sims</div>
                  </div>
                </Link>
                <Link href="/use-cases/ai-worker" className="flex items-start gap-3 px-4 py-3 hover:bg-slate-800/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Workflow className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-0.5">AI Workers</div>
                    <div className="text-xs text-slate-500">Autonomous background agents</div>
                  </div>
                </Link>
              </div>
            </div>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/MirrorNeuronLab/MirrorNeuron" target="_blank" className="text-slate-400 hover:text-white transition-colors hidden sm:block">
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                  [STATUS: ACTIVE] • UPTIME: 14d 3h
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white text-balance leading-[1.1]">
                  Unstoppable runtimes for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">long-lived AI.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-xl leading-relaxed text-balance">
                  Built for week-long marketing campaigns, heavy financial market research, and complex science experiments. Run your agents entirely on-edge, in the cloud, or hybrid for absolute privacy and data security.
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                  <div className="relative group w-full sm:w-auto">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative flex items-center justify-between bg-[#05080f] border border-slate-700 rounded-lg p-1 shadow-2xl overflow-hidden w-full sm:w-auto">
                      <div className="flex items-center gap-3 px-4 py-3 bg-[#0a0f1c] w-full">
                        <span className="text-slate-500 font-mono text-sm shrink-0">~</span>
                        <code className="text-slate-300 font-mono text-sm whitespace-nowrap"><span className="text-blue-400">curl</span> -fsSL https://mn.io/install.sh | bash</code>
                      </div>
                      <div className="px-3 py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm cursor-pointer transition-colors border-l border-slate-700/50 flex items-center justify-center shrink-0" onClick={() => navigator.clipboard.writeText('curl -fsSL https://mn.io/install.sh | bash')}>
                        COPY
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link href="#quickstart" className="flex items-center gap-2 bg-transparent hover:bg-slate-800/50 text-white px-6 py-3 rounded-lg font-mono text-sm transition-all border border-slate-700 w-full sm:w-auto justify-center">
                    <Play className="h-4 w-4" />
                    &gt; Initialize Runtime
                  </Link>
                  <Link href="https://doc.mirrorneuron.io" target="_blank" className="flex items-center gap-2 text-slate-400 hover:text-white px-4 py-2 font-mono text-sm transition-colors w-full sm:w-auto justify-center">
                    [ Read the Docs ]
                  </Link>
                </div>

                <div className="mt-8 flex items-center gap-4 font-mono text-xs text-slate-500">
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

        {/* Design Principles */}
        <section className="py-24 bg-[#0a0f1c] border-b border-slate-800/60 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Core Design Principles</h2>
              <p className="text-lg text-slate-400 font-mono text-sm">
                Built from the ground up for the unique demands of AI agents.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { icon: <Activity className="w-8 h-8 text-blue-400" />, title: "Dynamic", desc: "Embraces the non-deterministic nature of agents with flexible, adaptive execution paths." },
                { icon: <Lock className="w-8 h-8 text-indigo-400" />, title: "Absolute Privacy", desc: "Keep financial data out of 3rd-party clouds. Run 100% locally or on hybrid edge networks." },
                { icon: <CheckCircle2 className="w-8 h-8 text-purple-400" />, title: "Easy to Use", desc: "Intuitive Python and TS SDKs mean you spend time building agents, not learning complex tooling." },
                { icon: <Clock className="w-8 h-8 text-orange-400" />, title: "Infinite Uptime", desc: "Built for tasks that take weeks. Automatic state saving and seamless recovery on failure." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-start p-6 bg-transparent border border-slate-700/50 hover:border-slate-500 transition-colors rounded-sm">
                  <div className="w-14 h-14 bg-slate-900 flex items-center justify-center mb-6 border border-slate-700/50 rounded-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-mono">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Features Built for You */}
        <section className="py-24 bg-slate-900/50 border-b border-slate-800/60">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Features Built for You</h2>
              <p className="text-lg text-slate-400">
                Designed to make building, deploying, and monitoring AI agents frictionless.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="p-8 rounded-2xl bg-[#0a0f1c] border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                <Workflow className="w-8 h-8 text-indigo-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Intuitive Workflow Authoring</h3>
                <p className="text-slate-400">Write standard Python or TypeScript. No heavy DSLs or complex YAML configuration required. Your code is the workflow.</p>
              </div>
              <div className="p-8 rounded-2xl bg-[#0a0f1c] border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                <Box className="w-8 h-8 text-blue-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Effortless Observability</h3>
                <p className="text-slate-400">Monitor agent execution in real-time. Trace inputs, outputs, LLM calls, and errors from a unified visual dashboard.</p>
              </div>
              <div className="p-8 rounded-2xl bg-[#0a0f1c] border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                <Repeat className="w-8 h-8 text-emerald-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Resilient Execution</h3>
                <p className="text-slate-400">Automatic retries, state persistence, and seamless recovery. Never lose progress when an API times out or a node crashes.</p>
              </div>
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

        {/* Integrations (Skills) */}
        <section className="py-24 bg-[#0a0f1c] border-b border-slate-800/60">
          <div className="container mx-auto px-6 text-center">
             <div className="max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl font-bold text-white mb-6">Seamless Integrations & Skills</h2>
               <p className="text-lg text-slate-400">
                 Equip your agents with pre-built skills to interact with 3rd-party services instantly.
               </p>
             </div>

             <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
               {[
                 { name: "Slack", icon: <FaSlack className="w-5 h-5 text-pink-400" /> },
                 { name: "GitHub", icon: <FaGithub className="w-5 h-5 text-white" /> },
                 { name: "Databases", icon: <Database className="w-5 h-5 text-blue-400" /> },
                 { name: "REST APIs", icon: <Globe className="w-5 h-5 text-emerald-400" /> },
                 { name: "OpenAI", icon: <MessageSquare className="w-5 h-5 text-purple-400" /> },
                 { name: "Terminal", icon: <Terminal className="w-5 h-5 text-orange-400" /> }
               ].map((skill, i) => (
                 <div key={i} className="flex items-center gap-3 px-6 py-4 bg-slate-800/30 border border-slate-700 rounded-full hover:border-blue-500/50 hover:bg-slate-800/60 transition-all cursor-default">
                    <span>{skill.icon}</span>
                    <span className="font-medium text-white">{skill.name}</span>
                 </div>
               ))}
               <div className="flex items-center gap-3 px-6 py-4 border border-dashed border-slate-600 rounded-full text-slate-400 bg-slate-900/20">
                 <span className="font-medium">+ 50 more skills via plugins</span>
               </div>
             </div>
          </div>
        </section>

        {/* 4. Use Cases */}
        <section id="use-cases" className="py-24 bg-slate-900/30 border-b border-slate-800/60">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl font-bold text-white mb-6">Real-World Use Cases</h2>
              <p className="text-lg text-slate-400">
                Discover how engineering teams are leveraging MirrorNeuron to build production-ready AI agents for long-running, reliable tasks.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl">
              <div className="group p-8 rounded-2xl bg-[#0a0f1c] border border-slate-800 hover:border-blue-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="mb-4 inline-flex px-3 py-1 bg-blue-500/10 text-blue-400 text-sm font-semibold rounded-full border border-blue-500/20">Finance</div>
                  <h3 className="text-xl font-bold text-white mb-3">Market Simulation & Monitoring</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    Build and operate agents that monitor stock markets for days, run synthetic multi-agent market simulations, and execute quantitative strategies reliably.
                  </p>
                </div>
                <Link href="/use-cases/finance" className="text-blue-400 font-medium flex items-center gap-2 group-hover:text-blue-300 transition-colors">Explore Finance <ArrowRight className="w-4 h-4" /></Link>
              </div>

              <div className="group p-8 rounded-2xl bg-[#0a0f1c] border border-slate-800 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="mb-4 inline-flex px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-semibold rounded-full border border-emerald-500/20">Science & Research</div>
                  <h3 className="text-xl font-bold text-white mb-3">Large-Scale Sim & Deep Research</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    Execute long-running research tasks like large scale ecosystem simulations, iterative drug discovery workflows, and deep AI-driven literature reviews.
                  </p>
                </div>
                <Link href="/use-cases/science" className="text-emerald-400 font-medium flex items-center gap-2 group-hover:text-emerald-300 transition-colors">Explore Science <ArrowRight className="w-4 h-4" /></Link>
              </div>

              <div className="group p-8 rounded-2xl bg-[#0a0f1c] border border-slate-800 hover:border-orange-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="mb-4 inline-flex px-3 py-1 bg-orange-500/10 text-orange-400 text-sm font-semibold rounded-full border border-orange-500/20">AI Workers</div>
                  <h3 className="text-xl font-bold text-white mb-3">Autonomous Background Monitors</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    Deploy AI workers that run persistently in the background. From Slack monitors waiting for cues to infinite code generation and review cycles.
                  </p>
                </div>
                <Link href="/use-cases/ai-worker" className="text-orange-400 font-medium flex items-center gap-2 group-hover:text-orange-300 transition-colors">Explore AI Workers <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4.5 Deployment & Edge Focus */}
        <section className="py-24 bg-[#0a0f1c] border-b border-slate-800/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0a0f1c]/0 to-transparent pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-6 inline-flex px-3 py-1 bg-indigo-500/10 text-indigo-400 font-mono text-xs border border-indigo-500/30">
                  [ ENVIRONMENT: ANY ]
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-mono tracking-tight">
                  Own your AI. <br />
                  <span className="text-slate-400">Working 24/7.</span>
                </h2>
                
                <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                  <p>
                    MirrorNeuron is built so you can own the entire execution environment. Deploy your long-lived agents exactly where they need to be, without compromising on privacy, security, or latency.
                  </p>
                  
                  <ul className="space-y-6 mt-8">
                    <li className="flex items-start gap-4">
                      <div className="mt-1 bg-[#05080f] p-2 rounded-sm border border-slate-700 text-blue-400 shrink-0">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="text-white font-mono text-sm block mb-1">ON-EDGE (100% LOCAL)</strong>
                        <span className="text-sm text-slate-400">Run directly on an NVIDIA DGX, a local workstation, or an industrial gateway. Keep sensitive financial and scientific data completely on-premise.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 bg-[#05080f] p-2 rounded-sm border border-slate-700 text-indigo-400 shrink-0">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="text-white font-mono text-sm block mb-1">CLOUD OR HYBRID</strong>
                        <span className="text-sm text-slate-400">Scale out to managed Kubernetes in the cloud, or span your workflow across both edge and cloud networks seamlessly.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 blur-xl group-hover:opacity-100 transition duration-500 opacity-50"></div>
                <div className="relative border border-slate-700 bg-[#05080f] p-2 rounded-sm shadow-2xl">
                  <div className="relative overflow-hidden rounded-sm border border-slate-800 bg-[#0a0f1c] aspect-video flex items-center justify-center p-4">
                    {/* NVIDIA DGX Spark Image */}
                    <img 
                      src="https://storage.ghost.io/c/35/17/35170502-dfe4-4f36-9612-bdc657f28241/content/images/2025/05/2-Spark-Front.png" 
                      alt="NVIDIA DGX Spark running on edge" 
                      className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-700 drop-shadow-2xl mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-transparent opacity-60 pointer-events-none"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                    <div className="flex gap-2 items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                      <span className="font-mono text-[10px] text-blue-400 tracking-wider">RUNTIME ACTIVE</span>
                    </div>
                    <div className="bg-[#05080f]/90 backdrop-blur-md border border-slate-700 px-3 py-1.5 font-mono text-[10px] text-slate-400 uppercase pointer-events-auto">
                      Hardware: NVIDIA DGX™ Spark / Credit: NVIDIA
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Why not X (Comparison) */}
        <section className="py-24 bg-[#05080f] border-b border-slate-800/60">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto border border-slate-700 bg-[#0a0f1c] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 font-mono text-xs text-slate-600 border-b border-l border-slate-700 bg-[#05080f]">
                MANIFESTO.TXT
              </div>
              <h2 className="text-3xl font-bold text-white mb-8 font-mono tracking-tight mt-4">We respect Temporal. But...</h2>
              
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  Temporal is an engineering marvel. If you are building a massive enterprise billing system, you should probably use it.
                </p>
                <p>
                  But if you are building the next generation of AI agents, you don't always want to manage a massive orchestration cluster just to get durability. 
                </p>
                <div className="pl-6 border-l-2 border-indigo-500 py-2 my-8 text-white font-medium bg-indigo-500/5">
                  <p>MirrorNeuron gives you the stateful, crash-proof durability of the big players, but it's lightweight enough to run on a Raspberry Pi at the edge, or scale to the cloud.</p>
                </div>
                <p>
                  Most importantly: It keeps your sensitive financial models and scientific data strictly on your hardware, out of third-party hands. It is the runtime for the open-source AI era.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="h-px bg-slate-700 flex-1"></div>
                <div className="font-mono text-xs text-slate-500">EOF</div>
                <div className="h-px bg-slate-700 flex-1"></div>
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
              <div className="text-slate-300 mb-4"><span className="text-blue-400">curl</span> -fsSL https://raw.githubusercontent.com/MirrorNeuronLab/MirrorNeuron/main/install.sh | bash</div>
              <div className="text-slate-500 mb-2"># Run the example</div>
              <div className="text-slate-300"><span className="text-green-400">mn</span> run examples/agent_research</div>
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
                <img src="/mn-logo.svg" alt="MirrorNeuron Logo" className="h-8 w-8 grayscale opacity-80" />
                <span className="font-bold text-lg text-white">MirrorNeuron</span>
              </Link>
              <p className="text-slate-500 text-sm max-w-xs mb-6 leading-relaxed">
                The durable execution engine for AI agents and distributed workflows. Open source and built for scale.
              </p>
              <div className="flex gap-4">
                <Link href="https://github.com/MirrorNeuronLab/MirrorNeuron" className="text-slate-500 hover:text-white transition-colors">
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
                <li><Link href="https://github.com/MirrorNeuronLab/MirrorNeuron/releases" className="hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Developers</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="https://doc.mirrorneuron.io" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#quickstart" className="hover:text-white transition-colors">Quickstart</Link></li>
                <li><Link href="https://github.com/MirrorNeuronLab/MirrorNeuron" className="hover:text-white transition-colors">GitHub Repository</Link></li>
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

      {/* Maintenance Mode Overlay */}
      {maintenanceMode && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Coming Soon</h1>
            <p className="text-3xl text-white">We're fine-tuning the details. Check back shortly!</p>
          </div>
        </div>
      )}
    </div>
  );
}
