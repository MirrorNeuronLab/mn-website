'use client';

import { useState } from 'react';

type InstallCommandProps = {
  command: string;
};

export default function InstallCommand({ command }: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-blue-500/20 bg-[#05080f] p-2 shadow-[0_0_0_1px_rgba(59,130,246,0.08),0_20px_80px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-[#0a0f1c] p-4 sm:flex-row sm:items-center sm:justify-between">
        <code className="block overflow-x-auto whitespace-nowrap text-sm text-slate-200">
          {command}
        </code>
        <button
          type="button"
          onClick={copyCommand}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
