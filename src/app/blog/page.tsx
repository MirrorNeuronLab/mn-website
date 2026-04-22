import { getSortedPostsData } from '@/lib/blog';
import { createMetadata } from '@/lib/site';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import BlogIndexClient from '@/components/blog/BlogIndexClient';

const featuredBlogSlug = 'workflow-is-becoming-the-software-ai-agent-workflow-stack';

export const metadata = createMetadata({
  title: 'Blog',
  path: '/blog',
  description:
    'MirrorNeuron blog posts about durable AI workflows, long-running agents, background workers, and practical alternatives to heavier orchestration systems.',
  keywords: ['AI workflow blog', 'durable AI workflows blog', 'Temporal alternative blog'],
});

export default function BlogIndex() {
  const posts = getSortedPostsData();
  const featuredPost = posts.find((post) => post.slug === featuredBlogSlug);
  const morePosts = posts.filter((post) => post.slug !== featuredBlogSlug);

  return (
    <PageShell>
      <PageHeader title="MirrorNeuron blog" />
      <BlogIndexClient featuredPost={featuredPost} posts={morePosts} />
    </PageShell>
  );
}
