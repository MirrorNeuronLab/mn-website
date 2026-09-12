import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const SANS = 'Inter, ui-sans-serif, system-ui';

function Layer({
  y,
  label,
  title,
  items,
  accent = false,
  height = 118,
  columns,
  x = 110,
  width = 880,
  dashed = false,
  depth = 16,
}: {
  y: number;
  label: string;
  title: string;
  items: string[];
  accent?: boolean;
  height?: number;
  columns?: number;
  x?: number;
  width?: number;
  dashed?: boolean;
  depth?: number;
}) {
  const topFill = dashed ? '#141515' : accent ? '#16232c' : '#171818';
  const frontFill = dashed ? '#101111' : accent ? '#10181f' : '#141412';
  const sideFill = dashed ? '#161717' : accent ? '#1a2833' : '#1b1c1b';
  const stroke = dashed ? '#3c403a' : accent ? '#56ccf2' : '#2e3230';
  const dash = dashed ? { strokeDasharray: '5 5' } : {};

  const chipWidth = (item: string) => Math.max(88, item.length * 8 + 26);

  const rows: string[][] = columns
    ? items.reduce<string[][]>((acc, item, index) => {
        if (index % columns === 0) acc.push([]);
        acc[acc.length - 1].push(item);
        return acc;
      }, [])
    : [items];

  const gridStartY = y + 80;

  return (
    <g>
      {/* top surface */}
      <polygon
        points={`
          ${x},${y}
          ${x + width},${y}
          ${x + width + depth},${y - depth}
          ${x + depth},${y - depth}
        `}
        fill={topFill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
        {...dash}
      />

      {/* front face */}
      <polygon
        points={`
          ${x},${y}
          ${x + width},${y}
          ${x + width},${y + height}
          ${x},${y + height}
        `}
        fill={frontFill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
        {...dash}
      />

      {/* right side */}
      <polygon
        points={`
          ${x + width},${y}
          ${x + width + depth},${y - depth}
          ${x + width + depth},${y + height - depth}
          ${x + width},${y + height}
        `}
        fill={sideFill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
        {...dash}
      />

      {/* eyebrow — top-left corner */}
      {label ? (
        <text
          x={x + 16}
          y={y + 24}
          fill={accent ? '#9be1fa' : '#777671'}
          fontSize="12"
          fontFamily={MONO}
          letterSpacing="3"
        >
          {label}
        </text>
      ) : null}

      {/* title — centered */}
      <text
        x={x + width / 2}
        y={y + height / 2 + 8}
        textAnchor="middle"
        fill={dashed ? '#aaa9a3' : '#f4f2ed'}
        fontSize="16"
        fontWeight="500"
        fontFamily={SANS}
      >
        {title}
      </text>

      {/* capability chips */}
      {rows.map((row, rowIndex) => (
        <g key={row.join('|')}>
          {row.map((item, index) => {
            const w = chipWidth(item);
            const chipX =
              x +
              34 +
              row
                .slice(0, index)
                .reduce((sum, value) => sum + chipWidth(value) + 10, 0);
            return (
              <g key={item}>
                <rect
                  x={chipX}
                  y={gridStartY + rowIndex * 35}
                  width={w}
                  height="25"
                  rx="12"
                  fill="#080807"
                  stroke={accent ? '#1e4a63' : '#2a2c2a'}
                />
                <text
                  x={chipX + w / 2}
                  y={gridStartY + rowIndex * 35 + 17}
                  fill={accent ? '#cdeafa' : '#aaa9a3'}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily={MONO}
                >
                  {item}
                </text>
              </g>
            );
          })}
        </g>
      ))}
    </g>
  );
}

export function WhyHero() {
  return (
    <>
      {/* 1. Hero — the missing layer */}
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-[-120px] -z-0 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-[#56ccf2]/[0.06] blur-[120px]"
          aria-hidden="true"
        />
        <Button asChild variant="ghost" size="sm" className="mb-10 px-0 text-[#777671] hover:bg-transparent hover:text-white">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="relative mx-auto max-w-3xl text-center">
          <Badge variant="outline">Why MirrorNeuron</Badge>
          <h1 className="mx-auto mt-5 font-display text-4xl font-normal leading-[1.08] tracking-[-0.03em] text-[#f4f2ed] sm:text-5xl">
            The missing layer between AI code and dependable execution.
          </h1>
          <div className="mx-auto mt-5 max-w-2xl space-y-4 text-sm leading-7 text-[#888781] sm:text-base">
            <p>
              Agent frameworks help you build prompts, tools, and reasoning
              flows. But once the work needs to run for hours, survive
              failures, involve humans, or operate on local and edge hardware,
              you still need to build the execution layer yourself.
            </p>
          </div>
        </div>
      </div>

      {/* Hero visual — the missing execution layer */}
      <div className="mt-8 overflow-hidden rounded-2xl bg-[#0b0c0b]">
        <svg
          viewBox="0 0 1100 444"
          className="h-auto w-full"
          role="img"
          aria-label="MirrorNeuron fills the missing execution layer"
        >
          <defs>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="runtimeGlow" x1="0" x2="1">
              <stop offset="0%" stopColor="#17332d" stopOpacity="0" />
              <stop offset="50%" stopColor="#56ccf2" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#17332d" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* subtle runtime glow */}
          <rect
            x="70"
            y="175"
            width="960"
            height="165"
            rx="28"
            fill="url(#runtimeGlow)"
            filter="url(#softGlow)"
          />

          {/* TOP */}
          <Layer
            y={80}
            height={84}
            label="YOUR WORK"
            title="Define what should happen."
            items={[]}
          />

          {/* MIDDLE — runtime beside out-of-scope design box */}
          <Layer
            y={206}
            height={96}
            x={110}
            width={580}
            label="MIRRORNEURON RUNTIME"
            title="Keep it running dependably."
            items={[]}
            accent
          />
          <Layer
            y={206}
            height={96}
            x={710}
            width={280}
            label=""
            title="Design a workflow"
            items={[]}
            dashed
          />

          {/* BOTTOM */}
          <Layer
            y={330}
            height={84}
            label="YOUR COMPUTE"
            title="Run where the work belongs."
            items={[]}
          />
        </svg>
      </div>

      {/* Closing line */}
      <div className="mx-auto mt-10 max-w-2xl text-center">
        <p className="font-display text-sm font-medium leading-7 tracking-[-0.015em] text-[#f4f2ed] sm:text-base">
          Launch the work. Stay in control.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#888781] sm:text-base">
          Run, watch, pause, resume, and recover workflows through the SDK, CLI or
          API. MirrorNeuron handles environment setup, model readiness,
          resource allocation, checkpoints, and the rest of the workflow execution lifecycle.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Button asChild variant="link" className="text-sm text-[#56ccf2] hover:text-[#9be1fa]">
            <TrackedLink
              href="https://doc.mirrorneuron.io/docs/quickstart"
              target="_blank"
              rel="noreferrer"
              eventName="click_why_quickstart_hero_visual"
              eventParams={{ location: 'why_hero' }}
            >
              Quickstart
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </Button>
          <Button asChild variant="link" className="text-sm text-[#56ccf2] hover:text-[#9be1fa]">
            <TrackedLink
              href="https://doc.mirrorneuron.io/docs/cli"
              target="_blank"
              rel="noreferrer"
              eventName="click_why_cli_reference"
              eventParams={{ location: 'why_hero' }}
            >
              CLI reference
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </Button>
          <Button asChild variant="link" className="text-sm text-[#56ccf2] hover:text-[#9be1fa]">
            <TrackedLink
              href="https://doc.mirrorneuron.io/docs/api"
              target="_blank"
              rel="noreferrer"
              eventName="click_why_api_reference"
              eventParams={{ location: 'why_hero' }}
            >
              API reference
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </Button>
        </div>
      </div>
    </>
  );
}
