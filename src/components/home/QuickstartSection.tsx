import { ArrowRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import ShellCommand from '@/components/ui/shell-command';
import { Section } from '@/components/ui/section';
import { siteConfig } from '@/lib/site';

export function QuickstartSection() {
  return (
    <Section id="quickstart">
      <div className="mn-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white">
            Get started with MirrorNeuron
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
            Install the CLI, run a blueprint, and keep the path from first run
            to real workflow straightforward.
          </p>
        </div>
        <div className="mn-shell-panel mx-auto mt-10 grid max-w-3xl gap-4">
          <ShellCommand
            command={siteConfig.installCommand}
            label="Copy and install"
            eventName="copy_install_command"
            eventParams={{ location: 'quickstart' }}
            copyControl="icon"
            variant="bare"
          />
          <div className="h-px bg-slate-800/80" />
          <ShellCommand
            command="mn blueprint run general_test_message_flow"
            label="Run an example workflow"
            eventName="copy_quickstart_example_command"
            eventParams={{ location: 'quickstart' }}
            copyControl="icon"
            variant="bare"
          />
        </div>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <TrackedLink
            href={siteConfig.docsUrl}
            target="_blank"
            rel="noreferrer"
            eventName="click_quickstart_docs"
            eventParams={{ location: 'quickstart' }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-200"
          >
            Quickstart guide
            <ArrowRight className="h-5 w-5" />
          </TrackedLink>
          <TrackedLink
            href={siteConfig.repoUrl}
            target="_blank"
            rel="noreferrer"
            eventName="open_github"
            eventParams={{ location: 'quickstart' }}
            className="mn-secondary-action px-6 py-3"
          >
            GitHub
          </TrackedLink>
        </div>
      </div>
    </Section>
  );
}
