'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
      {featuredPost ? (
        <TrackedLink
          href={`/blog/${featuredPost.slug}`}
          eventName="open_blog_post"
          eventParams={{
            location: 'featured_blog_card',
            post_slug: featuredPost.slug,
            post_title: featuredPost.title,
          }}
          className="group grid gap-7 border-y border-white/[0.1] py-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12 md:py-10"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#11110f]">
            {featuredPost.coverImage ? (
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.coverImageAlt ?? featuredPost.title}
                fill
                priority
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover opacity-80 grayscale-[0.25] transition-opacity group-hover:opacity-95"
              />
            ) : (
              <div className="absolute inset-0 border border-white/[0.08]" />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#66655f]">
              <span>{featuredPost.date}</span>
              <span>{featuredPost.author}</span>
              <Badge>Featured</Badge>
            </div>
            <h2 className="mt-4 font-display text-3xl font-normal leading-[1.1] text-[#f4f2ed] transition-colors group-hover:text-white md:text-4xl">
              {featuredPost.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#888781]">
              {featuredPost.excerpt}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#8bc9bc]">
              Read article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </TrackedLink>
      ) : null}

      <div className="mt-16">
        <div className="flex flex-col gap-5 border-b border-white/[0.1] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[0.66rem] font-medium uppercase tracking-[0.18em] text-[#777671]">
              Writing
            </div>
            <h2 className="mt-2 font-display text-3xl font-normal text-[#f4f2ed]">
              {activeTag === 'All' ? 'Latest articles' : activeTag}
            </h2>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {['All', ...tags].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => selectTag(tag)}
                className={`text-xs transition-colors ${
                  activeTag === tag
                    ? 'text-[#f4f2ed] underline decoration-[#8bc9bc] underline-offset-4'
                    : 'text-[#777671] hover:text-[#deddd8]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div>
          {visiblePosts.map((post) => (
            <TrackedLink
              key={post.slug}
              href={`/blog/${post.slug}`}
              eventName="open_blog_post"
              eventParams={{
                location: 'blog_row',
                post_slug: post.slug,
                post_title: post.title,
                active_tag: activeTag,
              }}
              className="group grid gap-4 border-b border-white/[0.1] py-7 md:grid-cols-[9rem_1fr_auto] md:items-start md:gap-8 md:py-8"
            >
              <div className="text-xs text-[#66655f]">{post.date}</div>
              <div>
                <h3 className="font-display text-2xl font-normal leading-tight text-[#f4f2ed] transition-colors group-hover:text-white">
                  {post.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#888781]">
                  {post.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-3 text-[0.65rem] uppercase tracking-[0.13em] text-[#66655f]">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <ArrowRight className="hidden h-4 w-4 text-[#66655f] transition-transform group-hover:translate-x-0.5 group-hover:text-[#8bc9bc] md:block" />
            </TrackedLink>
          ))}

          {filteredPosts.length === 0 ? (
            <Empty className="my-16">
              <EmptyHeader>
                <EmptyTitle>No articles for this topic yet</EmptyTitle>
                <EmptyDescription>Choose another topic.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : null}
        </div>

        {hasMorePosts ? (
          <div className="mt-8 flex justify-center">
            <Button onClick={loadMorePosts} variant="outline">
              Load more
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
}
