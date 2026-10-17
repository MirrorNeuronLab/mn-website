import { getPostData, getSortedPostsData } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUp, ArrowUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { absoluteUrl, jsonLd, siteConfig } from '@/lib/site';
import { blogMdxComponents } from '@/components/blog/BlogMdxComponents';
import BlogTableOfContents from '@/components/blog/BlogTableOfContents';
import LlmArenaRace from '@/components/blog/LlmArenaRace';
import { PageShell } from '@/components/ui/page-shell';
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
  const hasChartHero = post.hero === 'llm-arena-race';
  const relatedPosts = getSortedPostsData()
    .filter((candidate) => candidate.slug !== slug)
    .sort((a, b) => {
      const relevance = (tags: string[]) => tags.filter((tag) => post.tags.includes(tag)).length;
      return relevance(b.tags) - relevance(a.tags);
    })
    .slice(0, 2);

  return (
    <PageShell className={`${styles.page} overflow-visible`}>
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
      <div className={styles.shell}>
        <nav className={styles.backNav} aria-label="Blog navigation">
          <Link href="/blog" className={styles.backLink}>
            <ArrowLeft size={14} aria-hidden="true" /> All articles
          </Link>
        </nav>

        <header id="article-top" className={styles.header}>
          <div>
            <div className={styles.topics} aria-label="Topics">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.lede}>{post.excerpt}</p>
            <div className={styles.metadata}>
              <span className={styles.author}>{post.author}</span>
              <span aria-hidden="true">/</span>
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              <span aria-hidden="true">/</span>
              <span>{readingMinutes} min read</span>
            </div>
          </div>
          {post.coverImage ? (
            <div className={styles.cover} aria-hidden="true">
              <Image src={post.coverImage} alt="" fill sizes="224px" className="object-cover" />
            </div>
          ) : null}
        </header>

        {hasChartHero ? (
          <section className={styles.featuredVisual} aria-label="Interactive model race">
            <LlmArenaRace />
          </section>
        ) : null}

        <div className={styles.readingLayout}>
          <BlogTableOfContents items={headings} />

          <article className={styles.article} aria-label="Article content">
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
            <footer className={styles.articleEnd}>
              <Link href="/blog"><ArrowLeft size={14} aria-hidden="true" /> All articles</Link>
              <a href="#article-top">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
            </footer>
          </article>
        </div>

        {relatedPosts.length ? (
          <section className={styles.related} aria-labelledby="related-posts-title">
            <h2 id="related-posts-title">Continue reading</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedMeta}>
                    <span>{relatedPost.tags[0] ?? 'Blog'}</span>
                    <time dateTime={relatedPost.date}>{formatBlogDate(relatedPost.date)}</time>
                  </div>
                  <h3>{relatedPost.title}</h3>
                  <p>{relatedPost.excerpt}</p>
                  <span className={styles.readArticle}>Read article <ArrowUpRight size={15} aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </PageShell>
  );
}
