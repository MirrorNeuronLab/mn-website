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
import TrackedLink from '@/components/TrackedLink';
import { Card } from '@/components/ui/card';
import { slugifyBlogHeading } from '@/lib/blog-headings';
import BlogChart from './BlogChart';
import BlogDataTable from './BlogDataTable';
import MermaidDiagram from './MermaidDiagram';

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
    <div className="mn-blog-breakout my-10 overflow-hidden rounded-3xl border border-slate-800/90 bg-[#05080f] shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between border-b border-slate-800/80 px-5 py-3 font-sans">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        </div>
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
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
        className="ml-2 font-sans text-sm font-normal text-slate-700 no-underline opacity-0 transition-opacity hover:text-cyan-300 group-hover:opacity-100 group-focus-within:opacity-100"
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
  const tone =
    type === 'warning'
      ? 'border-amber-300/20 bg-amber-300/10 text-amber-100'
      : type === 'success'
        ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100'
        : 'border-cyan-300/20 bg-cyan-300/10 text-cyan-100';

  return (
    <Card className={`my-8 p-5 ${tone}`}>
      <div className="text-sm font-bold uppercase tracking-[0.18em]">{title}</div>
      <div className="mt-3 text-sm leading-7 text-slate-200">{children}</div>
    </Card>
  );
}

function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? '';
  const className = `font-semibold text-cyan-300 underline decoration-cyan-300/30 underline-offset-4 hover:text-cyan-100 ${props.className ?? ''}`;

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
    <div
      className="mn-blog-breakout my-12 overflow-x-auto rounded-3xl border border-slate-800/90 bg-[#070b13] shadow-[0_24px_80px_rgba(0,0,0,0.24)]"
      role="region"
      aria-label="Scrollable data table"
    >
      <table
        {...props}
        className={`w-full min-w-[720px] border-separate border-spacing-0 font-sans text-sm ${className ?? ''}`}
      />
    </div>
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
  table: MdxTable,
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="border-b border-slate-700/90 bg-slate-900/75 px-5 py-4 text-left align-bottom text-sm font-semibold leading-5 text-slate-100"
    />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      {...props}
      className="border-b border-slate-800/80 px-5 py-4 text-sm leading-6 text-slate-300"
    />
  ),
};
