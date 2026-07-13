import Image from 'next/image';
import { Cpu, Database, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';

const deploymentTargets = [
  {
    id: 'desktop',
    image: '/on-edge/desktop.png',
    alt: 'Developer desktop running a durable AI workflow',
    title: 'DEVELOPER DESKTOP',
    text: 'Build and test a durable workflow on the machine you already use, with no cluster required.',
  },
  {
    id: 'personal-ai-cluster',
    image: '/on-edge/cluster.png',
    alt: 'Private cluster running durable AI workflows',
    title: 'PRIVATE CLUSTER',
    text: 'Add trusted machines when a workflow needs more capacity, uptime, or shared access.',
  },
  {
    id: 'workstation',
    image: '/on-edge/workstaion.png',
    alt: 'GPU workstation running private AI workflows',
    title: 'GPU WORKSTATION',
    text: 'Keep model and tool work close to GPUs, lab systems, internal services, or sensitive project files.',
  },
];

const trustPoints = [
  {
    icon: <Database className="h-4 w-4" />,
    title: 'Keep data close',
    text: 'Run beside the files, feeds, tools, and systems your workflow needs.',
  },
  {
    icon: <Cpu className="h-4 w-4" />,
    title: 'Keep one workflow model',
    text: 'Start locally, then move to a cluster or cloud environment when useful.',
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: 'Control the boundary',
    text: 'Choose where workflow state, tools, model calls, and artifacts are handled.',
  },
];

export function OnEdgeHardwareSection() {
  return (
    <Section>
      <div className="mn-container">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline">Deploy on your terms</Badge>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
            Start on the machine you already have.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
            MirrorNeuron runs where the work and data live: a developer desktop,
            a GPU workstation, a private cluster, or your cloud account. Start
            small, keep control of the environment, and expand only when the
            workload asks for it.
          </p>
          <Badge className="mx-auto mt-5 px-4 py-2">
            Your infrastructure, your deployment path
          </Badge>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {deploymentTargets.map((target) => (
            <Card
              key={target.id}
              variant="soft"
              className="group p-5 transition-all hover:-translate-y-0.5 hover:border-cyan-400/30"
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
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {trustPoints.map((item) => (
            <Card
              key={item.title}
              variant="plain"
              className="flex items-start gap-3 rounded-2xl border-slate-800/80 bg-slate-950/35 p-4"
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
            </Card>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-6 text-slate-500">
          MirrorNeuron is the runtime layer. These are examples of where it can run.
        </p>
      </div>
    </Section>
  );
}
