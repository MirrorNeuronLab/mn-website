import { TableProperties } from 'lucide-react';

export type BlogDataTableColumn = {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  detail?: string;
};

export type BlogDataTableRow = Record<string, string | number>;

type BlogDataTableProps = {
  columns: BlogDataTableColumn[];
  rows: BlogDataTableRow[];
  title?: string;
  description?: string;
  caption?: string;
  note?: string;
  highlightColumn?: string;
};

function alignmentClass(alignment: BlogDataTableColumn['align']) {
  if (alignment === 'right') {
    return 'text-right tabular-nums';
  }

  if (alignment === 'center') {
    return 'text-center';
  }

  return 'text-left';
}

export default function BlogDataTable({
  columns = [],
  rows = [],
  title,
  description,
  caption,
  note,
  highlightColumn,
}: BlogDataTableProps) {
  return (
    <figure className="mn-blog-breakout my-12 overflow-hidden rounded-3xl border border-slate-800/90 bg-[#070b13] shadow-[0_24px_80px_rgba(0,0,0,0.26)]">
      {title || description ? (
        <div className="flex items-start gap-3 border-b border-slate-800/80 px-5 py-5 sm:px-7">
          <div className="mt-0.5 rounded-xl border border-cyan-300/15 bg-cyan-300/10 p-2 text-cyan-200">
            <TableProperties className="h-4 w-4" />
          </div>
          <div>
            {title ? (
              <h3 className="font-sans text-base font-semibold leading-6 text-slate-100">
                {title}
              </h3>
            ) : null}
            {description ? (
              <p className="mt-1 font-sans text-sm leading-6 text-slate-400">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="overflow-x-auto" role="region" aria-label={title ?? caption ?? 'Data table'}>
        <table className="w-full min-w-[720px] border-separate border-spacing-0 font-sans text-sm">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`border-b border-slate-700/90 bg-slate-900/75 px-5 py-4 align-bottom font-semibold text-slate-100 ${alignmentClass(
                    column.align,
                  )} ${column.key === highlightColumn ? 'bg-cyan-300/[0.08] text-cyan-100' : ''}`}
                >
                  <span className="block">{column.label}</span>
                  {column.detail ? (
                    <span className="mt-1 block text-[0.68rem] font-normal leading-4 text-slate-500">
                      {column.detail}
                    </span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={String(row[columns[0]?.key] ?? rowIndex)}>
                {columns.map((column, columnIndex) => {
                  const cellClass = `border-b border-slate-800/80 px-5 py-4 leading-6 text-slate-300 ${alignmentClass(
                    column.align,
                  )} ${column.key === highlightColumn ? 'bg-cyan-300/[0.045] font-medium text-cyan-50' : ''}`;

                  return columnIndex === 0 ? (
                    <th
                      key={column.key}
                      scope="row"
                      className={`${cellClass} sticky left-0 z-10 bg-[#070b13] font-medium text-slate-100`}
                    >
                      {row[column.key]}
                    </th>
                  ) : (
                    <td key={column.key} className={cellClass}>
                      {row[column.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption || note ? (
        <figcaption className="border-t border-slate-800/70 px-5 py-4 font-sans text-xs leading-5 text-slate-500 sm:px-7">
          {caption}
          {caption && note ? <span className="mx-2 text-slate-700">•</span> : null}
          {note}
        </figcaption>
      ) : null}
    </figure>
  );
}
