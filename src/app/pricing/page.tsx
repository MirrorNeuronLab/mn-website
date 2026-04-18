import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { createMetadata, siteConfig } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Pricing',
  path: '/pricing',
  description:
    'MirrorNeuron pricing for open-source, self-hosted durable AI workflows. Start free under MIT, then evaluate rollout and support options for larger teams.',
  keywords: ['MirrorNeuron pricing', 'open-source workflow runtime pricing', 'self-hosted AI runtime pricing'],
});

const plans = [
  {
    name: 'Open Source',
    price: 'Free',
    description:
      'Start with the MIT-licensed runtime, self-host on your infrastructure, and build durable AI workflows without paying for a hosted control plane first.',
    bullets: [
      'Core runtime under MIT',
      'Python and TypeScript workflow authoring',
      'Local, cloud, or hybrid deployment',
      'GitHub repository and public documentation',
    ],
    cta: {
      href: siteConfig.repoUrl,
      label: 'Explore GitHub',
      external: true,
    },
  },
  {
    name: 'Team Rollout',
    price: 'Self-hosted',
    description:
      'Good for engineering teams replacing ad hoc agent runners, serverless glue, or heavier workflow tooling with a simpler durable runtime.',
    bullets: [
      'Keep infrastructure in your environment',
      'Use public docs and blueprints to accelerate adoption',
      'Fit private or regulated deployment requirements',
      'Avoid premature workflow-platform complexity',
    ],
    cta: {
      href: siteConfig.docsUrl,
      label: 'Read the docs',
      external: true,
    },
  },
  {
    name: 'Enterprise Support',
    price: 'Custom',
    description:
      'For larger security reviews, rollout planning, and internal platform adoption, larger teams may want a custom support path around the open-source core.',
    bullets: [
      'Architecture and rollout guidance',
      'Security and deployment reviews',
      'Internal enablement for long-running AI workflows',
      'Aligned with self-hosted and hybrid environments',
    ],
    cta: {
      href: '/security',
      label: 'Review security',
      external: false,
    },
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <div className="container mx-auto px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
            Pricing
          </div>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Open-source first pricing for durable AI workflows
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            MirrorNeuron is designed to be easy to adopt early: start with the
            open-source runtime, self-host it on your own infrastructure, and
            move toward larger rollout plans only when you need them.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="rounded-3xl border border-slate-800 bg-[#0a0f1c] p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                {plan.name}
              </div>
              <div className="mt-5 text-4xl font-bold text-white">{plan.price}</div>
              <p className="mt-5 text-base leading-8 text-slate-300">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {plan.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.cta.href}
                target={plan.cta.external ? '_blank' : undefined}
                rel={plan.cta.external ? 'noreferrer' : undefined}
                className="mt-8 inline-flex items-center gap-2 font-semibold text-cyan-300"
              >
                {plan.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-slate-800 bg-slate-900/50 p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white">What pricing is really signaling here</h2>
          <p className="mt-4 max-w-4xl text-slate-300 leading-8">
            MirrorNeuron is not trying to force teams into a heavyweight hosted
            workflow product before they even know the runtime fits. The site now
            makes that clear: start free, prove value quickly, and scale your
            rollout only when the workflow itself is working.
          </p>
        </div>
      </div>
    </main>
  );
}
