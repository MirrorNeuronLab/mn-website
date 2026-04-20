import Link from 'next/link';
import { ArrowRight, Boxes, RotateCcw, ServerCog, Share2 } from 'lucide-react';
import { Section } from '@/components/ui/section';

const valueCards = [
  {
    icon: <Boxes className="h-5 w-5" />,
    label: 'Start faster',
    title: 'Use a blueprint first',
    text: 'Begin with working AI workflows instead of designing orchestration from scratch.',
  },
  {
    icon: <RotateCcw className="h-5 w-5" />,
    label: 'Stay reliable',
    title: 'Recover when work fails',
    text: 'Retries, checkpoints, sleep, and resume are built for long-running agent work.',
  },
  {
    icon: <ServerCog className="h-5 w-5" />,
    label: 'Run anywhere',
    title: 'Keep deployment flexible',
    text: 'Run on a laptop, edge node, cluster, or cloud without changing the workflow idea.',
  },
  {
    icon: <Share2 className="h-5 w-5" />,
    label: 'Reuse work',
    title: 'Share workflows clearly',
    text: 'Turn one useful run into a workflow others can inspect, adapt, and repeat.',
  },
];

export function HomeSummarySection() {
  return (
    <Section>
      <div className="mn-container">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="max-w-xl">
            <div className="mn-eyebrow mn-gradient-text">
              Why MirrorNeuron
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white">
              Durable AI workflows, without the orchestration project.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              A simple path from first working blueprint to reliable background
              workflows your team can run, share, and trust.
            </p>
            <Link
              href="/why"
              className="mn-secondary-action mt-7 px-5 py-3"
            >
              See the details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {valueCards.map((item) => (
              <div key={item.title} className="mn-card-soft p-6">
                <div className="flex items-center gap-3 text-cyan-200">
                  <div className="rounded-2xl bg-cyan-300/10 p-2">
                    {item.icon}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em]">
                    {item.label}
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
