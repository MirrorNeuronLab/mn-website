import { CheckCircle2, Code2, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const steps = [
  {
    title: 'Run a blueprint',
    description: 'Start with a working durable agent workflow.',
    icon: PlayCircle,
  },
  {
    title: 'Keep it local',
    description: 'Run near your data, tools, models, and compute.',
    icon: CheckCircle2,
  },
  {
    title: 'Customize in code',
    description: 'Replace pieces with your own tools and logic.',
    icon: Code2,
  },
];

export default function HeroOutcomePanel() {
  return (
    <Card
      variant="soft"
      className="relative w-full min-w-0 overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_34%),linear-gradient(180deg,#0d1628_0%,#07101d_56%,#05080f_100%)] p-5 shadow-2xl shadow-black/25"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10">
        <Badge className="mb-4">Next step</Badge>
        <h2 className="text-2xl font-semibold leading-8 text-cyan-50">
          Run a blueprint, then make it yours.
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          MirrorNeuron keeps the starting path small: install the runtime, run
          a durable workflow, and swap in your own agent code when you are ready.
        </p>

        <Separator className="my-5" />

        <div className="space-y-3">
          {steps.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800/90 bg-slate-950/45 p-4"
            >
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-slate-100">
                    {item.title}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
