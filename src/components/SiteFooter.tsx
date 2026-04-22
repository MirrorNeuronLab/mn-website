import TrackedLink from '@/components/TrackedLink';
import { siteConfig } from '@/lib/site';

const footerLinks = [
  { label: 'Blueprints', href: '/blueprints' },
  { label: 'Blog', href: '/blog' },
  { label: 'Docs', href: siteConfig.docsUrl, external: true },
  { label: 'GitHub', href: siteConfig.repoUrl, external: true },
  { label: 'Slack', href: siteConfig.slackUrl, external: true },
  { label: 'Discord', href: siteConfig.discordUrl, external: true },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/60 bg-[#05080f]">
      <div className="container mx-auto flex min-h-28 flex-col justify-end gap-6 px-6 py-7 text-sm text-slate-500 md:min-h-36 md:flex-row md:items-end md:justify-between">
        <div>© {new Date().getFullYear()} {siteConfig.name}</div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-7 gap-y-3 md:justify-end">
          {footerLinks.map((link) => (
            <TrackedLink
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              eventName="click_footer_link"
              eventParams={{
                label: link.label,
                destination: link.href,
                external: Boolean(link.external),
              }}
              className="transition-colors hover:text-slate-200"
            >
              {link.label}
            </TrackedLink>
          ))}
        </nav>
      </div>
    </footer>
  );
}
