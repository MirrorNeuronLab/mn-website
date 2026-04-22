'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import {
  trackEvent,
  type AnalyticsEventParams,
} from '@/lib/analytics';

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventParams?: AnalyticsEventParams;
};

export default function TrackedLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventParams);
        onClick?.(event);
      }}
    />
  );
}
