'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { siteConfig } from '@/lib/site';

const CONSENT_KEY = 'cookie-consent';

function hasAcceptedConsent() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(CONSENT_KEY) === 'accepted';
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

    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
      transport_type: 'beacon',
    });
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
