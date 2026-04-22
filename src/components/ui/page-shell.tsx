import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

type PageShellProps = {
  children: ReactNode;
};

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="mn-page">
      <div className="mn-page-container">{children}</div>
    </main>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  backHref = '/',
  backLabel = 'Back to Home',
}: PageHeaderProps) {
  return (
    <>
      <Link href={backHref} className="mn-page-back">
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>
      <div className="mn-page-header">
        {eyebrow && <div className="mn-eyebrow mn-gradient-text">{eyebrow}</div>}
        <h1 className="mn-page-title">{title}</h1>
        {description && <p className="mn-page-lede">{description}</p>}
      </div>
    </>
  );
}
