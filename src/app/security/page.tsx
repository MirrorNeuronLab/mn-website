import Link from 'next/link';
import { createMetadata, siteConfig } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Security',
  path: '/security',
  description:
    'MirrorNeuron security overview for teams evaluating a simple self-hosted runtime for durable AI workflows, long-running agents, and private deployment.',
  keywords: ['MirrorNeuron security', 'self-hosted AI workflow security', 'private AI orchestration'],
});

const sections = [
  {
    title: 'Private deployment is part of the product story',
    body:
      'MirrorNeuron is positioned for local, on-edge, cloud, and hybrid deployment. That matters for teams comparing secure self-hosted AI workflow runtimes or looking for a Temporal alternative that keeps more control in-house.',
  },
  {
    title: 'Bounded execution matters',
    body:
      'The public product story emphasizes bounded sandbox execution and durable state recovery. For AI agents and autonomous workers, that is a more credible security posture than pretending long-lived automation should run with broad, unmanaged access.',
  },
  {
    title: 'Durability reduces operational risk',
    body:
      'Security is not just about isolation. Durable state, retry semantics, and workflow recovery reduce the number of ad hoc scripts, manual reruns, and opaque failure cases teams need to manage around production workflows.',
  },
  {
    title: 'Trust pages should match the product promise',
    body:
      'This site now includes dedicated pricing, privacy, security, and terms pages so technical buyers can evaluate MirrorNeuron earlier and with fewer trust gaps.',
  },
];

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <div className="container mx-auto px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-300">
            Security
          </div>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Security posture for a simple, self-hosted AI workflow runtime
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            MirrorNeuron is designed for teams that care about privacy,
            deployment control, and durable execution. This page summarizes the
            security-oriented product principles visible in the public project and
            website. It is meant as an architectural overview, not a compliance
            certification statement.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded-3xl border border-slate-800 bg-[#0a0f1c] p-8">
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
          <h2 className="text-2xl font-bold text-white">Deployment guidance</h2>
          <p className="mt-4 max-w-4xl text-slate-300 leading-8">
            Teams evaluating MirrorNeuron for sensitive workloads should review
            their own infrastructure, access controls, secrets handling, and
            deployment boundaries. The public site supports that evaluation by
            clearly positioning MirrorNeuron as a runtime that can stay within
            your own environment instead of pushing you toward a mandatory hosted
            control plane.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link
              href={siteConfig.docsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-200"
            >
              Read the docs
            </Link>
            <Link
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-5 py-3 font-semibold text-white transition-colors hover:border-slate-500 hover:bg-slate-900/50"
            >
              Review the repository
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
