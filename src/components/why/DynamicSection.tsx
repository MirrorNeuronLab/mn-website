import { Badge } from '@/components/ui/badge';

export function DynamicSection() {
  return (
    <section aria-labelledby="dynamic-heading" className="mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline">Dynamic by design</Badge>
        <h2
          id="dynamic-heading"
          className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl"
        >
          Dependable does not mean static.
        </h2>
        <div className="mx-auto mt-5 max-w-xl space-y-4 text-sm leading-7 text-[#888781] sm:text-base">
          <p>
            Real work changes as new information appears. A MirrorNeuron
            workflow can branch, add or adjust steps, wait for human
            judgment, revise its plan, and continue — while preserving
            execution state and history.
          </p>
        </div>
        <p className="mt-8 font-display text-xl font-normal leading-snug tracking-[-0.015em] text-[#f4f2ed] sm:text-2xl">
          The procedure can change without losing the execution boundary
          around it.
        </p>
      </div>
    </section>
  );
}
