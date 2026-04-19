import { Section } from '@/components/ui/section';
import SdkCodeTabs from './SdkCodeTabs';

const sdkPoints = [
  'Decorators register agents and workflows directly in code.',
  'The same workflow can be saved, shared, rerun, and recovered later.',
  'This is designed for multi-agent processes that need durability without heavy workflow ceremony.',
];

export function SdkSection() {
  return (
    <Section id="sdk" tone="deep">
      <div className="mn-container">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mn-eyebrow">SDK integration</div>
            <h2 className="mt-4 text-4xl font-bold text-white">
              Build agents and workflows in code your team already understands
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              The SDK is where MirrorNeuron should feel obviously lighter than
              Airflow or Temporal. Define agents, register workflows, and keep
              the developer experience close to normal code instead of making
              orchestration its own project.
            </p>
            <div className="mt-8 space-y-4">
              {sdkPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm leading-7 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <SdkCodeTabs />
        </div>
      </div>
    </Section>
  );
}
