'use client';

import { useState, type ReactNode } from 'react';
import { Check, Copy, PlayCircle, X } from 'lucide-react';

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
    title: 'Download our blueprints',
    command: 'mn blueprints pull deep-research email-automation',
  },
  {
    step: '3',
    title: 'Customize and run',
    command:
      'mn run blueprints/deep-research --set objective="Find high-value leads"',
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
    await navigator.clipboard.writeText(step.command);
    setCopiedStep(step.step);
    window.setTimeout(() => setCopiedStep(null), 1600);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={className}
      >
        {children}
        <PlayCircle className={iconClassName} />
      </button>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <button
            type="button"
            aria-label="Close modal overlay"
            className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="blueprint-modal-title"
            className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-700 bg-[#08111e] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                  Mock CLI
                </div>
                <h3
                  id="blueprint-modal-title"
                  className="mt-3 text-2xl font-bold text-white"
                >
                  Build from a blueprint in 1 minute
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl border border-slate-700 p-2 text-slate-400 transition-colors hover:border-slate-500 hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              One install, one blueprint, one run command. These are mock CLI
              details you can replace later.
            </p>

            <div className="mt-5 space-y-4">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-slate-800 bg-[#060b14]/80 p-4"
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
                        className="font-semibold text-amber-200 underline decoration-amber-300/40 underline-offset-4 transition-colors hover:text-white"
                      >
                        {item.note.linkLabel}
                      </a>
                    </div>
                  ) : null}

                  <div className="mt-4 rounded-xl border border-slate-800 bg-[#05080f] p-4 font-mono text-sm text-slate-200 shadow-inner">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="text-xs text-slate-500">
                        # {item.title}
                      </div>
                      <button
                        type="button"
                        onClick={() => copyCommand(item)}
                        aria-label={`Copy ${item.title} command`}
                        title={
                          copiedStep === item.step
                            ? 'Copied'
                            : `Copy ${item.title} command`
                        }
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 text-slate-400 transition-colors hover:border-cyan-400/40 hover:bg-slate-800 hover:text-cyan-100"
                      >
                        {copiedStep === item.step ? (
                          <Check className="h-4 w-4 text-emerald-300" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <pre className="overflow-x-auto whitespace-pre-wrap break-all text-cyan-100">
                      <code>{item.command}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
