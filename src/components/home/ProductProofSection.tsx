import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import {
  productProofItems,
  runtimeBadges,
  runtimeEvents,
  runtimeStats,
} from './data';

export function ProductProofSection() {
  return (
    <Section>
      <div className="mn-container">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mn-eyebrow text-orange-300">OpenClaw users</div>
            <h2 className="mt-4 text-3xl font-bold text-white">
              More control and reliable results for OpenClaw-style agents
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              OpenClaw is useful when you want an assistant that can act through
              channels and tools. MirrorNeuron is for the next step: turning
              those actions into durable workflows you can constrain, resume,
              audit, and repeat when the result has to be reliable.
            </p>
            <div className="mt-8 space-y-6">
              {productProofItems.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1 rounded-lg border border-slate-700 bg-slate-900/70 p-2">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-sm font-semibold text-white">
                  Controlled workflow trace
                </div>
                <div className="text-sm text-slate-400">
                  What changes when agent actions become durable workflows
                </div>
              </div>
              <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Guarded
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {runtimeStats.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {label}
                  </div>
                  <div className="mt-3 text-3xl font-bold text-white">
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3 rounded-2xl border border-slate-800 bg-[#05080f] p-5 font-mono text-sm text-slate-300">
              {runtimeEvents.map(([name, status, color]) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-slate-500">{name}</span>
                  <span className={color}>{status}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
              {runtimeBadges.map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-2"
                >
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
