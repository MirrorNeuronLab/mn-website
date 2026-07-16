import { ArrowRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ShellCommand from '@/components/ui/shell-command';
import { Section } from '@/components/ui/section';
import { siteConfig } from '@/lib/site';

const blueprintCommand = 'mn blueprint run vc_assistant';

export function QuickstartSection() {
  return (
    <Section id="quickstart" className="border-t border-white/[0.08]">
      <div className="mn-container">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline">Start locally</Badge>
          <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] tracking-[-0.025em] text-[#f4f2ed] md:text-5xl">
            Two commands to see it work.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#888781]">
            Install the runtime, launch a complete workflow, then inspect and
            change the code at your own pace.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 rounded-xl border border-white/10 bg-[#080807] p-4 sm:p-5">
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
            label="2. Run a blueprint"
            eventName="copy_quickstart_example_command"
            eventParams={{ location: 'quickstart' }}
            copyControl="icon"
            variant="bare"
          />
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <TrackedLink
              href="https://doc.mirrorneuron.io/installation"
              target="_blank"
              rel="noreferrer"
              eventName="click_quickstart_docs"
              eventParams={{ location: 'quickstart' }}
            >
              Installation guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </Button>
          <Button asChild variant="ghost">
            <TrackedLink
              href="/blueprints"
              eventName="click_blueprints_cta"
              eventParams={{ location: 'quickstart' }}
            >
              Browse blueprints
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </Button>
        </div>
      </div>
    </Section>
  );
}
