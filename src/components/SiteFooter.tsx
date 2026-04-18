import Link from 'next/link';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { primaryNav, siteConfig, useCaseLinks } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#05080f] py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="mb-5 flex items-center gap-2">
              <Image
                src="/mn-logo.svg"
                alt="MirrorNeuron logo"
                width={32}
                height={32}
                className="h-8 w-8 grayscale opacity-80"
              />
              <span className="text-lg font-bold text-white">{siteConfig.name}</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Open-source runtime for durable AI workflows, long-running agents, and
              background workers without heavyweight orchestration overhead.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <Link
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition-colors hover:text-white"
                aria-label="MirrorNeuron GitHub repository"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-semibold text-white">Product</h2>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/#comparison" className="transition-colors hover:text-white">
                  Why Simpler
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition-colors hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/security" className="transition-colors hover:text-white">
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.changelogUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-semibold text-white">Use Cases</h2>
            <ul className="space-y-3 text-sm text-slate-400">
              {useCaseLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-semibold text-white">Developers & Trust</h2>
            <ul className="space-y-3 text-sm text-slate-400">
              {primaryNav
                .filter((item) => item.label === 'Docs' || item.label === 'Blog')
                .map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer' : undefined}
                      className="transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/privacy" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800/70 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} {siteConfig.name}. Released under the MIT License.</div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            Indexable, self-hostable, and ready for long-running workflows
          </div>
        </div>
      </div>
    </footer>
  );
}
