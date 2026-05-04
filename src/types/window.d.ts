export {};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __mnPendingAnalyticsEvents?: Array<{
      eventName: string;
      params: Record<string, string | number | boolean | null>;
    }>;
    __mirrorNeuronMaintenanceMode?: boolean;
    __setMirrorNeuronMaintenanceMode?: (value: boolean) => void;
  }
}
