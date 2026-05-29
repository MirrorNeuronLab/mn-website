import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'border-cyan-300/20 bg-cyan-300/10 text-cyan-100',
        secondary: 'border-slate-700 bg-slate-900/70 text-slate-300',
        outline: 'border-slate-700 bg-transparent text-slate-300',
        success: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200',
        accent: 'border-blue-300/20 bg-blue-300/10 text-blue-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
