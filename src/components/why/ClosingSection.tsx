import ShellCommand from '@/components/ui/shell-command';
import { siteConfig } from '@/lib/site';

export function ClosingSection() {
  return (
    <section aria-labelledby="close-heading" className="mt-24">
      <h2
        id="close-heading"
        className="text-center font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl"
      >
        Try it now
      </h2>
      <div className="mx-auto mt-8 max-w-lg">
        <ShellCommand
          command={siteConfig.installCommand}
          label="Install MirrorNeuron"
          eventName="copy_install_command"
          eventParams={{ location: 'why_close' }}
          copyControl="icon"
          variant="compact"
        />
      </div>
    </section>
  );
}
