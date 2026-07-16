import {
  Children,
  isValidElement,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { AlertTriangle, CheckCircle2, Info, MoveHorizontal } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { slugifyBlogHeading } from '@/lib/blog-headings';
import BlogChart from './BlogChart';
import BlogDataTable from './BlogDataTable';
import BlogFigure from './BlogFigure';
import BlogStory from './BlogStory';
import MermaidDiagram from './MermaidDiagram';
import WorkbenchShellDiagram from './WorkbenchShellDiagram';

type CodeElementProps = {
  className?: string;
  children?: ReactNode;
};

function asText(value: ReactNode): string {
  return Children.toArray(value)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }

      if (isValidElement<{ children?: ReactNode }>(child)) {
        return asText(child.props.children);
      }

      return '';
    })
    .join('');
}

function CodeBlockShell({
  language,
  children,
}: {
  language: string;
  children: ReactNode;
}) {
  return (
    <div className="mn-blog-breakout my-10 overflow-hidden rounded-xl border border-white/10 bg-[#080807]">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3 font-sans">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#66655f]">
          {language || 'text'}
        </span>
      </div>
      {children}
    </div>
  );
}

function PreBlock(props: HTMLAttributes<HTMLPreElement>) {
  const child = Children.toArray(props.children)[0];

  if (isValidElement(child)) {
    const codeElement = child as ReactElement<CodeElementProps>;
    const className = codeElement.props.className ?? '';
    const language = className.match(/language-([\w-]+)/)?.[1] ?? '';
    const code = asText(codeElement.props.children).trimEnd();

    if (language === 'mermaid') {
      return <MermaidDiagram source={code} />;
    }

    return (
      <CodeBlockShell language={language}>
        <SyntaxHighlighter
          language={language || 'text'}
          style={vscDarkPlus}
          PreTag="div"
          CodeTag="code"
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.75rem',
          }}
          codeTagProps={{ className }}
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </CodeBlockShell>
    );
  }

  return <pre {...props} />;
}

function MdxHeading({
  level,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { level: 2 | 3 | 4 }) {
  const text = asText(children);
  const id = slugifyBlogHeading(text);
  const Tag = `h${level}` as 'h2' | 'h3' | 'h4';

  return (
    <Tag {...props} id={id} className={`group relative ${props.className ?? ''}`}>
      {children}
      <a
        href={`#${id}`}
        aria-label={`Link to ${text}`}
        className="ml-2 font-sans text-sm font-normal text-[#55544f] no-underline opacity-0 transition-opacity hover:text-[#8bc9bc] group-hover:opacity-100 group-focus-within:opacity-100"
      >
        #
      </a>
    </Tag>
  );
}

function Callout({
  title,
  type = 'note',
  children,
}: {
  title: string;
  type?: 'note' | 'warning' | 'success';
  children: ReactNode;
}) {
  const presentation =
    type === 'warning'
      ? {
          icon: AlertTriangle,
          border: 'border-amber-300/30',
          iconColor: 'text-amber-200',
          labelColor: 'text-amber-100',
        }
      : type === 'success'
        ? {
            icon: CheckCircle2,
            border: 'border-emerald-300/30',
            iconColor: 'text-emerald-200',
            labelColor: 'text-emerald-100',
          }
        : {
            icon: Info,
            border: 'border-[#8bc9bc]/35',
            iconColor: 'text-[#8bc9bc]',
            labelColor: 'text-[#dcebe7]',
          };
  const Icon = presentation.icon;

  return (
    <aside
      className={`my-9 grid grid-cols-[auto_1fr] gap-4 border-l-2 bg-white/[0.018] py-4 pl-4 pr-5 font-sans ${presentation.border}`}
      aria-label={title}
    >
      <Icon className={`mt-0.5 h-4 w-4 ${presentation.iconColor}`} aria-hidden="true" />
      <div>
        <div className={`text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${presentation.labelColor}`}>
          {title}
        </div>
        <div className="mt-2 text-[0.875rem] leading-6 text-[#aaa9a3] [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </aside>
  );
}

function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? '';
  const className = `font-medium text-[#8bc9bc] underline decoration-[#8bc9bc]/30 underline-offset-4 [overflow-wrap:anywhere] hover:text-[#b4ded5] ${props.className ?? ''}`;

  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <TrackedLink
        {...props}
        href={href}
        eventName="click_blog_link"
        eventParams={{
          destination: href,
          external: false,
        }}
        className={className}
      />
    );
  }

  return (
    <TrackedLink
      {...props}
      href={href}
      target={props.target ?? '_blank'}
      rel={props.rel ?? 'noreferrer'}
      eventName="click_blog_link"
      eventParams={{
        destination: href,
        external: true,
      }}
      className={className}
    />
  );
}

function MdxTable({
  className,
  ...props
}: HTMLAttributes<HTMLTableElement>) {
  return (
    <BlogFigure label="Table" contentClassName="bg-[#0d0e0d]">
      <div className="flex items-center justify-end border-b border-white/[0.07] px-4 py-2 text-[0.65rem] text-[#66655f] sm:hidden">
        <MoveHorizontal className="mr-1.5 h-3 w-3" aria-hidden="true" />
        Scroll to compare
      </div>
      <div
        className="mn-blog-table-scroll overflow-x-auto"
        role="region"
        aria-label="Scrollable data table"
        tabIndex={0}
      >
        <table
          {...props}
          className={`w-full min-w-[680px] border-separate border-spacing-0 font-sans text-[0.8125rem] ${className ?? ''}`}
        />
      </div>
    </BlogFigure>
  );
}

function MdxFigure({ children }: { children?: ReactNode }) {
  const items = Children.toArray(children);
  const caption = items.find(
    (child) => isValidElement(child) && child.type === 'figcaption',
  ) as ReactElement<{ children?: ReactNode }> | undefined;
  const content = items.filter(
    (child) => !(isValidElement(child) && child.type === 'figcaption'),
  );

  return (
    <BlogFigure
      label="Diagram"
      caption={caption?.props.children}
      surface="grid"
      contentClassName="mn-blog-legacy-figure p-3 sm:p-5"
    >
      {content}
    </BlogFigure>
  );
}

export const blogMdxComponents = {
  a: MdxLink,
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => <MdxHeading {...props} level={2} />,
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => <MdxHeading {...props} level={3} />,
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => <MdxHeading {...props} level={4} />,
  pre: PreBlock,
  Callout,
  Chart: BlogChart,
  Diagram: MermaidDiagram,
  DataTable: BlogDataTable,
  Story: BlogStory,
  WorkbenchShell: WorkbenchShellDiagram,
  Figure: BlogFigure,
  figure: MdxFigure,
  table: MdxTable,
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="sticky top-0 border-b border-white/10 bg-[#151614] px-4 py-3.5 text-left align-bottom text-[0.72rem] font-semibold uppercase leading-5 tracking-[0.06em] text-[#d7d5cf] first:min-w-[13rem] sm:px-5"
    />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      {...props}
      className="border-b border-white/[0.07] px-4 py-3.5 text-[0.8125rem] leading-6 text-[#aaa9a3] first:min-w-[13rem] first:bg-[#10110f] first:font-medium first:text-[#deddd8] sm:px-5"
    />
  ),
};
