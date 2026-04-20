import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Privacy Policy',
  path: '/privacy',
  description:
    'Privacy policy for the MirrorNeuron website, including consent-based analytics, minimal browser storage, external links, and basic website operation.',
  keywords: ['MirrorNeuron privacy policy', 'website privacy policy'],
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <div className="container mx-auto px-6 py-20 md:py-24">
        <article className="prose prose-invert prose-slate mx-auto max-w-4xl">
          <div className="not-prose mb-10">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
              Privacy Policy
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Privacy policy for mirrorneuron.io
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              This policy describes how the MirrorNeuron website handles privacy
              for visitors. It is written to be understandable early, so search
              engines and technical buyers both get a clear picture of the site.
            </p>
          </div>

          <h2>Website operation</h2>
          <p>
            The website is designed to be accessible without requiring an
            account. The current site experience does not require visitors to
            sign in before reading product pages, use cases, or blog content.
          </p>

          <h2>Browser storage</h2>
          <p>
            The website may store limited information in your browser to remember
            interface preferences such as consent choices. This is intended to
            support site usability rather than broad behavioral tracking.
          </p>

          <h2>External links</h2>
          <p>
            The site links to external services including documentation hosted on
            a separate subdomain and the public GitHub repository. When you leave
            this site, those services operate under their own policies and terms.
          </p>

          <h2>Analytics and future updates</h2>
          <p>
            The site may use Google Analytics to understand aggregate website
            usage and improve the product website over time. Analytics should
            only run after a visitor accepts the cookie banner. If analytics,
            forms, or additional services change later, this policy should be
            updated so the public website remains accurate about what data is
            being collected and why.
          </p>

          <h2>Contact and changes</h2>
          <p>
            This policy may change as the website evolves. Material updates
            should be reflected here so visitors can review the latest version.
          </p>
        </article>
      </div>
    </main>
  );
}
