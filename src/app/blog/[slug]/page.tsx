import { getPostData, getSortedPostsData } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { absoluteUrl, jsonLd, siteConfig } from '@/lib/site';
import { blogMdxComponents } from '@/components/blog/BlogMdxComponents';
import BlogTableOfContents from '@/components/blog/BlogTableOfContents';
import { PageShell } from '@/components/ui/page-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBlogHeadings } from '@/lib/blog-headings';
import styles from './blog-post.module.css';

function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
}

function estimateReadingMinutes(content: string) {
  const words = content
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^\p{L}\p{N}'’_-]+/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    return {};
  }

  const url = absoluteUrl(`/blog/${slug}`);

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      siteName: siteConfig.name,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.coverImageAlt }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  const headings = getBlogHeadings(post.content);
  const readingMinutes = estimateReadingMinutes(post.content);

  return (
    <PageShell className="overflow-visible">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            keywords: post.tags,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: 'en-US',
            author: {
              '@type': 'Person',
              name: post.author,
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': absoluteUrl(`/blog/${slug}`),
            },
            publisher: {
              '@type': 'Organization',
              name: siteConfig.legalName,
              logo: {
                '@type': 'ImageObject',
                url: absoluteUrl('/mn-logo.svg'),
              },
            },
            image: post.coverImage,
          }),
        }}
      />
      <div className="mx-auto max-w-7xl">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-12 px-0 text-[#777671] hover:bg-transparent hover:text-white"
        >
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </Button>

        <header className="relative mx-auto flex h-[26rem] max-w-5xl overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0d0e0d] shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:h-[24rem] lg:h-[26rem]">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt=""
              fill
              priority
              sizes="(min-width: 1280px) 1024px, calc(100vw - 3rem)"
              className="object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(139,201,188,0.16),transparent_38%),linear-gradient(135deg,#121411_0%,#090a09_100%)]"
              aria-hidden="true"
            />
          )}
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,6,0.22)_0%,rgba(5,7,6,0.62)_30%,rgba(5,7,6,0.9)_68%,rgba(5,7,6,0.99)_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_82%_5%,rgba(139,201,188,0.18),transparent_42%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 flex w-full flex-col justify-end p-6 sm:p-9 lg:p-10">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-white/[0.18] bg-black/25 normal-case tracking-normal text-white/70 backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h1
              className={`${styles.title} mn-content-title max-w-3xl text-balance text-[#f7f6f2] [text-shadow:0_2px_28px_rgba(0,0,0,0.75)]`}
            >
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/55">
              <span>{formatBlogDate(post.date)}</span>
              <span aria-hidden="true" className="text-white/25">•</span>
              <span>{readingMinutes} min read</span>
              <span aria-hidden="true" className="text-white/25">•</span>
              <span>{post.author}</span>
            </div>
          </div>
        </header>

        <p className={`${styles.lede} mx-auto mt-7 max-w-3xl text-sm leading-7 text-[#aaa9a3] md:text-base`}>
          {post.excerpt}
        </p>

        <div className="mt-14 xl:grid xl:grid-cols-[13rem_minmax(0,42rem)_minmax(0,13rem)] xl:items-start xl:gap-x-10">
          <BlogTableOfContents items={headings} />

          <article className={`${styles.article} xl:col-start-2`}>
            <MDXRemote
              source={post.content}
              components={blogMdxComponents}
              options={{
                // Blog content is repository-owned. Allow structured MDX props for
                // reusable charts/tables while keeping dangerous globals blocked.
                blockJS: false,
                blockDangerousJS: true,
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </article>

          <div className="hidden xl:col-start-3 xl:block" aria-hidden="true" />
        </div>
      </div>
    </PageShell>
  );
}
