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
          <Badge variant="outline">Start locally</Badge>
          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-white md:text-3xl">
            Install once. Run one complete workflow.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            Install MirrorNeuron, launch a ready-made workflow, and inspect the
            result before changing any code.
          </p>
        </div>

        <Card
          variant="plain"
          className="mx-auto mt-8 grid max-w-3xl gap-4 rounded-3xl border-mn-shell-border bg-mn-shell-surface p-4 sm:p-5"
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
            label="2. Run a complete workflow"
            eventName="copy_quickstart_example_command"
            eventParams={{ location: 'quickstart' }}
            copyControl="icon"
            variant="bare"
          />
        </Card>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="bg-white px-5 text-slate-900 hover:bg-slate-200">
            <TrackedLink
              href="https://doc.mirrorneuron.io/installation"
              target="_blank"
              rel="noreferrer"
              eventName="click_quickstart_docs"
              eventParams={{ location: 'quickstart' }}
            >
              Read the installation guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </Button>
          <Button asChild variant="secondary" className="px-5">
            <TrackedLink
              href="/blueprints"
              eventName="click_blueprints_cta"
              eventParams={{ location: 'quickstart' }}
            >
              Choose a blueprint
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </Button>
        </div>
      </div>
    </Section>
  );
}
