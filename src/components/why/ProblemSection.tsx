import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const promptFirstFlow = ['Goal', 'Model', 'Improvise', 'Tools', 'Result'];

const workflowFirstFlow = [
  'Goal',
  'Procedure',
  'AI judgment',
  'Controlled execution',
  'Result',
];

function FlowStrip({
  label,
  steps,
  featured = false,
}: {
  label: string;
  steps: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${
        featured
          ? 'border-[#56ccf2]/30 bg-[#56ccf2]/[0.05]'
          : 'border-white/[0.08] bg-[#11110f]/80'
      }`}
    >
      <div className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#777671]">
        {label}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {steps.map((step, index) => (
          <span key={step} className="flex items-center gap-2">
            {index > 0 ? (
              <ArrowRight
                className={`h-3.5 w-3.5 shrink-0 ${
                  featured ? 'text-[#56ccf2]' : 'text-[#66655f]'
                }`}
                aria-hidden="true"
              />
            ) : null}
            <span
              className={`rounded-full border px-3 py-1.5 font-mono text-xs ${
                featured
                  ? 'border-[#56ccf2]/30 bg-[#56ccf2]/10 text-[#f4f2ed]'
                  : 'border-white/10 bg-white/[0.03] text-[#aaa9a3]'
              }`}
            >
              {step}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProblemSection() {
  return (
    <section aria-labelledby="problem-heading" className="mt-24">
      <div className="max-w-2xl">
        <Badge variant="outline">The problem</Badge>
        <h2
          id="problem-heading"
          className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl"
        >
          Generality comes at the cost of dependability.
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-7 text-[#888781] sm:text-base">
          <p>
            A general model can decide what to do next at runtime. That
            flexibility is valuable, but every additional degree of freedom
            makes execution harder to predict, reproduce, inspect, and
            recover.
          </p>
          <p>
            For exploratory work, that can be fine. For workflows that
            become part of real operations, it is often not enough.
          </p>
          <p className="text-[#deddd8]">
            Large models should remain flexible. The system around them
            should not be fragile.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <FlowStrip label="Prompt-first" steps={promptFirstFlow} />
        <FlowStrip
          label="Workflow-first"
          steps={workflowFirstFlow}
          featured
        />
      </div>
    </section>
  );
}
