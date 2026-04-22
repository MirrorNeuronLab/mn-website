'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import {
  trackEvent,
  type AnalyticsEventParams,
} from '@/lib/analytics';

type ShellCommandProps = {
  command: string;
  label: string;
  eventName: string;
  eventParams?: AnalyticsEventParams;
  variant?: 'default' | 'compact' | 'bare';
  copyControl?: 'text' | 'icon';
  className?: string;
};

export default function ShellCommand({
  command,
  label,
  eventName,
  eventParams,
  variant = 'default',
  copyControl = variant === 'compact' ? 'icon' : 'text',
  className = '',
}: ShellCommandProps) {
  const [copied, setCopied] = useState(false);
  const isCompact = variant === 'compact';
  const isBare = variant === 'bare';
  const iconCopy = copyControl === 'icon';

  const copyCommand = async () => {
    await navigator.clipboard.writeText(command);
    trackEvent(eventName, {
      ...eventParams,
      command,
    });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`${
        isBare ? '' : isCompact ? 'mn-shell-panel-compact' : 'mn-shell-card'
      } ${className}`}
    >
      <div
        className={
          isCompact || isBare
            ? ''
            : 'mn-shell-panel flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'
        }
      >
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="mn-shell-label mb-0">
              <span className="mn-shell-sigil">&gt;_</span>
              {label}
            </div>
            {iconCopy ? (
              <button
                type="button"
                onClick={copyCommand}
                aria-label={`Copy ${label.toLowerCase()} command`}
                title={copied ? 'Copied' : `Copy ${label.toLowerCase()} command`}
                className="mn-shell-copy-compact"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-300" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            ) : null}
          </div>
          <code className="mn-shell-command">
            <span className="mn-shell-prompt">$ </span>
            {command}
          </code>
        </div>
        {!iconCopy ? (
          <button type="button" onClick={copyCommand} className="mn-shell-copy">
            {copied ? 'Copied' : 'Copy'}
          </button>
        ) : null}
      </div>
    </div>
  );
}
