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

function hrefToString(href: ComponentProps<typeof Link>['href']) {
  if (typeof href === 'string') {
    return href;
  }

  const pathname = href.pathname?.toString() ?? '';
  const query = href.query
    ? new URLSearchParams(
        Object.entries(href.query).flatMap(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((item) => [key, String(item)]);
          }

          return value === undefined ? [] : [[key, String(value)]];
        }),
      ).toString()
    : '';

  return query ? `${pathname}?${query}` : pathname;
}

export default function TrackedLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  const href = hrefToString(props.href);
  const linkText = typeof props.children === 'string' ? props.children : undefined;
  const outbound =
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    props.target === '_blank';

  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, {
          link_url: href,
          link_text: linkText,
          outbound,
          ...eventParams,
        });
        onClick?.(event);
      }}
    />
  );
}
