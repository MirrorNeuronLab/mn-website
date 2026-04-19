'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import mermaid from 'mermaid';

type MermaidDiagramProps = {
  source: string;
};

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'dark',
  themeVariables: {
    background: 'transparent',
    primaryColor: '#0f172a',
    primaryTextColor: '#e2e8f0',
    primaryBorderColor: '#22d3ee',
    lineColor: '#67e8f9',
    secondaryColor: '#111827',
    tertiaryColor: '#020617',
    fontFamily: 'inherit',
  },
});

export default function MermaidDiagram({ source }: MermaidDiagramProps) {
  const reactId = useId();
  const renderId = useMemo(
    () => `mn-mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`,
    [reactId],
  );
  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function renderDiagram() {
      try {
        setError(null);
        const result = await mermaid.render(renderId, source);
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

  return (
    <figure className="my-8 overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.72))] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <figcaption className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
          Flowchart
        </figcaption>
        <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
          Mermaid
        </span>
      </div>
      {error ? (
        <pre className="overflow-x-auto rounded-2xl bg-slate-950/80 p-4 text-sm leading-7 text-rose-200">
          {error}
        </pre>
      ) : (
        <div
          className="mermaid-diagram overflow-x-auto rounded-2xl bg-slate-950/55 p-4"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </figure>
  );
}
