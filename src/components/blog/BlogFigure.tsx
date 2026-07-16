import type { ReactNode } from 'react';

type BlogFigureProps = {
  children: ReactNode;
  label?: string;
  title?: string;
  description?: string;
  caption?: ReactNode;
  note?: ReactNode;
  controls?: ReactNode;
  contentClassName?: string;
  surface?: 'plain' | 'grid';
};

export default function BlogFigure({
  children,
  label = 'Figure',
  title,
  description,
  caption,
  note,
  controls,
  contentClassName = '',
  surface = 'plain',
}: BlogFigureProps) {
  const hasHeader = Boolean(label || title || description || controls);
  const surfaceClass =
    surface === 'grid'
      ? "bg-[#0d0e0d] [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:32px_32px]"
      : 'bg-[#0d0e0d]';

  return (
    <figure className="mn-blog-breakout my-14 font-sans">
      {hasHeader ? (
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 max-w-2xl">
            {label ? (
              <div className="mb-2 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-[#6f9f96]">
                {label}
              </div>
            ) : null}
            {title ? (
              <div className="text-[0.95rem] font-medium leading-6 tracking-[-0.01em] text-[#f4f2ed]">
                {title}
              </div>
            ) : null}
            {description ? (
              <div className="mt-1 max-w-xl text-[0.8125rem] leading-6 text-[#888781]">
                {description}
              </div>
            ) : null}
          </div>
          {controls ? <div className="shrink-0">{controls}</div> : null}
        </div>
      ) : null}

      <div
        className={`relative overflow-hidden rounded-2xl border border-white/[0.11] shadow-[0_24px_80px_rgba(0,0,0,0.18)] ${surfaceClass} ${contentClassName}`}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#8bc9bc]/45 to-transparent"
          aria-hidden="true"
        />
        {children}
      </div>

      {caption || note ? (
        <figcaption className="mt-3 flex max-w-3xl flex-col gap-1 text-[0.72rem] leading-5 text-[#777671] sm:flex-row sm:gap-2">
          {caption ? <span className="text-[#92918b]">{caption}</span> : null}
          {caption && note ? <span className="hidden text-[#4f4e49] sm:inline">·</span> : null}
          {note ? <span>{note}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
