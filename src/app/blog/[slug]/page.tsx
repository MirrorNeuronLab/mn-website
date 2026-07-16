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
import { Separator } from '@/components/ui/separator';
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
          className="mb-10 px-0 text-slate-500 hover:bg-transparent hover:text-white"
        >
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </Button>

        <header className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="normal-case tracking-normal text-slate-400"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className={`${styles.title} text-balance text-3xl leading-[1.12] text-slate-50 md:text-[2.5rem]`}>
            {post.title}
          </h1>
          <p className={`${styles.lede} mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300`}>
            {post.excerpt}
          </p>
          <div className="mt-7 flex items-center justify-center gap-3 text-sm text-slate-500">
            <span>{formatBlogDate(post.date)}</span>
            <span aria-hidden="true" className="text-slate-700">•</span>
            <span>{post.author}</span>
          </div>
        </header>

        <Separator className="mx-auto mt-12 max-w-5xl" />

        {post.coverImage ? (
          <figure className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-950/70 shadow-[0_28px_90px_rgba(0,0,0,0.3)]">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              width={1400}
              height={788}
              priority
              sizes="(min-width: 1280px) 1024px, calc(100vw - 3rem)"
              className="h-auto w-full object-cover"
            />
          </figure>
        ) : null}

        <div className="mt-16 xl:grid xl:grid-cols-[13rem_minmax(0,45rem)_minmax(0,13rem)] xl:items-start xl:gap-x-10">
          <BlogTableOfContents items={headings} />

          <article className={`${styles.article} xl:col-start-2`}>
            <MDXRemote
              source={post.content}
              components={blogMdxComponents}
              options={{
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
