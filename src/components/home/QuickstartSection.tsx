import { ArrowRight, BookOpen } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ShellCommand from '@/components/ui/shell-command';
import { Section } from '@/components/ui/section';
import { siteConfig } from '@/lib/site';
import { getSortedPostsData } from '@/lib/blog';

export function QuickstartSection() {
  const posts = getSortedPostsData();
  const highlightedPost = posts[0];

  return (
    <Section id="quickstart" className="border-t border-white/[0.08]">
      <div className="mn-container">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline">Quickstart</Badge>
          <h2 className="mt-5 font-display text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f2ed] sm:text-4xl md:text-5xl">
            Give your agent a runtime.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#888781] sm:text-base">
            Start with a working blueprint, inspect the run, then replace the
            example logic with your own agent code.
          </p>
        </div>

        {/* Terminal frame */}
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#080807] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="flex h-9 items-center justify-between border-b border-white/[0.08] bg-[#11110f] px-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
            </div>
            <span className="font-mono text-[0.68rem] text-[#777671]">
              bash — mirrorneuron quickstart
            </span>
            <span className="font-mono text-[0.65rem] text-[#8bc9bc]">
              ready
            </span>
          </div>

          <div className="grid gap-4 p-4 sm:p-6">
            <ShellCommand
              command={siteConfig.installCommand}
              label="1. Install MirrorNeuron"
              eventName="copy_install_command"
              eventParams={{ location: 'quickstart' }}
              copyControl="icon"
              variant="bare"
            />
            <Separator className="bg-white/[0.08]" />
            <ShellCommand
              command="mn blueprint run demo_checkpoint_replay"
              label="2. Run a resilient blueprint"
              eventName="copy_quickstart_example_command"
              eventParams={{ location: 'quickstart' }}
              copyControl="icon"
              variant="bare"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="h-11 rounded-full bg-[#f4f2ed] px-6 text-sm font-medium text-[#151514] shadow-[0_12px_32px_rgba(255,255,255,0.08)] hover:bg-white hover:scale-[1.02] transition-all">
            <TrackedLink
              href="https://doc.mirrorneuron.io/installation"
              target="_blank"
              rel="noreferrer"
              eventName="click_quickstart_docs"
              eventParams={{ location: 'quickstart' }}
            >
              Installation guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </Button>

          <Button asChild variant="secondary" className="h-11 rounded-full border-white/15 bg-white/[0.03] px-6 text-sm hover:border-white/30 hover:bg-white/[0.08]">
            <TrackedLink
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noreferrer"
              eventName="open_github"
              eventParams={{ location: 'quickstart' }}
            >
              View on GitHub
            </TrackedLink>
          </Button>

          <Button asChild variant="secondary" className="h-11 rounded-full border-white/15 bg-white/[0.03] px-6 text-sm hover:border-white/30 hover:bg-white/[0.08]">
            <TrackedLink
              href="/blueprints"
              eventName="click_blueprints_cta"
              eventParams={{ location: 'quickstart' }}
            >
              Browse blueprints
            </TrackedLink>
          </Button>
        </div>

        {/* Highlighted Blog */}
        {highlightedPost ? (
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-[#8bc9bc]" aria-hidden="true" />
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#777671]">
                  Highlighted blog
                </span>
              </div>
              <TrackedLink
                href="/blog"
                eventName="click_blog_index_cta"
                eventParams={{ location: 'quickstart_header' }}
                className="inline-flex items-center gap-1 font-mono text-xs text-[#8bc9bc] hover:underline"
              >
                All articles
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </TrackedLink>
            </div>

            <TrackedLink
              href={`/blog/${highlightedPost.slug}`}
              eventName="click_blog_post"
              eventParams={{ location: 'quickstart_highlighted', slug: highlightedPost.slug }}
              className="group block rounded-2xl border border-white/[0.08] bg-[#11110f]/80 p-6 sm:p-7 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.2] hover:bg-[#141412] shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#777671]">
                <Badge variant="default" className="text-[0.62rem]">
                  Highlighted
                </Badge>
                <span className="font-mono">{highlightedPost.date}</span>
                <span aria-hidden="true">·</span>
                <span>{highlightedPost.author}</span>
              </div>

              <h3 className="mt-4 font-display text-xl sm:text-2xl font-normal leading-[1.25] text-[#f4f2ed] transition-colors group-hover:text-white">
                {highlightedPost.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#888781]">
                {highlightedPost.excerpt}
              </p>

              <div className="mt-6 flex flex-col gap-4 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {highlightedPost.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[0.65rem] text-[#aaa9a3]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8bc9bc] group-hover:text-[#aee2d7]">
                  <span>Read article</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </TrackedLink>

            <div className="mt-6 text-center">
              <Button asChild variant="link" className="text-xs sm:text-sm text-[#8bc9bc] hover:text-[#aee2d7]">
                <TrackedLink
                  href="/blog"
                  eventName="click_blog_index_cta"
                  eventParams={{ location: 'quickstart_footer' }}
                >
                  Explore all articles in the engineering blog
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </TrackedLink>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
