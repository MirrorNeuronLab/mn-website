'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import mermaid from 'mermaid';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import BlogFigure from './BlogFigure';

type MermaidDiagramProps = {
  source: string;
  title?: string;
  description?: string;
  caption?: string;
};

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'strict',
  htmlLabels: false,
  fontFamily: 'inherit',
  fontSize: 12,
  flowchart: {
    curve: 'basis',
    diagramPadding: 8,
    nodeSpacing: 24,
    rankSpacing: 34,
    padding: 6,
  },
  theme: 'base',
  themeVariables: {
    background: '#0d0e0d',
    primaryColor: '#171916',
    primaryTextColor: '#deddd8',
    primaryBorderColor: '#527a72',
    lineColor: '#6f9f96',
    secondaryColor: '#151816',
    secondaryTextColor: '#cbc9c2',
    secondaryBorderColor: '#454740',
    tertiaryColor: '#111210',
    tertiaryTextColor: '#cbc9c2',
    tertiaryBorderColor: '#3d3e39',
    clusterBkg: '#111210',
    clusterBorder: '#3d3e39',
    edgeLabelBackground: '#0d0e0d',
    nodeTextColor: '#deddd8',
    fontFamily: 'inherit',
    fontSize: '11px',
  },
});

export default function MermaidDiagram({
  source,
  title = 'Workflow diagram',
  description,
  caption,
}: MermaidDiagramProps) {
  const reactId = useId();
  const renderId = useMemo(
    () => `mn-mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`,
    [reactId],
  );
  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    let canceled = false;

    async function renderDiagram() {
      try {
        const diagramId = `${renderId}-${Date.now().toString(36)}`;
        setError(null);
        setSvg('');
        await mermaid.parse(source);
        const result = await mermaid.render(diagramId, source);
        if (!canceled) {
          setSvg(result.svg);
        }
      } catch (unknownError) {
        if (!canceled) {
          setSvg('');
          setError(
            unknownError instanceof Error
              ? unknownError.message
              : 'Unable to render Mermaid diagram.',
          );
        }
      }
    }

    void renderDiagram();

    return () => {
      canceled = true;
    };
  }, [renderId, source]);

  const controls = svg ? (
    <div className="inline-flex items-center rounded-lg border border-white/[0.09] bg-[#10110f] p-1" aria-label="Diagram zoom controls">
      <button
        type="button"
        onClick={() => setZoom((current) => Math.max(0.75, current - 0.25))}
        disabled={zoom <= 0.75}
        className="rounded-md p-1.5 text-[#888781] outline-none transition-colors hover:bg-white/[0.06] hover:text-[#f4f2ed] focus-visible:ring-1 focus-visible:ring-[#8bc9bc]/70 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Zoom out"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-11 text-center text-[0.65rem] tabular-nums text-[#777671]">
        {Math.round(zoom * 100)}%
      </span>
      <button
        type="button"
        onClick={() => setZoom((current) => Math.min(1.75, current + 0.25))}
        disabled={zoom >= 1.75}
        className="rounded-md p-1.5 text-[#888781] outline-none transition-colors hover:bg-white/[0.06] hover:text-[#f4f2ed] focus-visible:ring-1 focus-visible:ring-[#8bc9bc]/70 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Zoom in"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
      <span className="mx-1 h-4 w-px bg-white/[0.08]" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setZoom(1)}
        disabled={zoom === 1}
        className="rounded-md p-1.5 text-[#888781] outline-none transition-colors hover:bg-white/[0.06] hover:text-[#f4f2ed] focus-visible:ring-1 focus-visible:ring-[#8bc9bc]/70 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Reset zoom"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </button>
    </div>
  ) : null;

  return (
    <BlogFigure
      label="Diagram"
      title={title}
      description={description}
      caption={caption}
      controls={controls}
      surface="grid"
    >
      <div className="overflow-auto p-5 sm:p-8" tabIndex={0} aria-label={`${title} canvas`}>
        {error ? (
          <div className="rounded-xl border border-rose-300/15 bg-rose-300/[0.04] p-5 font-sans text-sm leading-6 text-rose-100">
            <p className="m-0">This diagram could not be rendered.</p>
            <details className="mt-3 text-xs text-rose-200/60">
              <summary className="cursor-pointer">Technical details</summary>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap font-mono">{error}</pre>
            </details>
          </div>
        ) : svg ? (
          <div
            className="mermaid-diagram mx-auto min-w-[560px] transition-[width] duration-200 [&_.edgeLabel]:!bg-[#0d0e0d] [&_.label]:!font-sans [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full [&_text]:!text-[11px] [&_text]:!leading-none"
            style={{ width: `${zoom * 100}%` }}
            role="img"
            aria-label={description ? `${title}. ${description}` : title}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="flex min-h-56 items-center justify-center font-sans text-sm text-[#777671]" aria-live="polite">
            Rendering diagram…
          </div>
        )}
      </div>
    </BlogFigure>
  );
}
