import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap text-[0.66rem] font-medium uppercase tracking-[0.18em] transition-colors',
  {
    variants: {
      variant: {
        default: 'text-[#8bc9bc]',
        secondary: 'text-[#aaa9a3]',
        outline: 'text-[#aaa9a3]',
        success: 'text-emerald-300',
        accent: 'text-[#a9bddd]',
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
