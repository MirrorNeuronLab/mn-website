'use client';

import { useEffect, useId, useState } from 'react';
import { Check, Pause, Play, RotateCcw } from 'lucide-react';
import BlogFigure from './BlogFigure';

export type BlogStoryStep = {
  label: string;
  title: string;
  description: string;
  detail?: string;
  status?: string;
  evidence?: string;
};

type BlogStoryProps = {
  title: string;
  description?: string;
  steps: BlogStoryStep[];
  caption?: string;
  note?: string;
  visual?: 'bracket' | 'workflow';
};

function BracketPreview({ activeIndex }: { activeIndex: number }) {
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const metalGradientId = `${reactId}-metal`;
  const stressGradientId = `${reactId}-stress`;
  const isSelected = activeIndex >= 0;
  const hasProposal = activeIndex >= 2;
  const hasEvidence = activeIndex >= 3;
  const isCommitted = activeIndex >= 5;

  return (
    <div className="relative flex min-h-[19rem] items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#090a09] [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:24px_24px]">
      <div className="absolute left-4 top-4 flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.14em] text-[#66655f]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#8bc9bc]" />
        bracket-v4.step
      </div>
      <div className="absolute right-4 top-4 rounded-md border border-white/[0.08] bg-black/30 px-2 py-1 text-[0.62rem] text-[#777671]">
        Front orthographic
      </div>

      <svg
        viewBox="0 0 520 330"
        className="h-auto w-full max-w-[32rem] px-5 pt-8"
        role="img"
        aria-label="Mechanical bracket preview with the upper rib selected and a proposed lighter version overlaid"
      >
        <defs>
          <linearGradient id={metalGradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3d413c" />
            <stop offset="55%" stopColor="#242724" />
            <stop offset="100%" stopColor="#171917" />
          </linearGradient>
          <linearGradient id={stressGradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8bc9bc" stopOpacity="0.12" />
            <stop offset="55%" stopColor="#d6bd7a" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#c78376" stopOpacity="0.82" />
          </linearGradient>
        </defs>

        <path
          d="M112 262V82c0-18 14-32 32-32h55c18 0 32 14 32 32v90h174c18 0 32 14 32 32v58H112Z"
          fill={`url(#${metalGradientId})`}
          stroke={isSelected ? '#6f9f96' : '#555851'}
          strokeWidth="2"
        />
        <path
          d="M199 171 288 91c13-12 33-11 45 2l35 39"
          fill="none"
          stroke="#555851"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {hasEvidence ? (
          <path
            d="M199 171 288 91c13-12 33-11 45 2l35 39"
            fill="none"
            stroke={`url(#${stressGradientId})`}
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
        {hasProposal ? (
          <path
            d="M201 171 291 98c12-10 29-9 39 2l32 36"
            fill="none"
            stroke="#b8ddd5"
            strokeWidth="2.5"
            strokeDasharray="7 6"
            strokeLinecap="round"
          />
        ) : null}

        <circle cx="171" cy="104" r="23" fill="#090a09" stroke="#62655e" strokeWidth="2" />
        <circle cx="171" cy="221" r="23" fill="#090a09" stroke="#62655e" strokeWidth="2" />
        <circle cx="383" cy="221" r="23" fill="#090a09" stroke="#62655e" strokeWidth="2" />

        {isSelected ? (
          <g>
            <rect x="277" y="58" width="98" height="26" rx="7" fill="#14201d" stroke="#527a72" />
            <text x="326" y="75" fill="#b8ddd5" fontSize="11" textAnchor="middle" fontFamily="inherit">
              Upper rib
            </text>
            <path d="M305 84 291 99" fill="none" stroke="#527a72" strokeWidth="1.5" />
          </g>
        ) : null}

        {isCommitted ? (
          <g transform="translate(398 56)">
            <circle cx="20" cy="20" r="19" fill="#14201d" stroke="#527a72" />
            <path d="m11 20 6 6 13-14" fill="none" stroke="#b8ddd5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ) : null}
      </svg>

      <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-white/[0.07] bg-black/40 px-3 py-2 backdrop-blur-sm">
          <div className="text-[0.58rem] uppercase tracking-[0.12em] text-[#66655f]">Object</div>
          <div className="mt-1 text-[0.7rem] text-[#cbc9c2]">Upper rib</div>
        </div>
        <div className="rounded-lg border border-white/[0.07] bg-black/40 px-3 py-2 backdrop-blur-sm">
          <div className="text-[0.58rem] uppercase tracking-[0.12em] text-[#66655f]">Mounts</div>
          <div className="mt-1 text-[0.7rem] text-[#cbc9c2]">Fixed</div>
        </div>
        <div className="rounded-lg border border-white/[0.07] bg-black/40 px-3 py-2 backdrop-blur-sm">
          <div className="text-[0.58rem] uppercase tracking-[0.12em] text-[#66655f]">Safety factor</div>
          <div className="mt-1 text-[0.7rem] text-[#cbc9c2]">≥ 2.5</div>
        </div>
      </div>
    </div>
  );
}

function WorkflowPreview({ activeIndex, total }: { activeIndex: number; total: number }) {
  return (
    <div className="flex min-h-[19rem] items-center justify-center rounded-xl border border-white/[0.08] bg-[#090a09] p-8">
      <div className="flex w-full max-w-lg items-center gap-2">
        {Array.from({ length: total }, (_, index) => (
          <div key={index} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs ${
                index < activeIndex
                  ? 'border-[#527a72] bg-[#14201d] text-[#b8ddd5]'
                  : index === activeIndex
                    ? 'border-[#8bc9bc] bg-[#17231f] text-[#e7f0ed]'
                    : 'border-white/[0.1] bg-[#111210] text-[#66655f]'
              }`}
            >
              {index < activeIndex ? <Check className="h-3.5 w-3.5" /> : index + 1}
            </div>
            {index < total - 1 ? (
              <div className={`h-px flex-1 ${index < activeIndex ? 'bg-[#527a72]' : 'bg-white/[0.08]'}`} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogStory({
  title,
  description,
  steps = [],
  caption,
  note,
  visual = 'workflow',
}: BlogStoryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const activeStep = steps[activeIndex];

  useEffect(() => {
    if (!isPlaying || steps.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        if (current >= steps.length - 1) {
          setIsPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 2600);

    return () => window.clearInterval(timer);
  }, [isPlaying, steps.length]);

  if (!activeStep) return null;

  const controls = (
    <div className="inline-flex rounded-lg border border-white/[0.09] bg-[#10110f] p-1">
      <button
        type="button"
        onClick={() => {
          if (activeIndex >= steps.length - 1) setActiveIndex(0);
          setIsPlaying((current) => !current);
        }}
        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[0.68rem] font-medium text-[#cbc9c2] outline-none transition-colors hover:bg-white/[0.06] focus-visible:ring-1 focus-visible:ring-[#8bc9bc]/70"
        aria-label={isPlaying ? 'Pause walkthrough' : 'Play walkthrough'}
      >
        {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button
        type="button"
        onClick={() => {
          setIsPlaying(false);
          setActiveIndex(0);
        }}
        disabled={activeIndex === 0 && !isPlaying}
        className="rounded-md p-1.5 text-[#777671] outline-none transition-colors hover:bg-white/[0.06] hover:text-[#cbc9c2] focus-visible:ring-1 focus-visible:ring-[#8bc9bc]/70 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Restart walkthrough"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  return (
    <BlogFigure
      label="Interactive walkthrough"
      title={title}
      description={description}
      caption={caption}
      note={note}
      controls={controls}
      surface="grid"
    >
      <div className="border-b border-white/[0.07] px-4 py-3 sm:px-6">
        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }} aria-label="Walkthrough steps">
          {steps.map((step, index) => (
            <button
              key={`${step.label}-${index}`}
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setActiveIndex(index);
              }}
              aria-pressed={index === activeIndex}
              aria-label={`Show step ${index + 1}: ${step.label}`}
              className="group rounded-md py-1 outline-none focus-visible:ring-1 focus-visible:ring-[#8bc9bc]/70"
            >
              <span className={`block h-1 rounded-full transition-colors ${index <= activeIndex ? 'bg-[#6f9f96]' : 'bg-white/[0.08]'}`} />
              <span className={`mt-1.5 hidden truncate text-[0.6rem] sm:block ${index === activeIndex ? 'text-[#cbc9c2]' : 'text-[#5f5e59]'}`}>
                {step.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="p-4 sm:p-6 lg:border-r lg:border-white/[0.07]">
          {visual === 'bracket' ? (
            <BracketPreview activeIndex={activeIndex} />
          ) : (
            <WorkflowPreview activeIndex={activeIndex} total={steps.length} />
          )}
        </div>

        <div className="flex min-h-[22rem] flex-col justify-between border-t border-white/[0.07] p-5 sm:p-7 lg:border-t-0" aria-live="polite">
          <div>
            <div className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#6f9f96]">
              Step {activeIndex + 1} of {steps.length} · {activeStep.label}
            </div>
            <div className="mt-4 text-xl font-medium leading-7 tracking-[-0.02em] text-[#f4f2ed]">
              {activeStep.title}
            </div>
            <p className="mt-3 text-[0.82rem] leading-6 text-[#92918b]">{activeStep.description}</p>

            {activeStep.detail ? (
              <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
                <div className="text-[0.58rem] uppercase tracking-[0.14em] text-[#66655f]">Visible change</div>
                <div className="mt-2 text-[0.76rem] leading-5 text-[#cbc9c2]">{activeStep.detail}</div>
              </div>
            ) : null}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-lg border border-white/[0.07] px-3 py-2.5">
              <div className="text-[0.56rem] uppercase tracking-[0.12em] text-[#66655f]">Runtime state</div>
              <div className="mt-1.5 flex items-center gap-2 text-[0.7rem] text-[#cbc9c2]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8bc9bc]" />
                {activeStep.status ?? 'Ready'}
              </div>
            </div>
            <div className="rounded-lg border border-white/[0.07] px-3 py-2.5">
              <div className="text-[0.56rem] uppercase tracking-[0.12em] text-[#66655f]">Evidence</div>
              <div className="mt-1.5 text-[0.7rem] text-[#cbc9c2]">{activeStep.evidence ?? 'Not yet available'}</div>
            </div>
          </div>
        </div>
      </div>
    </BlogFigure>
  );
}
