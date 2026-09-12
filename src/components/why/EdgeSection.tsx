import { AppWindow, ArrowDown, Cpu, Gpu, Laptop, MemoryStick, RotateCcw, Terminal, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const edgeConditions = [
  { label: 'memory limits', icon: MemoryStick },
  { label: 'hardware differences', icon: Cpu },
  { label: 'network drops', icon: WifiOff },
  { label: 'process restarts', icon: RotateCcw },
];

const machines = [
  { label: 'Mac', icon: Laptop },
  { label: 'Linux', icon: Terminal },
  { label: 'Windows', icon: AppWindow },
  { label: 'GPU', icon: Gpu },
  { label: 'CPU', icon: Cpu },
  { label: 'Memory', icon: MemoryStick },
];

export function EdgeSection() {
  return (
    <section aria-labelledby="edge-heading" className="mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline">Built for the edge</Badge>
        <h2
          id="edge-heading"
          className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl"
        >
          Your PC is not a small cloud.
        </h2>
        <div className="mx-auto mt-5 max-w-xl space-y-4 text-sm leading-7 text-[#888781] sm:text-base">
          <p>
            On your own machines, resources are finite and conditions change.
            Models compete for memory, hardware varies, networks drop, and
            processes restart.
          </p>
          <p>
            MirrorNeuron makes those constraints part of execution — checking
            resources, placing work, preserving state, and recovering when
            conditions change.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <div className="grid gap-2 sm:grid-cols-2">
          {edgeConditions.map((condition) => (
            <div
              key={condition.label}
              className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#141412] px-4 py-3.5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                <condition.icon
                  className="h-4 w-4 text-[#56ccf2]"
                  aria-hidden="true"
                />
              </span>
              <span className="font-mono text-xs text-[#deddd8]">
                {condition.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-3" aria-hidden="true">
          <ArrowDown className="h-4 w-4 text-[#56ccf2]" />
        </div>
        <div className="flex items-center justify-center rounded-2xl border border-[#56ccf2]/30 bg-[#56ccf2]/[0.06] px-4 py-3.5 text-center">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#f4f2ed]">
            Dependable execution from MirrorNeuron
          </span>
        </div>
      </div>

      {/* Second half — one resource pool */}
      <div className="mt-12">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="font-display text-2xl font-normal leading-[1.15] tracking-[-0.02em] text-[#f4f2ed] sm:text-3xl">
            Start with one machine. Add more when needed.
          </h3>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#888781] sm:text-base">
            Connect your machines into one resource pool.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="grid gap-2 sm:grid-cols-3">
            {machines.map((machine) => (
              <div
                key={machine.label}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#141412] px-4 py-3.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <machine.icon
                    className="h-4 w-4 text-[#56ccf2]"
                    aria-hidden="true"
                  />
                </span>
                <span className="font-mono text-xs text-[#deddd8]">
                  {machine.label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-center py-3" aria-hidden="true">
            <ArrowDown className="h-4 w-4 text-[#56ccf2]" />
          </div>
          <div className="flex items-center justify-center rounded-2xl border border-[#56ccf2]/30 bg-[#56ccf2]/[0.06] px-4 py-3.5 text-center">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#f4f2ed]">
              One resource pool
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
