import TrackedLink from '@/components/TrackedLink';
import { siteConfig } from '@/lib/site';

const footerGroups = [
  {
    title: 'Explore',
    links: [
      { label: 'Why MirrorNeuron', href: '/why' },
      { label: 'Blueprints', href: '/blueprints' },
      { label: 'Blog', href: '/blog' },
      { label: 'Docs', href: siteConfig.docsUrl, external: true },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: siteConfig.repoUrl, external: true },
      { label: 'Slack', href: siteConfig.slackUrl, external: true },
      { label: 'Discord', href: siteConfig.discordUrl, external: true },
      { label: 'Releases', href: siteConfig.changelogUrl, external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0c0c0b]">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-14 md:grid-cols-[1.5fr_2fr] md:py-18">
        <div>
          <div className="font-display text-2xl text-[#f4f2ed]">MirrorNeuron</div>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#777671]">
            A small, open-source runtime for deep agents that need to keep their
            place.
          </p>
          <div className="mt-8 text-xs text-[#5f5e59]">
            © {new Date().getFullYear()} {siteConfig.legalName}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[#777671]">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-[#aaa9a3]">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <TrackedLink
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noreferrer' : undefined}
                      eventName="click_footer_link"
                      eventParams={{
                        label: link.label,
                        destination: link.href,
                        external: Boolean(link.external),
                        cta_group: 'footer',
                      }}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
