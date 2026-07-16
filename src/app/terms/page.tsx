import Link from 'next/link';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import { Badge } from '@/components/ui/badge';
import { createMetadata, siteConfig } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Terms of Service',
  path: '/terms',
  description:
    'Terms for the MirrorNeuron open-source project website and software, including responsible use, the MIT license, no hosted-service obligation, no warranty, and no SLA.',
  keywords: [
    'MirrorNeuron terms',
    'open source AI workflow terms',
    'MIT license AI runtime',
    'durable AI workflow terms',
  ],
});

const termSections = [
  {
    title: 'Project scope',
    body: [
      `${siteConfig.legalName} maintains MirrorNeuron as a free, open-source project. These terms cover the public website, project information, documentation links, examples, blueprints, and community-facing materials.`,
      'The open-source software itself is governed by the license published in the repository. If these terms conflict with the open-source license for the software, the open-source license controls your use, copying, modification, and distribution of that software.',
    ],
  },
  {
    title: 'Use responsibly',
    body: [
      'You may use the public site and project materials for lawful evaluation, development, research, and community participation.',
      'Do not use the website, repository, examples, or community channels to violate laws, harm others, infringe rights, attack systems, distribute malware, abuse infrastructure, or misrepresent the project.',
    ],
  },
  {
    title: 'Your workflows and outputs',
    body: [
      'You are responsible for the agents, tools, workflows, prompts, files, credentials, deployments, and outputs you create or run with MirrorNeuron.',
      'MirrorNeuron does not claim ownership of your workflows or outputs. You should review generated results, tool actions, and automated decisions before relying on them, especially in sensitive, regulated, financial, medical, scientific, or operational contexts.',
    ],
  },
  {
    title: 'No hosted-service promise',
    body: [
      `This website does not create a paid customer relationship with ${siteConfig.legalName}, managed workflow service, support contract, uptime commitment, security commitment, maintenance commitment, compatibility promise, roadmap obligation, or service-level agreement.`,
      'Community help, documentation, examples, releases, and issue responses may be provided when maintainers choose to provide them, but they are not guaranteed.',
    ],
  },
  {
    title: 'No warranty or quality obligation',
    body: [
      'The website, software, examples, documentation, and blueprints are provided as is and as available, without warranties of any kind to the maximum extent permitted by law.',
      'There is no obligation to ensure quality, correctness, accuracy, reliability, security, fitness for a particular purpose, uninterrupted operation, bug fixes, data recovery, or production readiness unless separately agreed in writing.',
    ],
  },
  {
    title: 'Third-party services',
    body: [
      'MirrorNeuron may link to or integrate with third-party services such as GitHub, Slack, Discord, documentation hosting, model providers, package registries, cloud services, or tools you connect yourself.',
      'Those services are governed by their own terms and privacy policies. You are responsible for reviewing and configuring third-party services before connecting them to your workflows.',
    ],
  },
  {
    title: 'Limitation of liability',
    body: [
      `To the maximum extent permitted by law, ${siteConfig.legalName}, project maintainers, and contributors are not liable for indirect, incidental, special, consequential, punitive, exemplary, or business losses, including lost profits, lost revenue, lost data, workflow failures, downtime, security incidents, or reliance on AI-generated output.`,
      'Because MirrorNeuron is offered as a free open-source project, your use of the project is at your own risk unless a separate written agreement says otherwise.',
    ],
  },
  {
    title: 'Changes',
    body: [
      'These terms may change as the project, website, or community practices evolve. Continued use of the site or project materials after an update means you accept the revised terms for future use.',
      'Last updated: May 2026.',
    ],
  },
];

export default function TermsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Terms of Service"
        title="Terms for an open-source runtime."
        description="Use MirrorNeuron responsibly, keep ownership of what you build, and understand that the public project comes without a hosted-service promise or production SLA."
      />

      <article className="max-w-3xl">
        <section className="border-y border-white/[0.1] py-7">
          <Badge>Short version</Badge>
          <p className="mt-4 font-display text-2xl leading-8 text-[#deddd8]">
            MirrorNeuron is free and open source. Use it legally, verify what
            your agents do, and treat the project materials as provided without
            warranty by {siteConfig.legalName}. The software license in the{' '}
            <Link
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[#8bc9bc] hover:text-[#b4ded5]"
            >
              GitHub repository
            </Link>{' '}
            governs the open-source code.
          </p>
        </section>

        <div className="mt-14 border-t border-white/[0.1]">
          {termSections.map((section) => (
            <section key={section.title} className="border-b border-white/[0.1] py-8">
              <h2 className="font-display text-2xl font-normal text-[#f4f2ed]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[#aaa9a3]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-8 text-sm leading-7 text-[#777671]">
          Privacy details are available in the{' '}
          <Link href="/privacy" className="font-medium text-[#aaa9a3] hover:text-white">
            MirrorNeuron Privacy Policy
          </Link>
          .
        </p>
      </article>
    </PageShell>
  );
}
