'use client';

import { useState, type ReactNode } from 'react';
import { Check, Copy, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { trackEvent } from '@/lib/analytics';
import { copyTextToClipboard } from '@/lib/clipboard';

type Step = {
  step: string;
  title: string;
  command: string;
  note?: {
    text: string;
    href: string;
    linkLabel: string;
  };
};

type BlueprintModalTriggerProps = {
  children: ReactNode;
  className: string;
  iconClassName?: string;
};

const steps: Step[] = [
  {
    step: '1',
    title: 'Install MirrorNeuron',
    command: 'curl -fsSL https://mirrorneuron.io/install.sh | bash',
    note: {
      text: 'Before installing MirrorNeuron, install Docker first.',
      href: 'https://docs.docker.com/get-started/get-docker/',
      linkLabel: 'Docker installation guide',
    },
  },
  {
    step: '2',
    title: 'Run the drug discovery blueprint',
    command: 'mn blueprint run science_drug_discovery_closed_loop_lab',
  },
];

export default function BlueprintModalTrigger({
  children,
  className,
  iconClassName = 'h-4 w-4',
}: BlueprintModalTriggerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  const copyCommand = async (step: Step) => {
    const didCopy = await copyTextToClipboard(step.command);

    if (!didCopy) {
      return;
    }

    trackEvent('copy_blueprint_cli_step', {
      step_number: step.step,
      step_title: step.title,
      command: step.command,
    });
    setCopiedStep(step.step);
    window.setTimeout(() => setCopiedStep(null), 1600);
  };

  return (
    <>
      <Button
        className={className}
        onClick={() => {
          trackEvent('open_blueprint_build_modal', {
            location: 'hero',
            cta_label:
              typeof children === 'string'
                ? children
                : 'Run your first blueprint',
          });
          setIsModalOpen(true);
        }}
      >
        {children}
        <PlayCircle className={iconClassName} />
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent aria-describedby="blueprint-modal-description">
        <DialogHeader>
          <Badge className="mb-2">Quickstart</Badge>
          <DialogTitle className="text-xl sm:text-2xl">
            Run your first blueprint
          </DialogTitle>
          <DialogDescription id="blueprint-modal-description">
            Run the drug discovery closed-loop lab and see how MirrorNeuron
            orchestrates a durable multi-step AI workflow locally.
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-5" />

        <div className="mt-5 space-y-4">
          {steps.map((item) => (
            <Card
              key={item.step}
              variant="plain"
              className="rounded-2xl bg-[#060b14]/80 p-3 sm:p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-xs font-semibold text-slate-950">
                  {item.step}
                </div>
                <div className="font-semibold text-white">{item.title}</div>
              </div>

              {item.note ? (
                <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm leading-7 text-amber-100">
                  {item.note.text}{' '}
                  <a
                    href={item.note.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackEvent('click_docker_install_guide', {
                        location: 'blueprint_build_modal',
                        step_number: item.step,
                      })
                    }
                    className="font-semibold text-amber-200 underline decoration-amber-300/40 underline-offset-4 transition-colors hover:text-white"
                  >
                    {item.note.linkLabel}
                  </a>
                </div>
              ) : null}

              <div className="mt-4 rounded-xl border border-slate-800 bg-[#05080f] p-3 font-mono text-xs text-slate-200 shadow-inner sm:p-4 sm:text-sm">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-500"># {item.title}</div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => copyCommand(item)}
                    aria-label={`Copy ${item.title} command`}
                    title={
                      copiedStep === item.step
                        ? 'Copied'
                        : `Copy ${item.title} command`
                    }
                    className="h-8 w-8 rounded-lg border-slate-700 bg-slate-900/80 text-slate-400 hover:border-cyan-400/40 hover:bg-slate-800 hover:text-cyan-100"
                  >
                    {copiedStep === item.step ? (
                      <Check className="h-4 w-4 text-emerald-300" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap break-all text-cyan-100 leading-6 sm:leading-7">
                  <code>{item.command}</code>
                </pre>
                  </div>
            </Card>
          ))}
        </div>
      </DialogContent>
      </Dialog>
    </>
  );
}
