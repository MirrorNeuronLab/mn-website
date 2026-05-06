import Image from 'next/image';
import { Cpu, Database, ShieldCheck } from 'lucide-react';
import { Section } from '@/components/ui/section';

const deploymentTargets = [
  {
    id: 'desktop',
    image: '/on-edge/desktop.png',
    alt: 'Desktop environment for running local AI workflows',
    title: 'DESKTOP AI PROTOTYPE',
    text: 'Prototype a durable workflow on a developer machine before cluster setup becomes part of the conversation.',
  },
  {
    id: 'personal-ai-cluster',
    image: '/on-edge/cluster.png',
    alt: 'Private cluster environment for scaling durable AI workflows',
    title: 'PERSONAL AI CLUSTER',
    text: 'Move the same normal-code workflow to shared infrastructure when throughput or uptime needs grow.',
  },
  {
    id: 'workstation',
    image: '/on-edge/workstaion.png',
    alt: 'Workstation environment for running private AI workflows',
    title: 'AI WORKSTATION',
    text: 'Run near GPUs, lab systems, internal tools, or sensitive project folders without changing the workflow shape.',
  },
];

const trustPoints = [
  {
    icon: <Database className="h-4 w-4" />,
    title: 'Data stays close',
    text: 'Run beside files, feeds, tools, and systems you already control.',
  },
  {
    icon: <Cpu className="h-4 w-4" />,
    title: 'Same workflow shape',
    text: 'Start local, then move to edge, cluster, or cloud when useful.',
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: 'Runtime, not machines',
    text: 'MirrorNeuron is the durable execution layer, not a hardware catalog.',
  },
];

export function OnEdgeHardwareSection() {
  return (
    <Section>
      <div className="mn-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mn-eyebrow mn-gradient-text">On-edge solutions</div>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
            Run durable AI workflows where private data already lives.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
            Some workflows belong beside the data: lab systems, market feeds,
            private files, device telemetry, customer records, or internal
            tools. MirrorNeuron gives those workflows a durable runtime without
            making cloud orchestration the starting point.
          </p>
          <p className="mx-auto mt-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">
            Deployment targets, not hardware SKUs
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {deploymentTargets.map((target) => (
            <article
              key={target.id}
              className="group rounded-3xl border border-slate-800 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.72),rgba(2,6,23,0.68))] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.22)] transition-all hover:-translate-y-0.5 hover:border-cyan-400/30"
            >
              <div className="flex flex-col gap-5">
                <div className="flex w-full justify-center overflow-hidden rounded-2xl bg-black">
                  <Image
                    src={target.image}
                    alt={target.alt}
                    width={300}
                    height={225}
                    sizes="(min-width: 1280px) 300px, (min-width: 1024px) 28vw, 300px"
                    className="h-auto w-full max-w-[300px] object-contain opacity-90 transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold uppercase leading-6 tracking-[0.18em] text-cyan-300">
                    {target.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {target.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {trustPoints.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/35 p-4"
            >
              <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-200">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-6 text-slate-500">
          MirrorNeuron is the workflow runtime. The images show common places
          your workflows can run.
        </p>
      </div>
    </Section>
  );
}
