'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  trackEvent,
  type AnalyticsEventParams,
} from '@/lib/analytics';
import { copyTextToClipboard } from '@/lib/clipboard';

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
    const didCopy = await copyTextToClipboard(command);

    if (!didCopy) {
      return;
    }

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
      } min-w-0 ${className}`}
    >
      <div
        className={
          isCompact || isBare
            ? ''
            : 'mn-shell-panel flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'
        }
      >
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="mn-shell-label mb-0">
              <span className="mn-shell-sigil">&gt;_</span>
              {label}
            </div>
            {iconCopy ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyCommand}
                      aria-label={
                        copied
                          ? `${label} command copied`
                          : `Copy ${label.toLowerCase()} command`
                      }
                      className="h-8 w-8 border-white/10 bg-white/[0.035] text-[#777671] hover:border-white/25 hover:bg-white/[0.06] hover:text-[#dcebe7]"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-300" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only" aria-live="polite">
                        {copied ? `${label} command copied` : ''}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {copied ? 'Copied' : `Copy ${label.toLowerCase()} command`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
          </div>
          <code className="mn-shell-command">
            <span className="mn-shell-prompt">$ </span>
            {command}
          </code>
        </div>
        {!iconCopy ? (
          <Button
            type="button"
            onClick={copyCommand}
            size="sm"
            className="shrink-0"
          >
            {copied ? 'Copied' : 'Copy'}
            <span className="sr-only" aria-live="polite">
              {copied ? `${label} command copied` : ''}
            </span>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
