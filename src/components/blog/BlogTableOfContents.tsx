'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ListTree } from 'lucide-react';
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
    <ol className="space-y-0.5">
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : undefined}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={() => onNavigate(item.id)}
              className={`relative block py-1.5 pr-1 text-[0.78125rem] leading-5 transition-colors before:absolute before:-left-[1.3125rem] before:top-2 before:h-4 before:w-px before:transition-colors ${
                isActive
                  ? 'font-medium text-[#d3edf6] before:bg-[#56ccf2]'
                  : 'text-[#929aa6] before:bg-transparent hover:text-[#edf0f4]'
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
  const mobileDetailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => Boolean(heading));

    if (!headings.length) return;

    let frame = 0;
    const updateActiveHeading = () => {
      // Keep the current section active through long paragraphs and when scrolling upward.
      let current = headings[0];
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > 128) break;
        current = heading;
      }
      setActiveId(current.id);
      frame = 0;
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveHeading);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <div className="mb-6 min-w-0 lg:col-start-2 lg:row-start-1 lg:mb-0">
      <aside className="sticky top-24 hidden max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain border-l border-white/10 pl-5 lg:block" aria-label="Article navigation">
        <div className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-[#c2c9d2]">
          On this page
        </div>
        <nav aria-label="Table of contents">
          <TableOfContentsLinks
            activeId={activeId}
            items={items}
            onNavigate={setActiveId}
          />
        </nav>
      </aside>

      <details ref={mobileDetailsRef} className="group rounded-2xl border border-white/10 bg-white/[0.018] px-4 lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 text-[0.8125rem] font-medium text-[#d6dce4] marker:hidden [&::-webkit-details-marker]:hidden">
          <ListTree className="h-4 w-4 text-[#83bfd2]" aria-hidden="true" />
          On this page
          <ChevronDown className="ml-auto h-4 w-4 text-[#929aa6] transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <nav className="mb-4 mt-1 border-l border-white/10 pl-5" aria-label="Table of contents">
          <TableOfContentsLinks
            activeId={activeId}
            items={items}
            onNavigate={(id) => {
              setActiveId(id);
              if (mobileDetailsRef.current) mobileDetailsRef.current.open = false;
            }}
          />
        </nav>
      </details>
    </div>
  );
}
