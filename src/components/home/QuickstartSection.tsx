import { ArrowRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ShellCommand from '@/components/ui/shell-command';
import { Section } from '@/components/ui/section';
import { siteConfig } from '@/lib/site';

const blueprintCommand = 'mn blueprint run vc_assistant';

export function QuickstartSection() {
  return (
    <Section id="quickstart">
      <div className="mn-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline">Quickstart</Badge>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
            Your first AI workflow in five minutes.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
            No orchestration setup. No model installation to manage. Install
            MirrorNeuron, run a complete workflow locally, and inspect the
            result before writing your own code.
          </p>
        </div>

        <Card
          variant="plain"
          className="mx-auto mt-10 grid max-w-3xl gap-4 rounded-3xl border-mn-shell-border bg-mn-shell-surface p-4 sm:p-5"
        >
          <ShellCommand
            command={siteConfig.installCommand}
            label="1. Install MirrorNeuron"
            eventName="copy_install_command"
            eventParams={{ location: 'quickstart' }}
            copyControl="icon"
            variant="bare"
          />
          <Separator />
          <ShellCommand
            command={blueprintCommand}
            label="2. Run a ready-to-use workflow"
            eventName="copy_quickstart_example_command"
            eventParams={{ location: 'quickstart' }}
            copyControl="icon"
            variant="bare"
          />
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
