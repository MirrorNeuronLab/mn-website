'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import mermaid from 'mermaid';
import { Workflow } from 'lucide-react';

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

  return (
    <figure className="mn-blog-breakout my-12 overflow-hidden rounded-3xl border border-slate-800/90 bg-[#070b13] shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
      <div className="flex items-start gap-3 border-b border-slate-800/80 px-5 py-5 sm:px-7">
        <div className="mt-0.5 rounded-xl border border-cyan-300/15 bg-cyan-300/10 p-2 text-cyan-200">
          <Workflow className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-sans text-base font-semibold leading-6 text-slate-100">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 font-sans text-sm leading-6 text-slate-400">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.055),transparent_58%)] p-4 sm:p-8">
        {error ? (
          <pre className="overflow-x-auto rounded-2xl border border-rose-300/15 bg-rose-300/5 p-4 font-mono text-sm leading-7 text-rose-200">
            {error}
          </pre>
        ) : svg ? (
          <div
            className="mermaid-diagram min-w-[620px] [&_svg]:mx-auto [&_svg]:max-w-full [&_text]:!text-[11px] [&_text]:!leading-none"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="flex min-h-56 items-center justify-center font-sans text-sm text-slate-500" aria-live="polite">
            Rendering diagram…
          </div>
        )}
      </div>

      {caption ? (
        <figcaption className="border-t border-slate-800/80 px-5 py-4 font-sans text-xs leading-5 text-slate-500 sm:px-7">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
