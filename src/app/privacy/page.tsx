import { PageHeader, PageShell } from '@/components/ui/page-shell';
import { Badge } from '@/components/ui/badge';
import { createMetadata, siteConfig } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Privacy Policy',
  path: '/privacy',
  description:
    'Privacy policy for the MirrorNeuron open-source project, including self-hosted workflow data, optional website analytics, and external community services.',
  keywords: [
    'MirrorNeuron privacy policy',
    'open source AI workflow privacy',
    'self-hosted AI workflows privacy',
    'local AI workflow runtime privacy',
  ],
});

const policySections = [
  {
    title: 'What MirrorNeuron is',
    body: [
      `${siteConfig.legalName} maintains MirrorNeuron as a free, open-source project for running durable AI workflows and reliable agents. The public website explains the project, links to documentation and community channels, and helps people find the source code.`,
      'The open-source runtime is designed for local and self-hosted deployment. When you run MirrorNeuron yourself, workflow data is handled by the infrastructure, model providers, tools, and services you choose to configure; it is not sent to this project website.',
    ],
  },
  {
    title: 'Customer data',
    body: [
      `${siteConfig.legalName} does not operate a hosted workflow service from this website, does not require a customer account, and does not collect customer workflow data through the open-source runtime.`,
      `${siteConfig.legalName} does not sell personal data. We do not use your workflows, prompts, outputs, or private repository content to train AI models.`,
    ],
  },
  {
    title: 'Website data',
    body: [
      'You can browse the public website without creating an account. The site may receive ordinary technical information that browsers and hosting providers handle, such as IP address, browser type, device information, pages requested, referrer, and timestamps.',
      'If you accept the cookie banner, the site may load Google Analytics to understand aggregate traffic and improve the project website. If you decline, analytics should not load. The site may store your cookie choice in your browser so it can remember your preference.',
    ],
  },
  {
    title: 'Community and external services',
    body: [
      'The site links to GitHub, documentation, Slack, Discord, and other community resources. If you choose to use those services, their own privacy policies and terms apply.',
      'If you voluntarily contact the project, open an issue, join a community channel, or send feedback, the information you share may be visible to maintainers or the public depending on where you post it.',
    ],
  },
  {
    title: 'Security and self-hosting',
    body: [
      'Self-hosting lets you keep MirrorNeuron inside your own data governance boundary. You are responsible for how you configure, deploy, secure, monitor, and operate your own runtime, infrastructure, credentials, and connected tools.',
      'Because this is an open-source project, you should review the code, documentation, dependencies, and deployment configuration before using it with sensitive or production data.',
    ],
  },
  {
    title: 'Retention and deletion',
    body: [
      `${siteConfig.legalName} does not maintain customer accounts on this website. Data you run through your own MirrorNeuron deployment is retained or deleted according to your own infrastructure and configuration.`,
      'For website analytics or community communications, retention is controlled by the relevant website, analytics, hosting, or community provider. You can contact those providers directly where their policies provide account or deletion controls.',
    ],
  },
  {
    title: 'Changes',
    body: [
      'This policy may change as the open-source project and website evolve. Material updates should be reflected here so visitors can understand the current privacy posture before adopting the project.',
      'Last updated: May 2026.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Privacy Policy"
        title="Your workflows stay with your runtime."
        description="MirrorNeuron is designed for infrastructure you control. This website does not receive data from self-hosted workflows; data handling depends on the models, tools, and services you connect."
      />

      <article className="max-w-3xl">
        <section className="border-y border-white/[0.1] py-7">
          <Badge>Short version</Badge>
          <p className="mt-4 font-display text-2xl leading-8 text-[#deddd8]">
            The project website does not collect data from your self-hosted
            workflows. We do not sell personal data or train models on your
            workflows. The public site may use consent-based analytics and links
            to external services with their own privacy policies.
          </p>
        </section>

        <div className="mt-14 border-t border-white/[0.1]">
          {policySections.map((section) => (
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
      </article>
    </PageShell>
  );
}
