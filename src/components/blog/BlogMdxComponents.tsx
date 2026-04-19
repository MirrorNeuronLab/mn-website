import {
  Children,
  isValidElement,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import MermaidDiagram from './MermaidDiagram';

type CodeElementProps = {
  className?: string;
  children?: ReactNode;
};

function asText(value: ReactNode) {
  return Children.toArray(value).join('');
}

function CodeBlockShell({
  language,
  children,
}: {
  language: string;
  children: ReactNode;
}) {
  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-[#05080f] shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
          {language || 'code'}
        </span>
        <span className="text-xs text-slate-500">copy-ready</span>
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
    const language = className.replace('language-', '');
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
    <aside className={`my-8 rounded-3xl border p-5 ${tone}`}>
      <div className="text-sm font-bold uppercase tracking-[0.18em]">{title}</div>
      <div className="mt-3 text-sm leading-7 text-slate-200">{children}</div>
    </aside>
  );
}

function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? '';
  const className = 'font-semibold text-cyan-300 underline decoration-cyan-300/30 underline-offset-4 hover:text-cyan-100';

  if (href.startsWith('/')) {
    return <Link {...props} href={href} className={className} />;
  }

  return <a {...props} className={className} />;
}

export const blogMdxComponents = {
  a: MdxLink,
  pre: PreBlock,
  Callout,
  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/70">
      <table {...props} />
    </div>
  ),
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      className="border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-left text-sm font-semibold text-white"
    />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      {...props}
      className="border-b border-slate-800/70 px-4 py-3 text-sm leading-7 text-slate-300"
    />
  ),
};
