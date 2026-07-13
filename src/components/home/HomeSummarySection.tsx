import Link from 'next/link';
import { ArrowRight, Boxes, MapPin, RotateCcw, ServerCog } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Section } from '@/components/ui/section';

const valueCards = [
  {
    icon: <MapPin className="h-5 w-5" />,
    label: 'Start simple',
    title: 'Run on one machine',
    text: 'Prove the workflow on a laptop or workstation before infrastructure becomes part of the project.',
  },
  {
    icon: <Boxes className="h-5 w-5" />,
    label: 'Use normal code',
    title: 'Keep your agents and tools',
    text: 'Define work in Python or JSON and reuse the libraries, models, and services you already trust.',
  },
  {
    icon: <RotateCcw className="h-5 w-5" />,
    label: 'Durability built in',
    title: 'Continue after failure',
    text: 'Persist state, retry failed steps, pause for input, and resume long-running work after a restart.',
  },
  {
    icon: <ServerCog className="h-5 w-5" />,
    label: 'Scale when needed',
    title: 'Add machines, not ceremony',
    text: 'Keep the same workflow shape as you move from a desktop to a private cluster or cloud deployment.',
  },
];

export function HomeSummarySection() {
  return (
    <Section>
      <div className="mn-container">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="max-w-xl">
            <Badge variant="outline">Why MirrorNeuron</Badge>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white">
              Workflow reliability should not require a platform team.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              Airflow is built for scheduled data pipelines. Temporal is built for
              broad distributed applications. MirrorNeuron is focused on durable AI
              workflows, so developers can get retries, recovery, and long-running
              execution without adopting a general-purpose orchestration stack.
            </p>
            <Button asChild variant="secondary" className="mt-7 px-5 py-3">
              <Link href="/why">
                See why it is simpler
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {valueCards.map((item) => (
              <Card key={item.title} variant="soft">
                <CardHeader>
                  <div className="flex items-center gap-3 text-cyan-200">
                    <div className="rounded-2xl bg-cyan-300/10 p-2">
                      {item.icon}
                    </div>
                    <Badge variant="outline">{item.label}</Badge>
                  </div>
                  <CardTitle className="mt-3 text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">
                    {item.text}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
