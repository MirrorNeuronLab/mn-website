import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.68rem] font-mono font-medium uppercase tracking-[0.14em] whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'border-[#8bc9bc]/30 bg-[#8bc9bc]/10 text-[#8bc9bc]',
        secondary: 'border-white/10 bg-white/[0.04] text-[#deddd8]',
        outline: 'border-white/10 bg-white/[0.02] text-[#aaa9a3]',
        success: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
        accent: 'border-blue-400/30 bg-blue-400/10 text-blue-200',
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
