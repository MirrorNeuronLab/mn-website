import { ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const runtimeCapabilities = [
  'State',
  'Checkpoints',
  'Recovery',
  'Human gates',
  'Resources',
  'Sandboxes',
  'History',
  'Observability',
];

export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="mt-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline">Dependable execution</Badge>
        <h2
          id="architecture-heading"
          className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl"
        >
          Probabilistic intelligence needs a dependable runtime.
        </h2>
        <div className="mx-auto mt-5 max-w-xl space-y-4 text-sm leading-7 text-[#888781] sm:text-base">
          <p>
            Once an AI task lasts beyond a single request, something has to
            own its lifecycle. MirrorNeuron handles the execution around
            your workflow: state, checkpoints, recovery, sandboxing, human
            control, resources, and observability.
          </p>
          <p className="text-[#deddd8]">
            The model can remain probabilistic. Execution does not have to
            be.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-md flex-col items-stretch">
        <div className="rounded-2xl border border-white/[0.08] bg-[#141412] p-4 text-center">
          <div className="text-sm font-medium text-[#f4f2ed]">
            AI models / agents / tools
          </div>
        </div>

        <div className="flex items-center justify-center py-1.5" aria-hidden="true">
          <ArrowDown className="h-4 w-4 text-[#aaa9a3]" />
        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-center font-mono text-xs text-[#aaa9a3]">
          reasoning &amp; judgment
        </div>

        <div className="flex items-center justify-center py-1.5" aria-hidden="true">
          <ArrowDown className="h-4 w-4 text-[#56ccf2]" />
        </div>

        <div className="rounded-2xl border border-[#56ccf2]/30 bg-[#11110f] p-4 sm:p-5">
          <div className="flex items-center justify-center gap-2">
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-[#f4f2ed]">
              MirrorNeuron
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {runtimeCapabilities.map((capability) => (
              <div
                key={capability}
                className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#080807] px-3 py-2.5 text-xs text-[#deddd8]"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#56ccf2]"
                  aria-hidden="true"
                />
                {capability}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center py-1.5" aria-hidden="true">
          <ArrowDown className="h-4 w-4 text-[#aaa9a3]" />
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#141412] p-4 text-center">
          <div className="text-sm font-medium text-[#f4f2ed]">
            real systems
          </div>
        </div>
      </div>
    </section>
  );
}
