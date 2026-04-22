'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { FaDiscord, FaGithub, FaSlack } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import TrackedLink from '@/components/TrackedLink';
import { primaryNav, siteConfig, useCaseLinks } from '@/lib/site';

function isActive(pathname: string, href: string) {
  if (href.startsWith('/#')) {
    return false;
  }

  return href === pathname;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-[#0a0f1c]/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/mn-logo.svg" alt="MirrorNeuron logo" width={32} height={32} className="h-8 w-8" />
          <span className="text-lg font-bold text-white">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-400 lg:flex">
          {primaryNav.map((item) => (
            <TrackedLink
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              eventName="click_header_nav"
              eventParams={{
                label: item.label,
                destination: item.href,
                external: Boolean(item.external),
              }}
              className={`transition-colors hover:text-white ${
                !item.external && isActive(pathname, item.href) ? 'text-white' : ''
              }`}
            >
              {item.label}
            </TrackedLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <TrackedLink
            href={siteConfig.slackUrl}
            target="_blank"
            rel="noreferrer"
            eventName="join_slack"
            eventParams={{ location: 'header' }}
            className="hidden text-slate-400 transition-colors hover:text-white sm:block"
            aria-label="Join MirrorNeuron on Slack"
          >
            <FaSlack className="h-5 w-5" />
          </TrackedLink>
          <TrackedLink
            href={siteConfig.discordUrl}
            target="_blank"
            rel="noreferrer"
            eventName="join_discord"
            eventParams={{ location: 'header' }}
            className="hidden text-slate-400 transition-colors hover:text-white sm:block"
            aria-label="Join MirrorNeuron on Discord"
          >
            <FaDiscord className="h-5 w-5" />
          </TrackedLink>
          <TrackedLink
            href={siteConfig.repoUrl}
            target="_blank"
            rel="noreferrer"
            eventName="open_github"
            eventParams={{ location: 'header' }}
            className="hidden text-slate-400 transition-colors hover:text-white sm:block"
            aria-label="MirrorNeuron GitHub repository"
          >
            <FaGithub className="h-5 w-5" />
          </TrackedLink>
          <TrackedLink
            href="/#quickstart"
            eventName="click_get_started"
            eventParams={{ location: 'header' }}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
          >
            Get Started
          </TrackedLink>
          <button
            type="button"
            className="rounded-xl border border-slate-700 p-2 text-slate-300 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-800 bg-[#0d1117] lg:hidden">
          <div className="container mx-auto space-y-6 px-6 py-6">
            <nav className="flex flex-col gap-4 text-base text-slate-200">
              {primaryNav.map((item) => (
                <TrackedLink
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  eventName="click_mobile_nav"
                  eventParams={{
                    label: item.label,
                    destination: item.href,
                    external: Boolean(item.external),
                  }}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </TrackedLink>
              ))}
            </nav>

            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Blueprints
              </div>
              <div className="space-y-3">
                <TrackedLink
                  href="/blueprints"
                  eventName="click_mobile_blueprints"
                  eventParams={{ location: 'mobile_menu' }}
                  className="block rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3"
                >
                  <div className="font-medium text-white">Browse all blueprints</div>
                  <div className="mt-1 text-sm text-cyan-100/80">
                    Search by category, tags, and recently updated workflows
                  </div>
                </TrackedLink>
                {useCaseLinks.map((item) => (
                  <TrackedLink
                    key={item.href}
                    href={item.href}
                    eventName="click_mobile_use_case"
                    eventParams={{
                      title: item.title,
                      destination: item.href,
                    }}
                    className="block rounded-2xl border border-slate-800 bg-[#0a0f1c] px-4 py-3"
                  >
                    <div className="font-medium text-white">{item.title}</div>
                    <div className="mt-1 text-sm text-slate-400">{item.description}</div>
                  </TrackedLink>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Community
              </div>
              <div className="flex items-center gap-5 text-slate-300">
                <TrackedLink
                  href={siteConfig.slackUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventName="join_slack"
                  eventParams={{ location: 'mobile_menu' }}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <FaSlack className="h-5 w-5" />
                  Slack
                </TrackedLink>
                <TrackedLink
                  href={siteConfig.discordUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventName="join_discord"
                  eventParams={{ location: 'mobile_menu' }}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <FaDiscord className="h-5 w-5" />
                  Discord
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
