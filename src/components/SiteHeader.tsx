'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import TrackedLink from '@/components/TrackedLink';
import { Button } from '@/components/ui/button';
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
  return !href.startsWith('/#') && href === pathname;
}

const communityLinks = [
  { label: 'GitHub', href: siteConfig.repoUrl },
  { label: 'Slack', href: siteConfig.slackUrl },
  { label: 'Discord', href: siteConfig.discordUrl },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0c0c0b]/94 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/mn-logo.svg"
            alt="MirrorNeuron logo"
            width={27}
            height={27}
            className="h-[1.7rem] w-[1.7rem] grayscale"
          />
          <span className="text-sm font-medium tracking-[-0.01em] text-[#f4f2ed]">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-[0.82rem] text-[#aaa9a3] lg:flex">
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
                !item.external && isActive(pathname, item.href)
                  ? 'text-white'
                  : ''
              }`}
            >
              {item.label}
            </TrackedLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden h-8 w-8 text-[#aaa9a3] hover:text-white sm:inline-flex"
          >
            <TrackedLink
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noreferrer"
              eventName="open_github"
              eventParams={{ location: 'header' }}
              aria-label="MirrorNeuron GitHub repository"
            >
              <FaGithub className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </Button>

          <Button asChild size="sm">
            <TrackedLink
              href="/#quickstart"
              eventName="click_get_started"
              eventParams={{ location: 'header' }}
            >
              Try it
            </TrackedLink>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent
              side="right"
              className="flex w-[min(23rem,calc(100vw-1rem))] flex-col overflow-y-auto border-white/10 bg-[#0c0c0b]"
            >
              <SheetHeader>
                <SheetTitle className="font-display text-2xl font-normal">
                  MirrorNeuron
                </SheetTitle>
                <SheetDescription>
                  Deep agents on infrastructure you control.
                </SheetDescription>
              </SheetHeader>

              <Separator />

              <nav className="grid text-base text-[#deddd8]">
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
                      className="border-b border-white/[0.08] py-3 transition-colors hover:text-white"
                    >
                      {item.label}
                    </TrackedLink>
                  </SheetClose>
                ))}
              </nav>

              <div>
                <div className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[#777671]">
                  Use cases
                </div>
                <div className="grid">
                  {useCaseLinks.map((item) => (
                    <SheetClose key={item.href} asChild>
                      <TrackedLink
                        href={item.href}
                        eventName="click_mobile_use_case"
                        eventParams={{ title: item.title, destination: item.href }}
                        className="border-b border-white/[0.08] py-3"
                      >
                        <div className="text-sm text-[#deddd8]">{item.title}</div>
                        <div className="mt-1 text-xs leading-5 text-[#777671]">
                          {item.description}
                        </div>
                      </TrackedLink>
                    </SheetClose>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[#777671]">
                  Community
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#aaa9a3]">
                  {communityLinks.map((item) => (
                    <TrackedLink
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      eventName="click_mobile_community"
                      eventParams={{ label: item.label, destination: item.href }}
                      className="hover:text-white"
                    >
                      {item.label}
                    </TrackedLink>
                  ))}
                </div>
              </div>

              <Button asChild className="mt-auto w-full">
                <TrackedLink
                  href="/#quickstart"
                  eventName="click_get_started"
                  eventParams={{ location: 'mobile_menu' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Try it
                </TrackedLink>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
