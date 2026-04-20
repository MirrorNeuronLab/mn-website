import { Section } from '@/components/ui/section';
import { securityItems } from './data';

export function SecuritySection() {
  return (
    <Section>
      <div className="mn-container">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mn-eyebrow text-violet-300">
              Security and deployment
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Own your runtime, your data, and your deployment story
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              MirrorNeuron is built for teams that care about private execution
              environments as much as simple developer experience. Run it
              locally, on-edge, in the cloud, or across hybrid environments
              without changing the core promise of the product.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {securityItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
              >
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
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
