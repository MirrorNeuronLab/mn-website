import { MoveHorizontal } from 'lucide-react';
import BlogFigure from './BlogFigure';

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
    <BlogFigure
      label="Data table"
      title={title}
      description={description}
      caption={caption}
      note={note}
      contentClassName="bg-[#0d0e0d]"
    >
      <div className="flex items-center justify-end border-b border-white/[0.07] px-4 py-2 text-[0.65rem] text-[#66655f] sm:hidden">
        <MoveHorizontal className="mr-1.5 h-3 w-3" aria-hidden="true" />
        Scroll to compare
      </div>
      <div
        className="mn-blog-table-scroll overflow-x-auto"
        role="region"
        aria-label={title ?? caption ?? 'Data table'}
        tabIndex={0}
      >
        <table className="w-full min-w-[680px] border-separate border-spacing-0 font-sans text-[0.8125rem]">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`sticky top-0 border-b border-white/10 bg-[#151614] px-4 py-3.5 align-bottom text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-[#d7d5cf] sm:px-5 ${alignmentClass(
                    column.align,
                  )} ${column.key === highlightColumn ? 'bg-[#17211e] text-[#b9ded6]' : ''}`}
                >
                  <span className="block">{column.label}</span>
                  {column.detail ? (
                    <span className="mt-1 block text-[0.64rem] font-normal normal-case leading-4 tracking-normal text-[#777671]">
                      {column.detail}
                    </span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={String(row[columns[0]?.key] ?? rowIndex)}
                className="group transition-colors hover:bg-white/[0.025]"
              >
                {columns.map((column, columnIndex) => {
                  const cellClass = `border-b border-white/[0.07] px-4 py-3.5 leading-6 text-[#aaa9a3] sm:px-5 ${alignmentClass(
                    column.align,
                  )} ${column.key === highlightColumn ? 'bg-[#8bc9bc]/[0.035] font-medium text-[#dcebe7] group-hover:bg-[#8bc9bc]/[0.055]' : ''}`;

                  return columnIndex === 0 ? (
                    <th
                      key={column.key}
                      scope="row"
                      className={`${cellClass} min-w-[13rem] bg-[#10110f] font-medium text-[#deddd8] group-hover:bg-[#131512]`}
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

    </BlogFigure>
  );
}
