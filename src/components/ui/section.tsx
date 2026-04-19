import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: 'default' | 'muted' | 'deep';
};

const toneClasses = {
  default: 'mn-section',
  muted: 'mn-section mn-section-muted',
  deep: 'mn-section mn-section-deep',
};

export function Section({
  className,
  tone = 'default',
  ...props
}: SectionProps) {
  return <section className={cn(toneClasses[tone], className)} {...props} />;
}
