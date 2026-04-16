import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export default function BlogIndex() {
  const posts = getSortedPostsData();

  return (
    <main className="min-h-screen bg-[#020617] selection:bg-blue-500/30 selection:text-blue-200">
      <div className="container mx-auto px-6 py-24">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">MirrorNeuron Blog</h1>
          <p className="text-xl text-slate-400">
            Thoughts, tutorials, and engineering deep-dives on building reliable multi-agent systems.
          </p>
        </div>

        <div className="grid gap-8 max-w-4xl">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="block group p-8 rounded-2xl bg-[#0a0f1c] border border-slate-800 hover:border-blue-500/30 transition-all"
            >
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <div className="flex items-center gap-6 text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
