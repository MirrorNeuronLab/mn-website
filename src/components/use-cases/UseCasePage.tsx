import { ArrowRight, ArrowUpRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import ShellCommand from '@/components/ui/shell-command';
import { siteConfig } from '@/lib/site';

type Capability = {
  title: string;
  text: string;
};

type BlueprintLink = {
  title: string;
  text: string;
  href: string;
  slug: string;
};

type UseCasePageProps = {
  eventKey: string;
  eyebrow: string;
  title: string;
  description: string;
  challengeTitle: string;
  challenge: string[];
  capabilities: Capability[];
  blueprintsTitle: string;
  blueprints: BlueprintLink[];
  closingTitle: string;
  closingText: string;
  command?: {
    value: string;
    label: string;
    title: string;
    text: string;
  };
};

export default function UseCasePage({
  eventKey,
  eyebrow,
  title,
  description,
  challengeTitle,
  challenge,
  capabilities,
  blueprintsTitle,
  blueprints,
  closingTitle,
  closingText,
  command,
}: UseCasePageProps) {
  return (
    <PageShell>
      <PageHeader
        backHref="/blueprints"
        backLabel="Back to Blueprints"
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      {command ? (
        <section className="grid gap-7 border-y border-white/[0.1] py-7 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12">
          <div>
            <Badge>Runnable example</Badge>
            <h2 className="mt-4 font-display text-3xl font-normal leading-tight text-[#f4f2ed]">
              {command.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#888781]">
              {command.text}
            </p>
          </div>
          <ShellCommand
            command={command.value}
            label={command.label}
            eventName={`copy_${eventKey}_blueprint_command`}
            eventParams={{ location: `${eventKey}_use_case` }}
            variant="compact"
          />
        </section>
      ) : null}

      <section className="mt-20 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div>
          <Badge variant="outline">The lifecycle</Badge>
          <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] text-[#f4f2ed]">
            {challengeTitle}
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[#888781]">
            {challenge.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[0.66rem] font-medium uppercase tracking-[0.18em] text-[#777671]">
            What MirrorNeuron handles
          </div>
          <ol className="mt-4 border-t border-white/[0.12]">
            {capabilities.map((capability, index) => (
              <li
                key={capability.title}
                className="grid gap-3 border-b border-white/[0.1] py-6 sm:grid-cols-[2.5rem_1fr] sm:gap-5"
              >
                <span className="font-mono text-[0.68rem] text-[#66655f]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-sm font-medium text-[#f4f2ed]">
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#888781]">
                    {capability.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-24" aria-labelledby={`${eventKey}-blueprints`}>
        <Badge variant="outline">Blueprints</Badge>
        <h2
          id={`${eventKey}-blueprints`}
          className="mt-5 max-w-2xl font-display text-4xl font-normal leading-[1.08] text-[#f4f2ed]"
        >
          {blueprintsTitle}
        </h2>

        <div className="mt-10 border-t border-white/[0.12]">
          {blueprints.map((blueprint) => (
            <TrackedLink
              key={blueprint.slug}
              href={blueprint.href}
              target="_blank"
              rel="noreferrer"
              eventName="open_featured_blueprint"
              eventParams={{
                location: `${eventKey}_use_case`,
                blueprint: blueprint.slug,
              }}
              className="group grid gap-4 border-b border-white/[0.1] py-7 md:grid-cols-[0.8fr_1.2fr_auto] md:items-start md:gap-8"
            >
              <h3 className="font-display text-2xl font-normal leading-tight text-[#f4f2ed]">
                {blueprint.title}
              </h3>
              <p className="text-sm leading-6 text-[#888781]">{blueprint.text}</p>
              <ArrowUpRight className="h-4 w-4 text-[#66655f] transition-colors group-hover:text-[#8bc9bc]" />
            </TrackedLink>
          ))}
        </div>
      </section>

      <section className="mt-24 border-t border-white/[0.12] pt-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-normal leading-[1.08] text-[#f4f2ed]">
              {closingTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#888781]">
              {closingText}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Button asChild>
              <TrackedLink
                href={siteConfig.docsUrl}
                target="_blank"
                rel="noreferrer"
                eventName="click_use_case_docs"
                eventParams={{ use_case: eventKey }}
              >
                Read the docs
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </Button>
            <Button asChild variant="ghost">
              <TrackedLink
                href="/why"
                eventName="click_use_case_why"
                eventParams={{ use_case: eventKey }}
              >
                Why MirrorNeuron
              </TrackedLink>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
