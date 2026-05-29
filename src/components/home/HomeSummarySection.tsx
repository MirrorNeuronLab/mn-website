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
    label: 'On-edge first',
    title: 'Run near the work',
    text: 'Start locally, then keep the same workflow portable when the workload needs to scale.',
  },
  {
    icon: <Boxes className="h-5 w-5" />,
    label: 'Start faster',
    title: 'Use a blueprint first',
    text: 'Begin with working AI workflows instead of designing orchestration from scratch.',
  },
  {
    icon: <RotateCcw className="h-5 w-5" />,
    label: 'Stay reliable',
    title: 'Recover when work fails',
    text: 'Retries, checkpoints, sleep, and resume are built for long-running agent work.',
  },
  {
    icon: <ServerCog className="h-5 w-5" />,
    label: 'Portable',
    title: 'Cloud when you want it',
    text: 'Use the same workflow shape on a laptop, edge node, private cluster, or cloud deployment.',
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
              On-edge AI workflows, without the orchestration project.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              MirrorNeuron gives teams a simple runtime for durable agents that
              should run close to data and tools first, while staying portable
              enough for cloud when the workload belongs there.
            </p>
            <Button asChild variant="secondary" className="mt-7 px-5 py-3">
              <Link href="/why">
                See the details
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
