import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <main className={cn('mn-page', className)}>
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
      <Button asChild variant="ghost" size="sm" className="mb-6 px-0 text-slate-400 hover:bg-transparent hover:text-white">
        <Link href={backHref}>
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      </Button>
      <div className="mn-page-header">
        {eyebrow && <Badge variant="outline">{eyebrow}</Badge>}
        <h1 className="mn-page-title">{title}</h1>
        {description && <p className="mn-page-lede">{description}</p>}
      </div>
    </>
  );
}
