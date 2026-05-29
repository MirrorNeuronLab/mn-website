import * as React from 'react';
import { cn } from '@/lib/utils';

function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty"
      className={cn(
        'flex min-h-60 flex-col items-center justify-center rounded-3xl border border-slate-800 bg-[#05080f]/80 p-10 text-center',
        className,
      )}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-header"
      className={cn('flex flex-col items-center gap-2', className)}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="empty-title"
      className={cn('text-xl font-semibold text-white', className)}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="empty-description"
      className={cn('max-w-md text-sm leading-7 text-slate-400', className)}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-content"
      className={cn('mt-4 flex items-center justify-center gap-3', className)}
      {...props}
    />
  );
}

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle };
