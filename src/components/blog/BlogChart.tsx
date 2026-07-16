'use client';

import { useId, useState } from 'react';
import { BarChart3 } from 'lucide-react';

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
  valueSuffix?: string;
  domain?: [number, number];
  yLabel?: string;
};

const chartColors = ['#67e8f9', '#818cf8', '#34d399', '#fbbf24', '#fb7185'];
const width = 860;
const height = 420;
const margin = { top: 28, right: 24, bottom: 72, left: 68 };
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

function formatNumber(value: number, suffix = '') {
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: Number.isInteger(value) ? 0 : 1,
  }).format(value);

  return `${formatted}${suffix}`;
}

function shortLabel(value: string) {
  return value.length > 16 ? `${value.slice(0, 14)}…` : value;
}

export default function BlogChart({
  title,
  data = [],
  series = [],
  type = 'bar',
  description,
  caption,
  valueSuffix = '',
  domain,
  yLabel,
}: BlogChartProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [activeKeys, setActiveKeys] = useState(() => series.map((item) => item.key));
  const activeSeries = series.filter((item) => activeKeys.includes(item.key));

  const values = data.flatMap((row) =>
    series.map((item) => Number(row[item.key])).filter(Number.isFinite),
  );
  const rawMaximum = Math.max(...values, 1);
  const roundedMaximum = Math.ceil(rawMaximum / 10) * 10;
  const [minimum, maximum] = domain ?? [0, roundedMaximum];

  const range = Math.max(maximum - minimum, 1);
  const y = (value: number) =>
    margin.top + plotHeight - ((value - minimum) / range) * plotHeight;
  const ticks = Array.from({ length: 5 }, (_, index) => minimum + (range / 4) * index);
  const groupWidth = plotWidth / Math.max(data.length, 1);
  const barGap = 5;
  const availableBarWidth = Math.min(groupWidth * 0.72, 72);
  const barWidth = Math.max(
    4,
    (availableBarWidth - barGap * Math.max(activeSeries.length - 1, 0)) /
      Math.max(activeSeries.length, 1),
  );

  function toggleSeries(key: string) {
    setActiveKeys((current) => {
      if (current.includes(key)) {
        return current.length === 1 ? current : current.filter((item) => item !== key);
      }

      return [...current, key];
    });
  }

  return (
    <figure className="mn-blog-breakout my-12 overflow-hidden rounded-3xl border border-slate-800/90 bg-[#070b13] shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col gap-5 border-b border-slate-800/80 px-5 py-5 sm:px-7">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl border border-cyan-300/15 bg-cyan-300/10 p-2 text-cyan-200">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <h3 id={titleId} className="font-sans text-base font-semibold leading-6 text-slate-100">
              {title}
            </h3>
            {description ? (
              <p id={descriptionId} className="mt-1 font-sans text-sm leading-6 text-slate-400">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        {series.length > 1 ? (
          <div className="flex flex-wrap gap-2" aria-label="Chart series">
            {series.map((item, index) => {
              const isActive = activeKeys.includes(item.key);
              const color = item.color ?? chartColors[index % chartColors.length];

              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleSeries(item.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-sans text-xs font-medium transition-colors ${
                    isActive
                      ? 'border-slate-600 bg-slate-900 text-slate-100'
                      : 'border-slate-800 bg-transparent text-slate-600'
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: isActive ? color : '#334155' }}
                  />
                  {item.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="overflow-x-auto p-3 sm:p-6">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby={`${titleId}${description ? ` ${descriptionId}` : ''}`}
          className="min-w-[720px] font-sans"
        >
          <defs>
            <linearGradient id={`${titleId}-bar-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {ticks.map((tick) => {
            const tickY = y(tick);
            return (
              <g key={tick}>
                <line
                  x1={margin.left}
                  x2={width - margin.right}
                  y1={tickY}
                  y2={tickY}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
                <text
                  x={margin.left - 12}
                  y={tickY + 4}
                  fill="#64748b"
                  fontSize="11"
                  textAnchor="end"
                >
                  {formatNumber(tick, valueSuffix)}
                </text>
              </g>
            );
          })}

          {yLabel ? (
            <text
              x={18}
              y={margin.top + plotHeight / 2}
              fill="#64748b"
              fontSize="11"
              textAnchor="middle"
              transform={`rotate(-90 18 ${margin.top + plotHeight / 2})`}
            >
              {yLabel}
            </text>
          ) : null}

          {type === 'bar'
            ? data.flatMap((row, rowIndex) => {
                const totalBarsWidth =
                  activeSeries.length * barWidth +
                  Math.max(activeSeries.length - 1, 0) * barGap;
                const groupX = margin.left + rowIndex * groupWidth + groupWidth / 2;

                return activeSeries.map((item, seriesIndex) => {
                  const value = Number(row[item.key]);
                  if (!Number.isFinite(value)) {
                    return null;
                  }

                  const color =
                    item.color ?? chartColors[series.indexOf(item) % chartColors.length];
                  const barX = groupX - totalBarsWidth / 2 + seriesIndex * (barWidth + barGap);
                  const barY = y(value);
                  const renderedHeight = Math.max(margin.top + plotHeight - barY, 0);

                  return (
                    <g key={`${row.label}-${item.key}`}>
                      <rect
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={renderedHeight}
                        rx={Math.min(5, barWidth / 3)}
                        fill={color}
                        opacity="0.86"
                      >
                        <title>{`${row.label}, ${item.label}: ${formatNumber(value, valueSuffix)}`}</title>
                      </rect>
                      {data.length <= 8 && activeSeries.length <= 3 ? (
                        <text
                          x={barX + barWidth / 2}
                          y={Math.max(barY - 8, 12)}
                          fill="#cbd5e1"
                          fontSize="10"
                          textAnchor="middle"
                        >
                          {formatNumber(value, valueSuffix)}
                        </text>
                      ) : null}
                    </g>
                  );
                });
              })
            : activeSeries.map((item) => {
                const color = item.color ?? chartColors[series.indexOf(item) % chartColors.length];
                const points = data
                  .map((row, index) => {
                    const value = Number(row[item.key]);
                    return Number.isFinite(value)
                      ? `${margin.left + index * groupWidth + groupWidth / 2},${y(value)}`
                      : null;
                  })
                  .filter(Boolean)
                  .join(' ');

                return (
                  <g key={item.key}>
                    <polyline
                      points={points}
                      fill="none"
                      stroke={color}
                      strokeWidth="3"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    {data.map((row, index) => {
                      const value = Number(row[item.key]);
                      if (!Number.isFinite(value)) {
                        return null;
                      }

                      return (
                        <circle
                          key={`${row.label}-${item.key}`}
                          cx={margin.left + index * groupWidth + groupWidth / 2}
                          cy={y(value)}
                          r="4.5"
                          fill="#070b13"
                          stroke={color}
                          strokeWidth="3"
                        >
                          <title>{`${row.label}, ${item.label}: ${formatNumber(value, valueSuffix)}`}</title>
                        </circle>
                      );
                    })}
                  </g>
                );
              })}

          {data.map((row, index) => (
            <text
              key={row.label}
              x={margin.left + index * groupWidth + groupWidth / 2}
              y={height - 38}
              fill="#94a3b8"
              fontSize={data.length > 8 ? '10' : '11'}
              textAnchor="middle"
            >
              <title>{row.label}</title>
              {shortLabel(row.label)}
            </text>
          ))}
        </svg>

        <table className="sr-only">
          <caption>{title}</caption>
          <thead>
            <tr>
              <th>Category</th>
              {series.map((item) => (
                <th key={item.key}>{item.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.label}>
                <th>{row.label}</th>
                {series.map((item) => (
                  <td key={item.key}>{formatNumber(Number(row[item.key]), valueSuffix)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption ? (
        <figcaption className="border-t border-slate-800/80 px-5 py-4 font-sans text-xs leading-5 text-slate-500 sm:px-7">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
