'use client';

import { type ReactNode, useEffect, useState } from 'react';

const DEFAULT_MAINTENANCE_MODE = false;

export default function MaintenanceOverlay({
  children,
}: {
  children: ReactNode;
}) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(
    DEFAULT_MAINTENANCE_MODE
  );

  useEffect(() => {
    window.__setMirrorNeuronMaintenanceMode = setIsMaintenanceMode;
    window.__mirrorNeuronMaintenanceMode = isMaintenanceMode;

    return () => {
      delete window.__setMirrorNeuronMaintenanceMode;
      delete window.__mirrorNeuronMaintenanceMode;
    };
  }, [isMaintenanceMode]);

  return (
    <div className="relative">
      <div
        className={
          isMaintenanceMode
            ? 'pointer-events-none select-none blur-md opacity-25'
            : undefined
        }
      >
        {children}
      </div>

      {isMaintenanceMode ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-6">
          <div className="w-full max-w-xl rounded-3xl border border-slate-700 bg-[#07101c]/95 p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl md:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Maintenance Mode
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Coming soon
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              We are tuning the new MirrorNeuron website. The page underneath is
              intentionally blurred while we test updates.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
