import { ArrowRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ShellCommand from '@/components/ui/shell-command';
import { siteConfig } from '@/lib/site';

export function ClosingSection() {
  return (
    <section aria-labelledby="close-heading" className="mt-24">
      <div className="rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#11110f] to-[#0c0c0b] p-8 sm:p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <Badge variant="outline" className="mb-4">
          Why MirrorNeuron
        </Badge>
        <h2
          id="close-heading"
          className="font-display text-3xl font-normal leading-[1.15] text-[#f4f2ed] sm:text-4xl"
        >
          Make AI flexible. Keep execution dependable.
        </h2>
        <div className="mx-auto mt-5 max-w-xl space-y-4 text-sm leading-7 text-[#888781] sm:text-base">
          <p>
            The models will keep becoming more capable and more general. We
            believe the systems using them should become more explicit about
            procedure, state, control, and execution — not less.
          </p>
          <p className="text-[#deddd8]">
            MirrorNeuron is an open-source runtime for building that layer
            on infrastructure you own.
          </p>
        </div>

        <p className="mt-8 font-display text-xl font-normal text-[#f4f2ed] sm:text-2xl">
          Run one on your machine.
        </p>

        <div className="mx-auto mt-6 max-w-lg">
          <ShellCommand
            command={siteConfig.installCommand}
            label="Install MirrorNeuron"
            eventName="copy_install_command"
            eventParams={{ location: 'why_close' }}
            copyControl="icon"
            variant="compact"
          />
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="h-11 rounded-full bg-[#f4f2ed] px-6 text-sm font-medium text-[#151514] shadow-[0_12px_32px_rgba(255,255,255,0.08)] hover:bg-white hover:scale-[1.02] transition-all">
            <TrackedLink
              href="/#quickstart"
              eventName="click_why_quickstart_close"
              eventParams={{ location: 'why_close' }}
            >
              Quickstart
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </Button>
          <Button asChild variant="secondary" className="h-11 rounded-full border-white/15 bg-white/[0.03] px-6 text-sm hover:border-white/30 hover:bg-white/[0.08]">
            <TrackedLink
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noreferrer"
              eventName="click_why_github_close"
              eventParams={{ location: 'why_close' }}
            >
              View on GitHub
            </TrackedLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
