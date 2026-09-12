import { Badge } from '@/components/ui/badge';

const approaches = [
  {
    name: 'Python',
    designedAround: 'Direct code where restarting is inexpensive',
    featured: false,
  },
  {
    name: 'Agent frameworks',
    designedAround: 'Defining agents, prompts, tools, and reasoning flows',
    featured: false,
  },
  {
    name: 'Airflow',
    designedAround: 'Scheduled data pipelines and batch workflows',
    featured: false,
  },
  {
    name: 'Temporal',
    designedAround: 'Durable distributed application workflows',
    featured: false,
  },
  {
    name: 'MirrorNeuron',
    designedAround:
      'Dependable AI execution on local, private, and edge infrastructure',
    featured: true,
  },
];

export function ComparisonSection() {
  return (
    <section aria-labelledby="comparison-heading" className="mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline">Different tools, different assumptions</Badge>
        <h2
          id="comparison-heading"
          className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl"
        >
          Use the smallest runtime that solves the problem.
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#11110f]/80">
        <div className="hidden border-b border-white/[0.08] bg-white/[0.02] px-6 py-3 sm:grid sm:grid-cols-[1fr_1.8fr] sm:items-center sm:gap-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#777671]">
          <div>Approach</div>
          <div>Designed around</div>
        </div>
        <div className="divide-y divide-white/[0.07]">
          {approaches.map((approach) => (
            <div
              key={approach.name}
              className={`grid gap-1 border-l-2 border-l-transparent px-6 py-4 sm:grid-cols-[1fr_1.8fr] sm:items-center sm:gap-6 transition-colors ${
                approach.featured
                  ? 'bg-[#56ccf2]/[0.06] border-l-[#56ccf2]'
                  : 'hover:bg-white/[0.015]'
              }`}
            >
              <div className="text-sm font-medium text-[#f4f2ed]">
                {approach.name}
              </div>
              <div className="text-xs sm:text-sm leading-relaxed text-[#aaa9a3]">
                {approach.designedAround}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-7 text-[#888781] sm:text-base">
        MirrorNeuron is not meant to replace all of these. It starts from a
        different assumption: AI work may be long-running, adaptive,
        resource-constrained, and executed on infrastructure you control.
      </p>
    </section>
  );
}
