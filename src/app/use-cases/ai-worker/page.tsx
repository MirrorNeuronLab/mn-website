import UseCasePage from '@/components/use-cases/UseCasePage';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Agent Workflows and Background Loops',
  path: '/use-cases/ai-worker',
  description:
    'Run background AI agents and long-running workflow loops with durable state, sleep, resume, recovery, and bounded tool execution.',
  keywords: [
    'background agent workflows',
    'long-running AI agents',
    'local AI workflows',
  ],
});

export default function AiWorkerUseCase() {
  return (
    <UseCasePage
      eventKey="ai_worker"
      eyebrow="Background agents"
      title="Agents that keep their place."
      description="Run agents that research, monitor, call tools, wait for new work, and resume after interruptions. MirrorNeuron manages the lifecycle while your code stays focused on the job."
      challengeTitle="A script is easy to start. Keeping it useful is the real work."
      challenge={[
        'Background agents rarely finish in one request. They wait on events, call unreliable tools, pause for people, and return later with the right context.',
        'Building that lifecycle into every script duplicates state, retry, scheduling, and recovery code. A broad orchestration platform can be more system than the first agent needs.',
      ]}
      capabilities={[
        {
          title: 'Sleep and wake without polling',
          text: 'Pause between events or review cycles, then resume without keeping an active agent process busy.',
        },
        {
          title: 'Bound tool execution',
          text: 'Run terminal and tool work inside configured sandboxes with explicit workspace and network policy.',
        },
        {
          title: 'Recover after restarts',
          text: 'Persist workflow state so a long-running job can continue from a known point after a worker or machine restarts.',
        },
      ]}
      blueprintsTitle="Start from a working agent loop."
      blueprints={[
        {
          title: 'Python SDK Workflow',
          text: 'Compile and run a decorated two-agent workflow, then adapt the stages and tools to your own background work.',
          href: 'https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/demo_python_sdk_workflow',
          slug: 'demo_python_sdk_workflow',
        },
        {
          title: 'Stream Backpressure',
          text: 'Process a finite burst through a bounded queue and keep pressure handling inside the workflow runtime.',
          href: 'https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/demo_stream_backpressure',
          slug: 'demo_stream_backpressure',
        },
      ]}
      closingTitle="Give long-running agents a small runtime."
      closingText="Start on one machine near the tools and data the workflow needs. Add capacity only when the work grows."
    />
  );
}
