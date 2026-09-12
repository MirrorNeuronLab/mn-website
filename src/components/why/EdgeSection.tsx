import { AppWindow, ArrowDown, ArrowUpRight, Cpu, Gpu, Laptop, MemoryStick, RotateCcw, Terminal, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const edgeConditions = [
  { label: 'memory limits', icon: MemoryStick },
  { label: 'hardware differences', icon: Cpu },
  { label: 'network drops', icon: WifiOff },
  { label: 'process restarts', icon: RotateCcw },
];

const poolNodes = [
  { label: 'Mac', icon: Laptop, position: 'left-1/2 top-[12%]' },
  { label: 'Linux', icon: Terminal, position: 'left-[82.9%] top-[69%]' },
  { label: 'Windows', icon: AppWindow, position: 'left-[17.1%] top-[69%]' },
];

// Arrow badges sit on the circle between machines: Mac → Linux → Windows → Mac.
const ringArrows = [
  { left: '82.9%', top: '31%', rotate: -30 },
  { left: '50%', top: '88%', rotate: 90 },
  { left: '17.1%', top: '31%', rotate: -150 },
];

const poolResources = [
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

        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/[0.08] bg-[#141412] p-6 sm:p-8">
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            {/* Circle + spokes. Lines run center-to-center underneath the cards,
                so they visibly plug into each machine and the shared pool. */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 z-0 h-full w-full"
              aria-hidden="true"
            >
              {/* Spokes: each machine contributes to the shared pool */}
              <g stroke="#ffffff" strokeOpacity="0.12" strokeDasharray="1.2 1.4" strokeWidth="0.4">
                <line x1="50" y1="50" x2="50" y2="12" />
                <line x1="50" y1="50" x2="82.9" y2="69" />
                <line x1="50" y1="50" x2="17.1" y2="69" />
              </g>
              {/* Full circle through all three machines: Mac → Linux → Windows → Mac */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#56ccf2"
                strokeOpacity="0.65"
                strokeWidth="0.5"
              />
            </svg>

            {/* Direction badges riding on the ring */}
            {ringArrows.map((arrow, index) => (
              <div
                key={index}
                aria-hidden="true"
                className="absolute z-20 flex h-7 w-7 items-center justify-center rounded-full border border-[#56ccf2]/50 bg-[#0d1b22] shadow-[0_0_16px_rgba(86,204,242,0.35)]"
                style={{
                  left: arrow.left,
                  top: arrow.top,
                  transform: `translate(-50%, -50%) rotate(${arrow.rotate}deg)`,
                }}
              >
                <ArrowDown className="h-3.5 w-3.5 text-[#56ccf2]" />
              </div>
            ))}

            {/* Outer machine nodes on the ring */}
            {poolNodes.map((node) => (
              <div
                key={node.label}
                className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${node.position}`}
              >
                <div className="flex items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-[#1c1c1a] px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <node.icon
                      className="h-4 w-4 text-[#56ccf2]"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="font-mono text-xs text-[#deddd8]">
                    {node.label}
                  </span>
                </div>
              </div>
            ))}

            {/* Shared pool at the center */}
            <div className="absolute left-1/2 top-1/2 z-10 w-[200px] -translate-x-1/2 -translate-y-1/2">
              <div className="rounded-2xl border border-[#56ccf2]/30 bg-[#0d1b22] px-3 py-4 text-center shadow-[0_0_60px_-12px_rgba(86,204,242,0.35)]">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#f4f2ed]">
                  One resource pool
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
                  {poolResources.map((resource) => (
                    <span
                      key={resource.label}
                      className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-1.5 font-mono text-[0.6rem] text-[#deddd8]"
                    >
                      <resource.icon
                        className="h-3 w-3 text-[#56ccf2]"
                        aria-hidden="true"
                      />
                      {resource.label}
                    </span>
                  ))}
                </div>
                <p className="sr-only">
                  {poolNodes.map((node) => node.label).join(', ')} connected in
                  a ring, sharing GPU, CPU, and memory.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-2 text-center">
            <a
              href="https://doc.mirrorneuron.io/docs/cluster"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#56ccf2] underline-offset-4 hover:underline"
            >
              How to connect nodes
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
