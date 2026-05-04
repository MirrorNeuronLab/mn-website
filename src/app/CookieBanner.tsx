"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after a short delay for better UX
    const timer = setTimeout(() => {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        setIsVisible(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    trackEvent('accept_analytics_cookies', {
      event_category: 'consent',
      key_action: false,
    });
    window.dispatchEvent(new Event('cookie-consent-changed'));
    setIsVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    window.dispatchEvent(new Event('cookie-consent-changed'));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-5">
      <p className="text-sm text-slate-300 leading-relaxed">
        We use optional analytics cookies to understand aggregate site traffic
        and improve the website. See our{' '}
        <Link href="/privacy" className="text-blue-400 hover:text-blue-300 hover:underline">
          Privacy Policy
        </Link>.
      </p>
      <div className="flex justify-end gap-3 mt-2">
        <button 
          onClick={decline}
          className="text-sm px-4 py-2 font-medium text-slate-400 hover:text-white transition-colors"
        >
          Decline
        </button>
        <button 
          onClick={accept}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
