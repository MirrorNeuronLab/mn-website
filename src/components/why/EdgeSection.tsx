import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const environmentChain = [
  'available compute',
  'models',
  'memory',
  'machine state',
  'placement',
  'recovery',
];

export function EdgeSection() {
  return (
    <section aria-labelledby="edge-heading" className="mt-24">
      <div className="max-w-2xl">
        <Badge variant="outline">Built for the edge</Badge>
        <h2
          id="edge-heading"
          className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl"
        >
          The edge is not a smaller cloud.
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-7 text-[#888781] sm:text-base">
          <p>
            Cloud infrastructure hides many reliability problems. On local
            and edge systems, resources are finite, machines are
            heterogeneous, networks disappear, processes crash, models
            compete for memory, and jobs may need to continue next to
            sensors or physical equipment.
          </p>
          <p>
            MirrorNeuron treats those constraints as part of execution
            rather than exceptions around it. It can reason about the
            environment the workflow actually has:
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        {environmentChain.map((item, index) => (
          <span key={item} className="flex items-center gap-2">
            {index > 0 ? (
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 text-[#56ccf2]"
                aria-hidden="true"
              />
            ) : null}
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-[#deddd8]">
              {item}
            </span>
          </span>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center font-display text-xl font-normal leading-snug tracking-[-0.015em] text-[#f4f2ed] sm:text-2xl">
        Dependability means continuing useful work even when the
        infrastructure is imperfect.
      </p>
    </section>
  );
}
