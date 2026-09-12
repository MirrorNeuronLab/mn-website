import { Badge } from '@/components/ui/badge';

const comparisonRows = [
  { open: 'goal', structured: 'procedure' },
  { open: 'model', structured: 'AI judgment' },
  { open: 'decide next action', structured: 'controlled execution' },
  { open: 'result', structured: 'result' },
];

export function WorkflowFirstSection() {
  return (
    <section aria-labelledby="workflow-first-heading" className="mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline">Workflow first</Badge>
        <h2
          id="workflow-first-heading"
          className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl"
        >
          Dependable AI starts with a workflow.
        </h2>
        <div className="mx-auto mt-5 max-w-xl space-y-4 text-sm leading-7 text-[#888781] sm:text-base">
          <p>
            Prompts are good for exploration. Operational work needs
            explicit steps, durable state, and clear control boundaries.
            MirrorNeuron keeps that structure while allowing AI to reason
            and adapt inside it.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#11110f]/80">
        <div className="grid grid-cols-2 divide-x divide-white/[0.07] border-b border-white/[0.08] bg-white/[0.02]">
          <div className="px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#777671] sm:px-6">
            Open-ended agent
          </div>
          <div className="bg-[#56ccf2]/[0.05] px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#56ccf2] sm:px-6">
            Workflow-first
          </div>
        </div>
        <div className="divide-y divide-white/[0.07]">
          {comparisonRows.map((row, index) => (
            <div
              key={row.open}
              className="grid grid-cols-2 divide-x divide-white/[0.07]"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 sm:px-6">
                <span className="font-mono text-[0.65rem] text-[#66655f]">
                  0{index + 1}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[0.65rem] text-[#aaa9a3] sm:text-xs">
                  {row.open}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-[#56ccf2]/[0.04] px-4 py-3.5 sm:px-6">
                <span className="font-mono text-[0.65rem] text-[#56ccf2]/70">
                  0{index + 1}
                </span>
                <span className="rounded-full border border-[#56ccf2]/30 bg-[#56ccf2]/10 px-3 py-1.5 font-mono text-[0.65rem] text-[#f4f2ed] sm:text-xs">
                  {row.structured}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-2xl text-center">
        <p className="font-display text-sm font-medium leading-7 tracking-[-0.015em] sm:text-base">
          <span className="text-[#888781]">Flexible intelligence. </span>
          <span className="text-[#f4f2ed]">Dependable execution.</span>
        </p>
      </div>
    </section>
  );
}
