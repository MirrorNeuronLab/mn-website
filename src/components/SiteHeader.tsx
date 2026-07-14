'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { FaDiscord, FaGithub, FaSlack } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
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
                key_action: item.label === 'Docs',
                cta_group: 'primary_nav',
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
          <Button asChild size="sm" className="bg-white text-slate-900 hover:bg-slate-200">
            <TrackedLink
              href="/#quickstart"
              eventName="click_get_started"
              eventParams={{ location: 'header' }}
            >
              Quickstart
            </TrackedLink>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent side="right" className="flex w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-y-auto">
              <SheetHeader>
                <SheetTitle>MirrorNeuron</SheetTitle>
                <SheetDescription>
                  Durable execution for AI workflows, without orchestration ceremony.
                </SheetDescription>
              </SheetHeader>

              <Separator />

              <nav className="grid gap-2 text-base text-slate-200">
                {primaryNav.map((item) => (
                  <SheetClose key={item.label} asChild>
                    <TrackedLink
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer' : undefined}
                      eventName="click_mobile_nav"
                      eventParams={{
                        label: item.label,
                        destination: item.href,
                        external: Boolean(item.external),
                        key_action: item.label === 'Docs',
                        cta_group: 'mobile_nav',
                      }}
                      className="rounded-xl px-3 py-2 transition-colors hover:bg-slate-900 hover:text-white"
                    >
                      {item.label}
                    </TrackedLink>
                  </SheetClose>
                ))}
              </nav>

              <div>
                <Badge variant="outline" className="mb-3">
                  Blueprints
                </Badge>
                <div className="space-y-3">
                  <SheetClose asChild>
                    <TrackedLink
                      href="/blueprints"
                      eventName="click_mobile_blueprints"
                      eventParams={{ location: 'mobile_menu' }}
                      className="block rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 transition-colors hover:border-cyan-300/40"
                    >
                      <div className="font-medium text-white">Browse all blueprints</div>
                      <div className="mt-1 text-sm text-cyan-100/80">
                        Search by category, tags, and recently updated workflows
                      </div>
                    </TrackedLink>
                  </SheetClose>
                  {useCaseLinks.map((item) => (
                    <SheetClose key={item.href} asChild>
                      <TrackedLink
                        href={item.href}
                        eventName="click_mobile_use_case"
                        eventParams={{
                          title: item.title,
                          destination: item.href,
                        }}
                        className="block"
                      >
                        <Card variant="plain" className="p-4 transition-colors hover:border-cyan-400/30">
                          <div className="font-medium text-white">{item.title}</div>
                          <div className="mt-1 text-sm text-slate-400">{item.description}</div>
                        </Card>
                      </TrackedLink>
                    </SheetClose>
                  ))}
                </div>
              </div>

              <Button asChild size="lg" className="w-full bg-white text-slate-950 hover:bg-slate-200">
                <TrackedLink
                  href="/#quickstart"
                  eventName="click_get_started"
                  eventParams={{ location: 'mobile_menu' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Quickstart
                </TrackedLink>
              </Button>

              <div>
                <Badge variant="outline" className="mb-3">
                  Community
                </Badge>
                <div className="flex flex-wrap items-center gap-3 text-slate-300">
                  <SheetClose asChild>
                    <TrackedLink
                      href={siteConfig.slackUrl}
                      target="_blank"
                      rel="noreferrer"
                      eventName="join_slack"
                      eventParams={{ location: 'mobile_menu' }}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-800 px-3 py-2 transition-colors hover:border-slate-600 hover:text-white"
                    >
                      <FaSlack className="h-5 w-5" />
                      Slack
                    </TrackedLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <TrackedLink
                      href={siteConfig.discordUrl}
                      target="_blank"
                      rel="noreferrer"
                      eventName="join_discord"
                      eventParams={{ location: 'mobile_menu' }}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-800 px-3 py-2 transition-colors hover:border-slate-600 hover:text-white"
                    >
                      <FaDiscord className="h-5 w-5" />
                      Discord
                    </TrackedLink>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
