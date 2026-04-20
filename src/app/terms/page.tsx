import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Terms of Service',
  path: '/terms',
  description:
    'Terms of service for the MirrorNeuron website and public product information pages.',
  keywords: ['MirrorNeuron terms', 'website terms of service'],
});

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <div className="container mx-auto px-6 py-20 md:py-24">
        <article className="prose prose-invert prose-slate mx-auto max-w-4xl">
          <div className="not-prose mb-10">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
              Terms of Service
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Terms for the MirrorNeuron website
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              These terms cover use of the public marketing site, documentation
              links, and other public product information made available through
              the MirrorNeuron website.
            </p>
          </div>

          <h2>Use of the website</h2>
          <p>
            You may browse and use the public site for informational and
            evaluation purposes. You may not use the site in a way that damages,
            disrupts, or abuses the service.
          </p>

          <h2>Open-source software</h2>
          <p>
            The MirrorNeuron runtime itself may be distributed under a separate
            open-source license. Those license terms govern the software, while
            these terms govern the website and its public content.
          </p>

          <h2>External services and links</h2>
          <p>
            The site links to documentation, GitHub, and other third-party
            resources. Those resources are governed by their own terms and
            policies once you leave this site.
          </p>

          <h2>No warranty</h2>
          <p>
            Public website content is provided on an &quot;as is&quot; basis. Product
            information can evolve, and you should validate technical details
            against the current repository and documentation when making
            important implementation decisions.
          </p>

          <h2>Updates</h2>
          <p>
            These terms may change over time. Continued use of the site after an
            update means you accept the revised terms.
          </p>
        </article>
      </div>
    </main>
  );
}
