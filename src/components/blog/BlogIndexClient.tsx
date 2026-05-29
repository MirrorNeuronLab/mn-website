'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, BookOpen, FolderOpen, User } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
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
          className="group block"
        >
          <Card
            variant="featured"
            className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
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
                  <Badge className="bg-slate-950/70 ring-1 ring-white/10 backdrop-blur">
                    <BookOpen className="h-3.5 w-3.5" />
                    Featured
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-slate-950/70 normal-case tracking-normal ring-1 ring-white/10 backdrop-blur"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-5 flex flex-wrap gap-6 text-sm text-slate-400">
                <span>{featuredPost.date}</span>
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
          </Card>
        </TrackedLink>
      )}

      <div className="mt-10 grid gap-6 lg:grid-cols-[15rem_1fr] lg:items-start">
        <Card variant="panel" className="p-4 lg:sticky lg:top-28">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
            <FolderOpen className="h-3.5 w-3.5" />
            Topics
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {topicOptions.map(({ tag, count }) => {
              const isActive = tag === activeTag;

              return (
                <Button
                  key={tag}
                  variant={isActive ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => selectTag(tag)}
                  className="shrink-0 justify-between gap-4 rounded-2xl lg:w-full"
                >
                  <span className="font-medium">{tag}</span>
                  <span
                    className={`text-xs ${
                      isActive ? 'text-slate-800' : 'text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </Button>
              );
            })}
          </div>
        </Card>

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
                className="group block"
              >
                <Card variant="gradient" className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                    <span className="shrink-0 self-end text-right text-xs font-medium leading-5 text-slate-500 sm:self-start">
                      {post.date}
                    </span>
                  </div>
                  <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                      <h2 className="text-xl font-bold leading-7 text-white transition-colors group-hover:text-cyan-100 md:text-2xl md:leading-8">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">
                        {post.excerpt}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan-300">
                      Read more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Card>
              </TrackedLink>
            ))}

            {filteredPosts.length === 0 && (
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>No articles for this topic yet</EmptyTitle>
                  <EmptyDescription>
                    Choose another topic, or switch back to All.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </div>

          {hasMorePosts && (
            <div className="mt-6 flex justify-center">
              <Button
                onClick={loadMorePosts}
                className="bg-white px-5 py-3 text-slate-950 hover:bg-slate-200"
              >
                Load more
              </Button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
