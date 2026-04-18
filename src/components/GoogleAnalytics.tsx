'use client';

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
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${siteConfig.googleAnalyticsId}');
        `}
      </Script>
    </>
  );
}
