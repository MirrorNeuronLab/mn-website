import * as React from 'react';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-11 w-full min-w-0 rounded-xl border border-white/10 bg-[#11110f] px-4 py-2 text-base text-[#f4f2ed] outline-none transition-colors placeholder:text-[#66655f] focus:border-[#8bc9bc]/50 focus:ring-2 focus:ring-[#8bc9bc]/10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
