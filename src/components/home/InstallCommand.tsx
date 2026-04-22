'use client';

import ShellCommand from '@/components/ui/shell-command';

type InstallCommandProps = {
  command: string;
};

export default function InstallCommand({ command }: InstallCommandProps) {
  return (
    <ShellCommand
      command={command}
      label="Copy and install"
      eventName="copy_install_command"
      eventParams={{ location: 'hero' }}
      copyControl="icon"
      variant="bare"
      className="mn-shell-panel w-full max-w-2xl"
    />
  );
}
