import { Badge } from '@/components/ui/badge';

export function PrincipleSection() {
  return (
    <section aria-labelledby="principle-heading" className="mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline">Workflow first</Badge>
        <h2
          id="principle-heading"
          className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl"
        >
          Define the procedure before delegating the judgment.
        </h2>
        <div className="mx-auto mt-5 max-w-xl space-y-4 text-sm leading-7 text-[#888781] sm:text-base">
          <p>
            MirrorNeuron starts with an explicit workflow: the steps, state,
            control points, resources, and execution boundaries required to
            complete the work.
          </p>
          <p>
            AI can still reason, branch, add work, or revise the plan when
            new context appears. The difference is that intelligence operates
            inside an execution structure, rather than being asked to invent
            the entire structure every time.
          </p>
        </div>
        <p className="mt-8 font-display text-xl font-normal leading-snug tracking-[-0.015em] text-[#f4f2ed] sm:text-2xl">
          Structure first. Intelligence where it adds value.
        </p>
      </div>
    </section>
  );
}
