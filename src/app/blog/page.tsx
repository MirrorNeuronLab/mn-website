import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Sparkles, User } from 'lucide-react';
import { createMetadata } from '@/lib/site';

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
    <main className="relative min-h-screen overflow-hidden bg-[#020617] selection:bg-blue-500/30 selection:text-blue-200">
      <div className="pointer-events-none absolute inset-x-0 top-16 h-[34rem] bg-[radial-gradient(circle_at_28%_18%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_78%_0%,rgba(129,140,248,0.13),transparent_32%)]" />
      <div className="container relative z-10 mx-auto px-6 py-20 md:py-24">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>

        <div className="mb-10 rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.76),rgba(2,6,23,0.72))] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
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
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group grid gap-8 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.82))] p-7 shadow-[0_24px_90px_rgba(0,0,0,0.32)] transition-transform hover:-translate-y-1 lg:grid-cols-[0.82fr_1.18fr] lg:p-8"
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
              <h2 className="max-w-3xl text-3xl font-bold leading-tight text-white transition-colors group-hover:text-cyan-100 md:text-4xl">
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
          </Link>
        )}

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {morePosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex min-h-80 flex-col justify-between rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.13),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.76),rgba(2,6,23,0.68))] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-0.5"
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
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
