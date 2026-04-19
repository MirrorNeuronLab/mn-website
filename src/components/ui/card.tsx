import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'soft' | 'terminal';
};

const variantClasses = {
  default: 'mn-card',
  soft: 'mn-card-soft',
  terminal: 'mn-terminal',
};

export function Card({
  className,
  variant = 'default',
  ...props
}: CardProps) {
  return <div className={cn(variantClasses[variant], className)} {...props} />;
}
