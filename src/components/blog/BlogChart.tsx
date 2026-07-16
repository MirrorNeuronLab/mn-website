'use client';

import { useId, useState } from 'react';
import { BarChart3, Table2 } from 'lucide-react';
import BlogFigure from './BlogFigure';

export type BlogChartRow = {
  label: string;
  [key: string]: string | number;
};

export type BlogChartSeries = {
  key: string;
  label: string;
  color?: string;
};

type BlogChartProps = {
  title: string;
  data: BlogChartRow[];
  series: BlogChartSeries[];
  type?: 'bar' | 'line';
  description?: string;
  caption?: string;
  note?: string;
  valueSuffix?: string;
  domain?: [number, number];
  yLabel?: string;
};

type ActiveDatum = {
  x: number;
  y: number;
  category: string;
  series: string;
  value: number;
  color: string;
};

const chartColors = ['#8bc9bc', '#8fa7c9', '#a9bd8d', '#c6aa76', '#c78e88'];
const width = 860;
const height = 400;
const margin = { top: 30, right: 24, bottom: 66, left: 72 };
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

function formatNumber(value: number, suffix = '') {
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: Number.isInteger(value) ? 0 : 1,
  }).format(value);

  return `${formatted}${suffix}`;
}

function shortLabel(value: string) {
  return value.length > 18 ? `${value.slice(0, 16)}…` : value;
}

export default function BlogChart({
  title,
  data = [],
  series = [],
  type = 'bar',
  description,
  caption,
  note,
  valueSuffix = '',
  domain,
  yLabel,
}: BlogChartProps) {
  const reactId = useId();
  const chartId = reactId.replace(/[^a-zA-Z0-9_-]/g, '');
  const [activeKeys, setActiveKeys] = useState(() => series.map((item) => item.key));
  const [view, setView] = useState<'chart' | 'data'>('chart');
  const [activeDatum, setActiveDatum] = useState<ActiveDatum | null>(null);
  const activeSeries = series.filter((item) => activeKeys.includes(item.key));

  const values = data.flatMap((row) =>
    series.map((item) => Number(row[item.key])).filter(Number.isFinite),
  );
  const rawMinimum = Math.min(...values, 0);
  const rawMaximum = Math.max(...values, 1);
  const roundedMaximum = Math.ceil(rawMaximum / 10) * 10;
  const roundedMinimum = Math.floor(rawMinimum / 10) * 10;
  const [minimum, maximum] = domain ?? [roundedMinimum, roundedMaximum];
  const range = Math.max(maximum - minimum, 1);
  const y = (value: number) =>
    margin.top + plotHeight - ((value - minimum) / range) * plotHeight;
  const ticks = Array.from({ length: 5 }, (_, index) => minimum + (range / 4) * index);
  const groupWidth = plotWidth / Math.max(data.length, 1);
  const barGap = 5;
  const availableBarWidth = Math.min(groupWidth * 0.68, 72);
  const barWidth = Math.max(
    4,
    (availableBarWidth - barGap * Math.max(activeSeries.length - 1, 0)) /
      Math.max(activeSeries.length, 1),
  );
  const zeroY = y(Math.max(minimum, Math.min(maximum, 0)));

  function toggleSeries(key: string) {
    setActiveDatum(null);
    setActiveKeys((current) => {
      if (current.includes(key)) {
        return current.length === 1 ? current : current.filter((item) => item !== key);
      }

      return [...current, key];
    });
  }

  const controls = (
    <div className="inline-flex rounded-lg border border-white/[0.09] bg-[#10110f] p-1" aria-label="Chart view">
      <button
        type="button"
        onClick={() => setView('chart')}
        aria-pressed={view === 'chart'}
        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[0.68rem] font-medium outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#8bc9bc]/70 ${
          view === 'chart' ? 'bg-white/[0.08] text-[#f4f2ed]' : 'text-[#777671] hover:text-[#cbc9c2]'
        }`}
      >
        <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
        Chart
      </button>
      <button
        type="button"
        onClick={() => setView('data')}
        aria-pressed={view === 'data'}
        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[0.68rem] font-medium outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#8bc9bc]/70 ${
          view === 'data' ? 'bg-white/[0.08] text-[#f4f2ed]' : 'text-[#777671] hover:text-[#cbc9c2]'
        }`}
      >
        <Table2 className="h-3.5 w-3.5" aria-hidden="true" />
        Data
      </button>
    </div>
  );

  return (
    <BlogFigure
      label="Chart"
      title={title}
      description={description}
      caption={caption}
      note={note}
      controls={controls}
      surface="grid"
    >
      {series.length > 1 ? (
        <div className="flex flex-wrap gap-x-4 gap-y-2 border-b border-white/[0.07] px-4 py-3 sm:px-6" aria-label="Chart series">
          {series.map((item, index) => {
            const isActive = activeKeys.includes(item.key);
            const color = item.color ?? chartColors[index % chartColors.length];

            return (
              <button
                key={item.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => toggleSeries(item.key)}
                className={`inline-flex items-center gap-2 rounded-sm text-[0.7rem] font-medium outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#8bc9bc]/70 ${
                  isActive ? 'text-[#cbc9c2]' : 'text-[#5f5e59]'
                }`}
              >
                <span
                  className="h-2 w-2 rounded-[2px] ring-1 ring-inset ring-white/10"
                  style={{ backgroundColor: isActive ? color : '#30312e' }}
                />
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {view === 'data' ? (
        <div className="overflow-x-auto" tabIndex={0} aria-label={`${title} data`}>
          <table className="w-full min-w-[620px] border-separate border-spacing-0 text-[0.8125rem]">
            <caption className="sr-only">{title}</caption>
            <thead>
              <tr>
                <th className="border-b border-white/10 bg-[#151614] px-5 py-3.5 text-left text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-[#d7d5cf]">
                  Category
                </th>
                {series.map((item) => (
                  <th key={item.key} className="border-b border-white/10 bg-[#151614] px-5 py-3.5 text-right text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-[#d7d5cf]">
                    {item.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.label} className="hover:bg-white/[0.025]">
                  <th scope="row" className="border-b border-white/[0.07] px-5 py-3.5 text-left font-medium text-[#deddd8]">
                    {row.label}
                  </th>
                  {series.map((item) => (
                    <td key={item.key} className="border-b border-white/[0.07] px-5 py-3.5 text-right tabular-nums text-[#aaa9a3]">
                      {formatNumber(Number(row[item.key]), valueSuffix)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : data.length && series.length ? (
        <div className="overflow-x-auto p-3 sm:p-6" onMouseLeave={() => setActiveDatum(null)}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={description ? `${title}. ${description}` : title}
            className="min-w-[660px] font-sans"
          >
            <defs>
              {series.map((item, index) => {
                const color = item.color ?? chartColors[index % chartColors.length];
                return (
                  <linearGradient key={item.key} id={`${chartId}-${item.key}-fill`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.95" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.48" />
                  </linearGradient>
                );
              })}
            </defs>

            {ticks.map((tick) => {
              const tickY = y(tick);
              return (
                <g key={tick}>
                  <line x1={margin.left} x2={width - margin.right} y1={tickY} y2={tickY} stroke="#2b2d29" strokeWidth="1" strokeDasharray="2 5" />
                  <text x={margin.left - 12} y={tickY + 4} fill="#777671" fontSize="11" textAnchor="end">
                    {formatNumber(tick, valueSuffix)}
                  </text>
                </g>
              );
            })}

            <line x1={margin.left} x2={width - margin.right} y1={zeroY} y2={zeroY} stroke="#4b4d47" strokeWidth="1" />

            {yLabel ? (
              <text x={18} y={margin.top + plotHeight / 2} fill="#777671" fontSize="11" textAnchor="middle" transform={`rotate(-90 18 ${margin.top + plotHeight / 2})`}>
                {yLabel}
              </text>
            ) : null}

            {type === 'bar'
              ? data.flatMap((row, rowIndex) => {
                  const totalBarsWidth = activeSeries.length * barWidth + Math.max(activeSeries.length - 1, 0) * barGap;
                  const groupX = margin.left + rowIndex * groupWidth + groupWidth / 2;

                  return activeSeries.map((item, seriesIndex) => {
                    const value = Number(row[item.key]);
                    if (!Number.isFinite(value)) return null;
                    const originalIndex = series.indexOf(item);
                    const color = item.color ?? chartColors[originalIndex % chartColors.length];
                    const barX = groupX - totalBarsWidth / 2 + seriesIndex * (barWidth + barGap);
                    const valueY = y(value);
                    const barY = Math.min(valueY, zeroY);
                    const renderedHeight = Math.max(Math.abs(zeroY - valueY), 1);
                    const datum = { x: barX + barWidth / 2, y: barY, category: row.label, series: item.label, value, color };

                    return (
                      <rect
                        key={`${row.label}-${item.key}`}
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={renderedHeight}
                        rx={Math.min(4, barWidth / 3)}
                        fill={`url(#${chartId}-${item.key}-fill)`}
                        className="cursor-crosshair outline-none transition-opacity hover:opacity-100 focus:opacity-100"
                        opacity={activeDatum && (activeDatum.category !== row.label || activeDatum.series !== item.label) ? 0.55 : 0.9}
                        tabIndex={0}
                        role="graphics-symbol"
                        aria-label={`${row.label}, ${item.label}: ${formatNumber(value, valueSuffix)}`}
                        onMouseEnter={() => setActiveDatum(datum)}
                        onFocus={() => setActiveDatum(datum)}
                        onBlur={() => setActiveDatum(null)}
                      />
                    );
                  });
                })
              : activeSeries.map((item) => {
                  const originalIndex = series.indexOf(item);
                  const color = item.color ?? chartColors[originalIndex % chartColors.length];
                  const points = data
                    .map((row, index) => {
                      const value = Number(row[item.key]);
                      return Number.isFinite(value) ? `${margin.left + index * groupWidth + groupWidth / 2},${y(value)}` : null;
                    })
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <g key={item.key}>
                      <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                      {data.map((row, index) => {
                        const value = Number(row[item.key]);
                        if (!Number.isFinite(value)) return null;
                        const cx = margin.left + index * groupWidth + groupWidth / 2;
                        const cy = y(value);
                        const datum = { x: cx, y: cy, category: row.label, series: item.label, value, color };
                        return (
                          <circle
                            key={`${row.label}-${item.key}`}
                            cx={cx}
                            cy={cy}
                            r="5"
                            fill="#0d0e0d"
                            stroke={color}
                            strokeWidth="2.5"
                            className="cursor-crosshair outline-none"
                            tabIndex={0}
                            role="graphics-symbol"
                            aria-label={`${row.label}, ${item.label}: ${formatNumber(value, valueSuffix)}`}
                            onMouseEnter={() => setActiveDatum(datum)}
                            onFocus={() => setActiveDatum(datum)}
                            onBlur={() => setActiveDatum(null)}
                          />
                        );
                      })}
                    </g>
                  );
                })}

            {data.map((row, index) => (
              <text key={row.label} x={margin.left + index * groupWidth + groupWidth / 2} y={height - 32} fill="#aaa9a3" fontSize={data.length > 8 ? '10' : '11'} textAnchor="middle">
                <title>{row.label}</title>
                {shortLabel(row.label)}
              </text>
            ))}

            {activeDatum ? (
              <g pointerEvents="none" transform={`translate(${Math.min(Math.max(activeDatum.x - 77, margin.left), width - margin.right - 154)} ${Math.max(activeDatum.y - 65, 8)})`}>
                <rect width="154" height="52" rx="8" fill="#181a17" stroke="#3d403a" />
                <circle cx="13" cy="15" r="3" fill={activeDatum.color} />
                <text x="22" y="19" fill="#aaa9a3" fontSize="10">{shortLabel(activeDatum.category)}</text>
                <text x="12" y="39" fill="#f4f2ed" fontSize="12" fontWeight="600">
                  {formatNumber(activeDatum.value, valueSuffix)} · {activeDatum.series}
                </text>
              </g>
            ) : null}
          </svg>

          <table className="sr-only">
            <caption>{title}</caption>
            <thead><tr><th>Category</th>{series.map((item) => <th key={item.key}>{item.label}</th>)}</tr></thead>
            <tbody>{data.map((row) => <tr key={row.label}><th>{row.label}</th>{series.map((item) => <td key={item.key}>{formatNumber(Number(row[item.key]), valueSuffix)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      ) : (
        <div className="flex min-h-48 items-center justify-center text-sm text-[#777671]">No chart data is available.</div>
      )}
    </BlogFigure>
  );
}
