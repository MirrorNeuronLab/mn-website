import { getSortedPostsData } from '@/lib/blog';
import { ArrowRight, BookOpen, Calendar, Sparkles, User } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { createMetadata } from '@/lib/site';
import { PageHeader, PageShell } from '@/components/ui/page-shell';

export const metadata = createMetadata({
  title: 'Blog',
  path: '/blog',
  description:
    'MirrorNeuron blog posts about durable AI workflows, long-running agents, background workers, and practical alternatives to heavier orchestration systems.',
  keywords: ['AI workflow blog', 'durable AI workflows blog', 'Temporal alternative blog'],
});

export default function BlogIndex() {
  const posts = getSortedPostsData();
  const [featuredPost, ...morePosts] = posts;
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();

  return (
    <PageShell>
        <PageHeader
          title="MirrorNeuron blog"
        />

        <div className="mn-page-panel mb-10 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
              <Sparkles className="h-4 w-4" />
              Explore by topic
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {featuredPost && (
          <TrackedLink
            href={`/blog/${featuredPost.slug}`}
            eventName="open_blog_post"
            eventParams={{
              location: 'featured_blog_card',
              post_slug: featuredPost.slug,
              post_title: featuredPost.title,
            }}
            className="mn-gradient-card-featured group grid gap-8 lg:grid-cols-[0.82fr_1.18fr]"
          >
            <div className="flex min-h-72 flex-col justify-between rounded-3xl bg-[#05080f]/70 p-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-cyan-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                  <BookOpen className="h-3.5 w-3.5" />
                  Featured
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {featuredPost.date}
                </span>
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" /> {featuredPost.author}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="max-w-3xl text-2xl font-bold leading-tight text-white transition-colors group-hover:text-cyan-100 md:text-3xl">
                {featuredPost.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                {featuredPost.excerpt}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 font-semibold text-cyan-300">
                Read the article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </TrackedLink>
        )}

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {morePosts.map((post) => (
            <TrackedLink
              key={post.slug}
              href={`/blog/${post.slug}`}
              eventName="open_blog_post"
              eventParams={{
                location: 'blog_card',
                post_slug: post.slug,
                post_title: post.title,
              }}
              className="mn-gradient-card group flex min-h-80 flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mt-6 text-2xl font-bold leading-8 text-white transition-colors group-hover:text-cyan-100">
                  {post.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {post.date}
                </span>
                <span className="inline-flex items-center gap-2 font-semibold text-cyan-300">
                  Read more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </TrackedLink>
          ))}
        </div>
    </PageShell>
  );
}
