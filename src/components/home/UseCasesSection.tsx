import { ArrowRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { useCaseLinks } from '@/lib/site';

const useCaseCards = useCaseLinks.map((item) => {
  if (item.title === 'Science & Research') {
    return {
      ...item,
      title: 'Science',
      description: 'Research loops that survive long runs',
      body: 'Coordinate experiments, simulations, and review cycles while preserving progress across failed tools or restarted workers.',
    };
  }

  if (item.title === 'Agent Workflows') {
    return {
      ...item,
      title: 'Agent Workflows',
      description: 'Background agents that wait and resume',
      body: 'Run research, support, browser, and tool workflows that sleep between events and recover without starting over.',
    };
  }

  return {
    ...item,
    description: 'Risk analysis that stays alive as markets change',
    body: 'Keep market monitors and simulation loops running near private feeds, with durable state and reviewable outputs.',
  };
});

export function UseCasesSection() {
  return (
    <Section id="use-cases">
      <div className="mn-container">
        <div className="max-w-3xl">
          <h2 className="mn-eyebrow mn-gradient-text">
            Built for work that cannot finish in one prompt
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
            MirrorNeuron fits workflows that run for minutes, hours, or
            indefinitely: work that calls tools, waits on events, survives
            failures, and produces an output people can inspect.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {useCaseCards.map((item) => (
            <TrackedLink
              key={item.href}
              href={item.href}
              eventName="click_home_use_case"
              eventParams={{
                use_case: item.title,
                destination: item.href,
                location: 'home_use_cases',
              }}
              className="group block"
            >
              <Card variant="soft" className="h-full p-6 transition-transform hover:-translate-y-0.5">
                <Badge>{item.title}</Badge>
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
              </Card>
            </TrackedLink>
          ))}
        </div>
      </div>
    </Section>
  );
}
