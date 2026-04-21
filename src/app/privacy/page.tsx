import { PageHeader, PageShell } from '@/components/ui/page-shell';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Privacy Policy',
  path: '/privacy',
  description:
    'Privacy policy for the MirrorNeuron open-source project: local and self-hosted AI workflows, no customer workflow data collection, optional website analytics, and community links.',
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
      'MirrorNeuron is a free, open-source project for running durable AI workflows and reliable agents. The public website explains the project, links to documentation and community channels, and helps people find the source code.',
      'The open-source runtime is designed for local or self-hosted use. When you run MirrorNeuron yourself, your workflows, prompts, tool calls, files, logs, and outputs stay in the environment you control.',
    ],
  },
  {
    title: 'Customer data',
    body: [
      'MirrorNeuron does not operate a hosted workflow service from this website, does not require a customer account, and does not collect customer workflow data through the open-source runtime.',
      'We do not sell personal data. We do not use your workflows, prompts, outputs, or private repository content to train AI models.',
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
      'MirrorNeuron does not maintain customer accounts on this website. Data you run through your own MirrorNeuron deployment is retained or deleted according to your own infrastructure and configuration.',
      'For website analytics or community communications, retention is controlled by the relevant website, analytics, hosting, or community provider. You can contact those providers directly where their policies provide account or deletion controls.',
    ],
  },
  {
    title: 'Changes',
    body: [
      'This policy may change as the open-source project and website evolve. Material updates should be reflected here so visitors can understand the current privacy posture before adopting the project.',
      'Last updated: April 2026.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Privacy Policy"
        title="Privacy for a free open-source project"
        description="MirrorNeuron is designed for local and self-hosted AI workflows. The project website does not collect customer workflow data, and the runtime keeps your work inside the environment you control."
      />

      <article className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-gradient-to-br from-cyan-400/10 via-slate-900/70 to-blue-500/10 p-6 ring-1 ring-cyan-300/10 md:p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Short version
          </div>
          <p className="mt-4 text-lg leading-8 text-slate-200">
            Run MirrorNeuron yourself and your agent workflows stay with you. We
            do not sell data, do not train on your workflows, and do not collect
            customer workflow data from the open-source runtime. The public site
            may use consent-based analytics and links to external community
            services.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          {policySections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl bg-slate-900/45 p-6 ring-1 ring-white/10 md:p-8"
            >
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-300">
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
