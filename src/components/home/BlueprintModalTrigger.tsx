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
    title: 'Install the runtime',
    command: 'curl -fsSL https://mirrorneuron.io/install.sh | bash',
    note: {
      text: 'Before installing MirrorNeuron, install Docker first.',
      href: 'https://docs.docker.com/get-started/get-docker/',
      linkLabel: 'Docker installation guide',
    },
  },
  {
    step: '2',
    title: 'Run a ready-made workflow',
    command: 'mn blueprint run vc_assistant',
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
                : 'Run a blueprint',
          });
          setIsModalOpen(true);
        }}
      >
        {children}
        <PlayCircle className={iconClassName} />
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <Badge className="mb-2">Two commands</Badge>
            <DialogTitle className="text-xl sm:text-2xl">
              Run your first workflow
            </DialogTitle>
            <DialogDescription>
              Install MirrorNeuron, then launch a complete code-review workflow
              locally.
            </DialogDescription>
          </DialogHeader>

          <Separator className="my-5" />

          <div className="mt-5 space-y-4">
            {steps.map((item) => (
              <Card
                key={item.step}
                variant="plain"
                className="rounded-xl bg-[#0c0c0b] p-3 sm:p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f4f2ed] text-xs font-medium text-[#151514]">
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

                <div className="mt-4 rounded-lg border border-white/10 bg-[#080807] p-3 font-mono text-xs text-[#deddd8] sm:p-4 sm:text-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="text-xs text-[#66655f]"># {item.title}</div>
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
                      className="h-8 w-8 border-white/10 bg-white/[0.035] text-[#777671] hover:border-white/25 hover:bg-white/[0.06] hover:text-[#dcebe7]"
                    >
                      {copiedStep === item.step ? (
                        <Check className="h-4 w-4 text-emerald-300" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only" aria-live="polite">
                        {copiedStep === item.step
                          ? `${item.title} command copied`
                          : ''}
                      </span>
                    </Button>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap break-all text-[#dcebe7] leading-6 sm:leading-7">
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
