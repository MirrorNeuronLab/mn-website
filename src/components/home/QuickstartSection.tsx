import { ArrowRight, Check, ExternalLink, Info, TerminalSquare } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ShellCommand from '@/components/ui/shell-command';
import { Section } from '@/components/ui/section';
import { siteConfig } from '@/lib/site';

const blueprintCommand = 'mn blueprint run vc_assistant';

const expectedSteps = [
  {
    title: 'Blueprint ready',
    text: 'MirrorNeuron loads and validates the VC Assistant workflow before the run starts.',
  },
  {
    title: 'Run locally',
    text: 'Agents execute through the local runtime with durable state, retries, and an inspectable trace.',
  },
  {
    title: 'Make it yours',
    text: 'Replace the example inputs and tools while keeping the same reliable execution model.',
  },
];

const quickProofs = [
  ['2 commands', 'First run'],
  ['Local', 'Your machine'],
  ['Inspectable', 'Full trace'],
];

export function QuickstartSection() {
  return (
    <Section id="quickstart">
      <div className="mn-container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline">Quickstart</Badge>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
            Run your first deep-agent workflow in two commands.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
            Install the local runtime, launch the VC Assistant blueprint, and
            inspect a complete agent workflow before writing your own.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="normal-case tracking-normal">
              macOS, Linux or WSL2
            </Badge>
            <Badge variant="outline" className="normal-case tracking-normal">
              Docker required
            </Badge>
            <Badge variant="outline" className="normal-case tracking-normal">
              Git recommended
            </Badge>
          </div>
        </div>

        <Card
          variant="plain"
          className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl border-mn-shell-border bg-mn-shell-surface p-0"
        >
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-5 sm:p-7 lg:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <TerminalSquare className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Two-command local demo
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Copy, paste, and inspect the run
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/45 p-4 sm:p-5">
                <ShellCommand
                  command={siteConfig.installCommand}
                  label="1. Install MirrorNeuron"
                  eventName="copy_install_command"
                  eventParams={{ location: 'quickstart' }}
                  copyControl="text"
                  variant="bare"
                />
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                  <TrackedLink
                    href="/install.sh"
                    target="_blank"
                    eventName="inspect_installer_source"
                    eventParams={{ location: 'quickstart' }}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan-200"
                  >
                    Inspect installer
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </TrackedLink>
                  <TrackedLink
                    href="https://doc.mirrorneuron.io/installation"
                    target="_blank"
                    rel="noreferrer"
                    eventName="click_manual_install"
                    eventParams={{ location: 'quickstart' }}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan-200"
                  >
                    Installation options
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </TrackedLink>
                </div>
              </div>

              <div className="mx-5 h-5 border-l border-dashed border-cyan-300/25" aria-hidden="true" />

              <div className="rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.06] p-4 shadow-[0_16px_50px_rgba(34,211,238,0.06)] sm:p-5">
                <ShellCommand
                  command={blueprintCommand}
                  label="2. Run the VC Assistant blueprint"
                  eventName="copy_quickstart_example_command"
                  eventParams={{ location: 'quickstart' }}
                  copyControl="text"
                  variant="bare"
                />
              </div>

              <div className="mt-5 flex items-start gap-3 text-xs leading-5 text-slate-500">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                <p>
                  The installer prepares the local runtime. Optional model assets
                  are downloaded only for features you enable.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {quickProofs.map(([value, label]) => (
                  <div
                    key={value}
                    className="rounded-xl border border-slate-800 bg-slate-950/35 px-2 py-3 text-center"
                  >
                    <div className="text-xs font-semibold text-slate-200 sm:text-sm">
                      {value}
                    </div>
                    <div className="mt-1 text-[0.65rem] text-slate-500 sm:text-xs">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800/80 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_48%)] p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
              <Badge>Demo blueprint</Badge>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                VC Assistant
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Start with an end-to-end agent workflow instead of a blank file.
                See how the runtime carries state, executes work, and preserves a trace.
              </p>

              <ol className="mt-7 space-y-5">
                {expectedSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-100">
                        {index + 1}. {step.title}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <Separator className="my-6" />

              <p className="text-sm leading-6 text-slate-400">
                Keep the workflow local, or explicitly connect the external
                models and tools your use case needs.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild className="bg-white px-6 text-slate-900 hover:bg-slate-200">
            <TrackedLink
              href="https://doc.mirrorneuron.io/installation"
              target="_blank"
              rel="noreferrer"
              eventName="click_quickstart_docs"
              eventParams={{ location: 'quickstart' }}
            >
              Open the quickstart guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </Button>
          <Button asChild variant="secondary" className="px-6">
            <TrackedLink
              href="/blueprints"
              eventName="click_blueprints_cta"
              eventParams={{ location: 'quickstart' }}
            >
              Browse more blueprints
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </Button>
        </div>
      </div>
    </Section>
  );
}
