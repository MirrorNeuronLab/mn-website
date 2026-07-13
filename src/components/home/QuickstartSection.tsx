import { ArrowRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ShellCommand from '@/components/ui/shell-command';
import { Section } from '@/components/ui/section';
import SdkCodeTabs from '@/components/home/SdkCodeTabs';
import { siteConfig } from '@/lib/site';

const adoptionSteps = [
  'Install the CLI on your machine.',
  'Run a complete blueprint with one command.',
  'Replace the example inputs with your agents, tools, and data.',
];

export function QuickstartSection() {
  return (
    <Section id="quickstart">
      <div className="mn-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white">
            Go from install to a running workflow in minutes.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
            Start with a working blueprint, inspect how it runs, then adapt the
            code instead of designing an orchestration system first.
          </p>
        </div>
        <Card variant="plain" className="mx-auto mt-10 grid max-w-3xl gap-4 rounded-xl border-mn-shell-border bg-mn-shell-surface p-4">
          <ShellCommand
            command={siteConfig.installCommand}
            label="Copy and install"
            eventName="copy_install_command"
            eventParams={{ location: 'quickstart' }}
            copyControl="icon"
            variant="bare"
          />
          <Separator />
          <ShellCommand
            command="mn blueprint run drug_discovery_simulation"
            label="Run the drug discovery blueprint"
            eventName="copy_quickstart_example_command"
            eventParams={{ location: 'quickstart' }}
            copyControl="icon"
            variant="bare"
          />
        </Card>
        <div className="mx-auto mt-6 grid max-w-3xl gap-3 text-sm leading-7 text-slate-300 md:grid-cols-3">
          {adoptionSteps.map((step, index) => (
            <Card
              key={step}
              variant="plain"
              className="rounded-2xl bg-slate-950/45 p-4"
            >
              <Badge variant="outline">Step {index + 1}</Badge>
              <p className="mt-2">{step}</p>
            </Card>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-5xl">
          <SdkCodeTabs />
        </div>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild className="bg-white px-6 py-3 text-slate-900 hover:bg-slate-200">
            <TrackedLink
              href="https://doc.mirrorneuron.io/installation"
              target="_blank"
              rel="noreferrer"
              eventName="click_quickstart_docs"
              eventParams={{ location: 'quickstart' }}
            >
              Quickstart guide
              <ArrowRight className="h-5 w-5" />
            </TrackedLink>
          </Button>
          <Button asChild variant="secondary" className="px-6 py-3">
            <TrackedLink
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noreferrer"
              eventName="open_github"
              eventParams={{ location: 'quickstart' }}
            >
              GitHub
            </TrackedLink>
          </Button>
        </div>
      </div>
    </Section>
  );
}
