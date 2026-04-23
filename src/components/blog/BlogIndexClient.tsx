'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, BookOpen, Calendar, FolderOpen, User } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { trackEvent } from '@/lib/analytics';
import type { BlogPostMeta } from '@/lib/blog';

type BlogIndexClientProps = {
  featuredPost?: BlogPostMeta;
  posts: BlogPostMeta[];
};

const topicOrder = ['AI', 'Engineering', 'Reliability', 'Security', 'Product'];
const postsPerPage = 10;

export default function BlogIndexClient({
  featuredPost,
  posts,
}: BlogIndexClientProps) {
  const [activeTag, setActiveTag] = useState('All');
  const [visibleCount, setVisibleCount] = useState(postsPerPage);
  const tags = topicOrder.filter((tag) =>
    posts.some((post) => post.tags.includes(tag)),
  );
  const topicOptions = ['All', ...tags].map((tag) => ({
    tag,
    count:
      tag === 'All'
        ? posts.length
        : posts.filter((post) => post.tags.includes(tag)).length,
  }));
  const filteredPosts =
    activeTag === 'All'
      ? posts
      : posts.filter((post) => post.tags.includes(activeTag));
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < filteredPosts.length;

  function selectTag(tag: string) {
    setActiveTag(tag);
    setVisibleCount(postsPerPage);
    trackEvent('filter_blog_posts', {
      tag,
      results_count:
        tag === 'All'
          ? posts.length
          : posts.filter((post) => post.tags.includes(tag)).length,
    });
  }

  function loadMorePosts() {
    const nextVisibleCount = Math.min(
      visibleCount + postsPerPage,
      filteredPosts.length,
    );

    setVisibleCount(nextVisibleCount);
    trackEvent('load_more_blog_posts', {
      active_tag: activeTag,
      visible_count: nextVisibleCount,
      total_count: filteredPosts.length,
    });
  }

  return (
    <>
      {featuredPost && (
        <TrackedLink
          href={`/blog/${featuredPost.slug}`}
          eventName="open_blog_post"
          eventParams={{
            location: 'featured_blog_card',
            post_slug: featuredPost.slug,
            post_title: featuredPost.title,
          }}
          className="mn-gradient-card-featured group grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative min-h-72 overflow-hidden rounded-3xl bg-[#05080f]/70">
            {featuredPost.coverImage ? (
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.coverImageAlt ?? featuredPost.title}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_34%),linear-gradient(135deg,#0f172a,#020617)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05080f]/85 via-[#05080f]/20 to-transparent" />
            <div className="relative flex h-full min-h-72 flex-col justify-between p-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 ring-1 ring-white/10 backdrop-blur">
                  <BookOpen className="h-3.5 w-3.5" />
                  Featured
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {featuredPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10 backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex flex-wrap gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {featuredPost.date}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" /> {featuredPost.author}
              </span>
            </div>
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

      <div className="mt-10 grid gap-6 lg:grid-cols-[15rem_1fr] lg:items-start">
        <aside className="mn-page-panel p-4 lg:sticky lg:top-28">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
            <FolderOpen className="h-3.5 w-3.5" />
            Topics
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {topicOptions.map(({ tag, count }) => {
              const isActive = tag === activeTag;

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => selectTag(tag)}
                  className={`flex shrink-0 items-center justify-between gap-4 rounded-2xl px-3 py-2 text-left text-sm transition-colors lg:w-full ${
                    isActive
                      ? 'bg-cyan-300 text-slate-950'
                      : 'bg-white/[0.04] text-slate-400 hover:bg-cyan-300/10 hover:text-cyan-100'
                  }`}
                >
                  <span className="font-medium">{tag}</span>
                  <span
                    className={`text-xs ${
                      isActive ? 'text-slate-800' : 'text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                {activeTag === 'All' ? 'Latest blogs' : activeTag}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredPosts.length} article
                {filteredPosts.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {visiblePosts.map((post) => (
              <TrackedLink
                key={post.slug}
                href={`/blog/${post.slug}`}
                eventName="open_blog_post"
                eventParams={{
                  location: 'blog_card',
                  post_slug: post.slug,
                  post_title: post.title,
                  active_tag: activeTag,
                }}
                className="mn-gradient-card group block"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-cyan-300/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cyan-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="mt-4 text-xl font-bold leading-7 text-white transition-colors group-hover:text-cyan-100 md:text-2xl md:leading-8">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-4 text-sm text-slate-400 md:w-52 md:flex-col md:items-start">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> {post.date}
                    </span>
                    <span className="inline-flex items-center gap-2 font-semibold text-cyan-300">
                      Read more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </TrackedLink>
            ))}

            {filteredPosts.length === 0 && (
              <div className="rounded-3xl bg-[#05080f]/80 p-10 text-center">
                <h2 className="text-xl font-semibold text-white">
                  No articles for this topic yet
                </h2>
                <p className="mt-3 text-slate-400">
                  Choose another topic, or switch back to All.
                </p>
              </div>
            )}
          </div>

          {hasMorePosts && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={loadMorePosts}
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200"
              >
                Load more
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
