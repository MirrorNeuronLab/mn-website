'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold outline-none transition-all focus-visible:border-cyan-300/50 focus-visible:ring-2 focus-visible:ring-cyan-300/25 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border border-cyan-200/70 bg-cyan-300 text-slate-950 shadow-[0_18px_45px_rgba(34,211,238,0.18)] hover:-translate-y-0.5 hover:bg-cyan-200',
        primary:
          'border border-cyan-200/70 bg-cyan-300 text-slate-950 shadow-[0_18px_45px_rgba(34,211,238,0.18)] hover:-translate-y-0.5 hover:bg-cyan-200',
        secondary:
          'border border-slate-700 text-slate-100 hover:border-slate-500 hover:bg-slate-900/60 hover:text-white',
        outline:
          'border border-slate-700 bg-slate-950/30 text-slate-100 hover:border-cyan-400/40 hover:bg-slate-900/80 hover:text-white',
        ghost:
          'text-slate-300 hover:bg-slate-900/70 hover:text-white',
        destructive:
          'border border-red-400/40 bg-red-500/15 text-red-100 hover:bg-red-500/25',
        link: 'h-auto rounded-none p-0 text-cyan-300 underline-offset-4 hover:text-cyan-100 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-12 px-6 text-base',
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
