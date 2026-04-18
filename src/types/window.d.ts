export {};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __mirrorNeuronMaintenanceMode?: boolean;
    __setMirrorNeuronMaintenanceMode?: (value: boolean) => void;
  }
}
