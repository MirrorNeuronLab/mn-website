import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

const variantClasses = {
  primary: 'mn-primary-action px-6 py-3',
  secondary: 'mn-secondary-action px-6 py-3',
  ghost:
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-semibold text-slate-300 transition-colors hover:bg-slate-900/70 hover:text-white',
};

export function Button({
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(variantClasses[variant], className)}
      {...props}
    />
  );
}
