import Image from 'next/image';
import { Cpu, Database, ShieldCheck } from 'lucide-react';
import { Section } from '@/components/ui/section';

const devices = [
  {
    id: 'desktop-ai-prototype',
    image: '/on-edge/compact-workstation-edge.png',
    alt: 'Stylized wireframe illustration of a compact desktop AI workstation',
    label: 'Desktop AI prototype',
  },
  {
    id: 'personal-ai-cluster',
    image: '/on-edge/personal-edge-system.png',
    alt: 'Stylized wireframe illustration of a compact desktop AI system',
    label: 'Personal AI cluster',
  },
  {
    id: 'ai-workstation',
    image: '/on-edge/deskside-ai-node.png',
    alt: 'Stylized wireframe illustration of a deskside AI workstation',
    label: 'AI Workstation',
  },
];

const trustPoints = [
  {
    icon: <Database className="h-4 w-4" />,
    title: 'Keep data close',
    text: 'Run beside files, feeds, tools, and devices.',
  },
  {
    icon: <Cpu className="h-4 w-4" />,
    title: 'Choose the runtime',
    text: 'Local workstation, edge system, private cluster, or cloud.',
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: 'Control the boundary',
    text: 'You decide which models, adapters, and credentials connect.',
  },
];

export function OnEdgeHardwareSection() {
  return (
    <Section>
      <div className="mn-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mn-eyebrow mn-gradient-text">On-edge solutions</div>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
            For workflows that need to stay close to private data.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
            Some workflows belong beside the data: lab systems, market feeds,
            private files, device telemetry, customer records, or internal
            tools. MirrorNeuron gives those workflows a durable runtime before
            cloud orchestration needs to be the starting point.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3 xl:gap-7">
          {devices.map((device) => (
            <article
              key={device.id}
              className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60 shadow-[0_24px_90px_rgba(0,0,0,0.24)] transition-colors hover:border-cyan-400/30"
            >
              <div className="relative aspect-[4/3] bg-[#020617]">
                <Image
                  src={device.image}
                  alt={device.alt}
                  fill
                  sizes="(min-width: 1280px) 28vw, (min-width: 768px) 31vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </div>
              <div className="border-t border-slate-800/80 px-5 py-4 text-center">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  {device.label}
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
          Devices are for context, not official product imagery
          or endorsements.
        </p>
      </div>
    </Section>
  );
}
