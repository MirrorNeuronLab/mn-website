type AnalyticsValue = string | number | boolean | null | undefined;

export type AnalyticsEventParams = Record<string, AnalyticsValue>;

export function trackEvent(
  eventName: string,
  params: AnalyticsEventParams = {},
) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, {
    ...params,
    transport_type: 'beacon',
  });
}
