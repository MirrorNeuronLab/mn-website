import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const infrastructureChain = [
  'Laptop',
  'GPU workstation',
  'Private machines',
  'Cluster',
  'Air-gapped',
];

export function InfrastructureSection() {
  return (
    <section aria-labelledby="infrastructure-heading" className="mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline">Your infrastructure</Badge>
        <h2
          id="infrastructure-heading"
          className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl"
        >
          Start with one machine. Scale outward when the work demands it.
        </h2>
        <div className="mx-auto mt-5 max-w-xl space-y-4 text-sm leading-7 text-[#888781] sm:text-base">
          <p>
            A developer machine should be enough to begin. As requirements
            grow, the same workflow can move across workstations, private
            machines, or clusters without being redesigned around a hosted
            control plane.
          </p>
          <p>
            Cloud services can participate when useful. They are not
            required.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {infrastructureChain.map((item, index) => (
          <span key={item} className="flex items-center gap-2">
            {index > 0 ? (
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 text-[#aaa9a3]"
                aria-hidden="true"
              />
            ) : null}
            <span
              className={`rounded-2xl border px-4 py-2.5 text-sm font-medium ${
                index === 0 || index === infrastructureChain.length - 1
                  ? 'border-white/[0.08] bg-[#141412] text-[#deddd8]'
                  : index === infrastructureChain.length - 2
                    ? 'border-[#56ccf2]/30 bg-[#56ccf2]/[0.08] text-[#f4f2ed]'
                    : 'border-white/[0.08] bg-[#141412] text-[#f4f2ed]'
              }`}
            >
              {item}
            </span>
          </span>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-7 text-[#888781] sm:text-base">
        Most AI platforms start in the cloud and work backward toward your
        machine.{' '}
        <span className="text-[#f4f2ed]">
          MirrorNeuron starts with your machine and expands outward.
        </span>
      </p>
    </section>
  );
}
