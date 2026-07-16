'use client';

import { useEffect, useState } from 'react';
import { ListTree } from 'lucide-react';
import type { BlogHeading } from '@/lib/blog-headings';

type BlogTableOfContentsProps = {
  items: BlogHeading[];
};

function TableOfContentsLinks({
  activeId,
  items,
  onNavigate,
}: BlogTableOfContentsProps & {
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <ol className="space-y-1">
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : undefined}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={() => onNavigate(item.id)}
              className={`relative block rounded-lg py-1.5 pr-2 text-[0.78rem] leading-5 transition-colors before:absolute before:-left-[1.05rem] before:top-2 before:h-4 before:w-px before:rounded-full before:transition-colors ${
                isActive
                  ? 'font-medium text-cyan-100 before:bg-cyan-300'
                  : 'text-slate-500 before:bg-transparent hover:text-slate-200'
              }`}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export default function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => Boolean(heading));

    if (!headings.length || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeading = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleHeading?.target.id) {
          setActiveId(visibleHeading.target.id);
        }
      },
      {
        rootMargin: '-18% 0px -70% 0px',
        threshold: [0, 1],
      },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <div className="mb-10 xl:col-start-1 xl:row-start-1 xl:mb-0 xl:self-stretch">
      <aside className="sticky top-28 hidden xl:block" aria-label="Article navigation">
        <div className="mb-4 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
          <ListTree className="h-3.5 w-3.5" />
          In this article
        </div>
        <nav className="border-l border-slate-800 pl-4" aria-label="Table of contents">
          <TableOfContentsLinks
            activeId={activeId}
            items={items}
            onNavigate={setActiveId}
          />
        </nav>
      </aside>

      <details className="mb-10 rounded-2xl border border-slate-800 bg-slate-950/45 p-4 xl:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-slate-200 marker:hidden">
          <ListTree className="h-4 w-4 text-cyan-300" />
          In this article
        </summary>
        <nav className="mt-4 border-l border-slate-800 pl-4" aria-label="Table of contents">
          <TableOfContentsLinks
            activeId={activeId}
            items={items}
            onNavigate={setActiveId}
          />
        </nav>
      </details>
    </div>
  );
}
