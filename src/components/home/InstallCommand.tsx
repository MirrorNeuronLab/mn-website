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
import { trackEvent } from '@/lib/analytics';
import { copyTextToClipboard } from '@/lib/clipboard';
import { cn } from '@/lib/utils';

type InstallCommandProps = {
  command: string;
  runCommand?: string;
  className?: string;
};

const defaultRunCommand = 'mn blueprint run drug_discovery_simulation';

export default function InstallCommand({
  command,
  runCommand = defaultRunCommand,
  className,
}: InstallCommandProps) {
  const [copied, setCopied] = useState(false);
  const commands = [command, runCommand];
  const copyCommand = async () => {
    const copiedText = commands.join('\n');
    const didCopy = await copyTextToClipboard(copiedText);

    if (!didCopy) {
      return;
    }

    trackEvent('copy_install_command', {
      location: 'hero',
      command: copiedText,
    });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cn('mn-shell-panel w-full max-w-2xl', className)}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="mn-shell-label mb-0">
          <span className="mn-shell-sigil">&gt;_</span>
          Install and run
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={copyCommand}
                aria-label="Copy install and run commands"
                className="h-8 w-8 rounded-lg border-slate-700 bg-slate-900/80 text-slate-400 hover:border-cyan-400/40 hover:bg-slate-800 hover:text-cyan-100"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-300" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {copied ? 'Copied' : 'Copy install and run commands'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <pre className="max-w-full overflow-x-auto whitespace-pre font-mono text-xs leading-6 text-mn-shell-code sm:text-sm sm:leading-7">
        <code>
          {commands.map((item) => (
            <span key={item} className="block">
              <span className="text-mn-shell-prompt">$ </span>
              {item}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
