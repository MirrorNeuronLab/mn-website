'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#8bc9bc]/35 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border border-[#f4f2ed] bg-[#f4f2ed] text-[#151514] hover:bg-white',
        primary:
          'border border-[#f4f2ed] bg-[#f4f2ed] text-[#151514] hover:bg-white',
        secondary:
          'border border-white/15 text-[#deddd8] hover:border-white/30 hover:bg-white/5 hover:text-white',
        outline:
          'border border-white/15 bg-transparent text-[#deddd8] hover:border-white/30 hover:bg-white/5 hover:text-white',
        ghost:
          'text-[#aaa9a3] hover:bg-white/5 hover:text-white',
        destructive:
          'border border-red-400/40 bg-red-500/15 text-red-100 hover:bg-red-500/25',
        link: 'h-auto rounded-none p-0 text-[#8bc9bc] underline-offset-4 hover:text-[#b4ded5] hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-5 text-sm',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type={asChild ? undefined : (type ?? 'button')}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
