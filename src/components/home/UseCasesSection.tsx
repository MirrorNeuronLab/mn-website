import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { useCaseLinks } from '@/lib/site';

const useCaseCards = useCaseLinks.map((item) => {
  if (item.title === 'Science & Research') {
    return {
      ...item,
      title: 'Science',
      description: 'Durable research loops that keep making progress',
      body: 'Coordinate experiments, hypotheses, and simulations that checkpoint progress and recover without losing valuable work.',
    };
  }

  if (item.title === 'AI Workers') {
    return {
      ...item,
      title: 'Marketing',
      description: 'Always-on campaign workflows that react and improve',
      body: 'Run email, research, audience, and follow-up workflows that keep moving while your team focuses on decisions.',
    };
  }

  return {
    ...item,
    description: 'Always-on risk workflows for changing markets',
    body: 'Turn market signals into durable analysis that watches, reacts, and surfaces decisions while conditions change.',
  };
});

export function UseCasesSection() {
  return (
    <Section id="use-cases">
      <div className="mn-container">
        <div className="max-w-3xl">
          <h2 className="mn-eyebrow mn-gradient-text">
            Launch real-impact workflows instantly
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            MirrorNeuron is not just a runtime demo. Start from blueprints that
            target valuable outcomes immediately, then keep them running,
            reacting, and improving in the background.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {useCaseCards.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mn-card-soft group rounded-3xl p-6 transition-transform hover:-translate-y-0.5"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
                {item.title}
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-7 text-white">
                {item.description}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {item.body}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                Explore use case
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
