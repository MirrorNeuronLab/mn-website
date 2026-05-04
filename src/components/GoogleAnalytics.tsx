'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { siteConfig } from '@/lib/site';
import { flushPendingEvents, trackEvent } from '@/lib/analytics';

const CONSENT_KEY = 'cookie-consent';

function hasAcceptedConsent() {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const syncConsent = () => {
      setEnabled(hasAcceptedConsent());
    };

    syncConsent();
    window.addEventListener('storage', syncConsent);
    window.addEventListener('cookie-consent-changed', syncConsent);

    return () => {
      window.removeEventListener('storage', syncConsent);
      window.removeEventListener('cookie-consent-changed', syncConsent);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !ready || !window.gtag) {
      return;
    }

    flushPendingEvents();
    window.gtag('event', 'page_view', {
      event_category: 'navigation',
      key_action: false,
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
      transport_type: 'beacon',
    });
  }, [enabled, pathname, ready]);

  useEffect(() => {
    if (!enabled || !ready) {
      return;
    }

    const reachedThresholds = new Set<number>();

    const trackScrollDepth = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const percentScrolled = Math.round(
        (window.scrollY / scrollableHeight) * 100,
      );

      [50, 90].forEach((threshold) => {
        if (
          percentScrolled >= threshold &&
          !reachedThresholds.has(threshold)
        ) {
          reachedThresholds.add(threshold);
          trackEvent('scroll_depth', {
            percent_scrolled: threshold,
            page_path: pathname,
          });
        }
      });
    };

    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    trackScrollDepth();

    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
    };
  }, [enabled, pathname, ready]);

  if (!enabled || !siteConfig.googleAnalyticsId) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${siteConfig.googleAnalyticsId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
