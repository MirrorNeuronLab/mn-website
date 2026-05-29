import { getPostData, getSortedPostsData } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { absoluteUrl, jsonLd, siteConfig } from '@/lib/site';
import { blogMdxComponents } from '@/components/blog/BlogMdxComponents';
import { PageShell } from '@/components/ui/page-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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

  return (
    <PageShell>
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
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <Button asChild variant="ghost" size="sm" className="mb-8 px-0 text-slate-400 hover:bg-transparent hover:text-white">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
            </Button>
            
            <h1 className="mn-page-title mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-500 pb-8">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
            </div>
            <Separator />

            {post.coverImage ? (
              <Card variant="plain" className="mt-8 overflow-hidden bg-slate-950/70 p-0 ring-1 ring-white/10">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt ?? post.title}
                  width={1400}
                  height={788}
                  priority
                  className="h-auto w-full object-cover"
                />
              </Card>
            ) : null}
          </div>

          <article className="prose prose-invert prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:text-white prose-p:leading-8 prose-li:leading-8 prose-strong:text-white prose-blockquote:rounded-3xl prose-blockquote:border-cyan-300/30 prose-blockquote:bg-cyan-300/10 prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:text-cyan-50">
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
        </div>
    </PageShell>
  );
}
