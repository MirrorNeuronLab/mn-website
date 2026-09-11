import { ArrowRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ShellCommand from '@/components/ui/shell-command';
import { Section } from '@/components/ui/section';
import { siteConfig } from '@/lib/site';

export function QuickstartSection() {
  return (
    <Section id="quickstart" className="border-t border-white/[0.08]">
      <div className="mn-container">
        <div className="mn-section-head">
          <Badge variant="outline">Quickstart</Badge>
          <h2 className="mn-section-title">
            Run your first workflow.
          </h2>
          <p className="mn-section-lede">
            Start from a working blueprint, inspect the execution, then replace
            the example logic with your own code.
          </p>
        </div>

        {/* Terminal frame */}
        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080807] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="flex h-9 items-center justify-between border-b border-white/[0.08] bg-[#11110f] px-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
            </div>
            <span className="font-mono text-[0.68rem] text-[#777671]">
              bash — mirrorneuron quickstart
            </span>
            <span className="font-mono text-[0.65rem] text-[#56ccf2]">
              ready
            </span>
          </div>

          <div className="grid gap-4 p-4 sm:p-6">
            <ShellCommand
              command={siteConfig.installCommand}
              label="1. Install MirrorNeuron"
              eventName="copy_install_command"
              eventParams={{ location: 'quickstart' }}
              copyControl="icon"
              variant="bare"
            />
            <Separator className="bg-white/[0.08]" />
            <ShellCommand
              command="mn blueprint run vc_assistant"
              label="2. Run a resilient blueprint"
              eventName="copy_quickstart_example_command"
              eventParams={{ location: 'quickstart' }}
              copyControl="icon"
              variant="bare"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button asChild variant="link" className="text-xs sm:text-sm text-[#56ccf2] hover:text-[#9be1fa]">
            <TrackedLink
              href="/blog"
              eventName="click_blog_index_cta"
              eventParams={{ location: 'quickstart_footer' }}
            >
              Explore all articles in the engineering blog
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </TrackedLink>
          </Button>
        </div>
      </div>
    </Section>
  );
}
