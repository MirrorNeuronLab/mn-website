type AnalyticsValue = string | number | boolean | null | undefined;

export type AnalyticsEventParams = Record<string, AnalyticsValue>;

const CONSENT_KEY = 'cookie-consent';
const MAX_PENDING_EVENTS = 30;

const keyActionEvents = new Set([
  'click_get_started',
  'open_blueprint_build_modal',
  'copy_install_command',
  'copy_blueprint_cli_step',
  'copy_blueprint_run_command',
  'copy_quickstart_example_command',
  'copy_blueprint_catalog_command',
  'copy_finance_blueprint_command',
  'open_blueprint',
  'open_featured_blueprint',
  'click_quickstart_docs',
  'click_use_case_docs',
  'click_why_blueprints',
  'open_github',
  'join_slack',
  'join_discord',
]);

function hasAnalyticsConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

function cleanParams(params: AnalyticsEventParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  ) as Record<string, string | number | boolean | null>;
}

function eventCategory(eventName: string) {
  if (eventName.startsWith('copy_')) {
    return 'command_copy';
  }

  if (eventName.startsWith('open_')) {
    return 'resource_open';
  }

  if (eventName.startsWith('join_')) {
    return 'community';
  }

  if (eventName.startsWith('search_') || eventName.startsWith('filter_')) {
    return 'discovery';
  }

  if (eventName.startsWith('scroll_')) {
    return 'engagement';
  }

  return 'navigation';
}

export function trackEvent(
  eventName: string,
  params: AnalyticsEventParams = {},
) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return;
  }

  const eventParams = cleanParams({
    event_category: eventCategory(eventName),
    key_action: keyActionEvents.has(eventName),
    ...params,
    transport_type: 'beacon',
  });

  if (!window.gtag) {
    window.__mnPendingAnalyticsEvents = [
      ...(window.__mnPendingAnalyticsEvents ?? []),
      { eventName, params: eventParams },
    ].slice(-MAX_PENDING_EVENTS);
    return;
  }

  window.gtag('event', eventName, eventParams);
}

export function flushPendingEvents() {
  if (
    typeof window === 'undefined' ||
    !window.gtag ||
    !hasAnalyticsConsent() ||
    !window.__mnPendingAnalyticsEvents?.length
  ) {
    return;
  }

  const pendingEvents = window.__mnPendingAnalyticsEvents;
  window.__mnPendingAnalyticsEvents = [];

  pendingEvents.forEach(({ eventName, params }) => {
    window.gtag?.('event', eventName, params);
  });
}
