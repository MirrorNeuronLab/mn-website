import {
  Clock3,
  Database,
  Globe,
  ShieldCheck,
  Workflow,
} from 'lucide-react';

export const comparisonRows = [
  {
    label: 'Can I use it today?',
    airflow: 'Only if your work already fits scheduled pipelines',
    temporal: 'Usually after learning and setting up the platform',
    mirrorNeuron: 'Yes. Prove a real AI workflow quickly before committing platform budget',
  },
  {
    label: 'What will it cost?',
    airflow: 'Time spent adapting AI work into pipeline patterns',
    temporal: 'Time spent learning and operating a broad workflow stack',
    mirrorNeuron: 'Lower adoption cost: reusable blueprints, normal code, less setup',
  },
  {
    label: 'Is it worth investing in?',
    airflow: 'Strong for data pipelines, less natural for AI agents',
    temporal: 'Strong for platform teams that need broad orchestration',
    mirrorNeuron: 'Yes. AI-native durability that grows from local proof to production',
  },
];

export const comparisonHighlights = [
  {
    eyebrow: 'AI-native',
    title: 'AI workflows need different reliability than web requests',
    description:
      'Give agents, tool calls, retries, sleep, resume, and background work a runtime designed for how AI systems actually behave.',
  },
  {
    eyebrow: 'Easy to adopt',
    title: 'Adoption should be low risk before it becomes strategic',
    description:
      'Start from a working blueprint, prove value with a small workflow, then expand when the organization is ready.',
  },
  {
    eyebrow: 'Durable without ceremony',
    title: 'Reliability should not become a platform tax',
    description:
      'Get retries, recovery, and long-running execution without forcing every team to operate a heavyweight orchestration layer.',
  },
];

export const productProofItems = [
  {
    icon: <ShieldCheck className="h-5 w-5 text-cyan-300" />,
    title: 'Control risky actions before they happen',
    text: 'Turn email sends, browser steps, file changes, and tool calls into explicit workflow stages with checkpoints and guardrails.',
  },
  {
    icon: <Database className="h-5 w-5 text-cyan-300" />,
    title: 'Reliable results you can resume',
    text: 'Persist state so long-running agent work can retry, recover, and continue instead of silently drifting or starting over.',
  },
  {
    icon: <Clock3 className="h-5 w-5 text-cyan-300" />,
    title: 'Repeatable workflows, not one-off runs',
    text: 'Move from a helpful personal assistant flow to reusable blueprints that can run again, run elsewhere, and be shared safely.',
  },
];

export const runtimeStats = [
  ['Scoped tools', '12'],
  ['Saved checkpoints', '18,402'],
  ['Recovered runs', '126'],
];

export const runtimeEvents = [
  ['openclaw.email-cleanup', 'approval required', 'text-orange-300'],
  ['tool.browser', 'scoped access granted', 'text-cyan-300'],
  ['workflow.deep-research', 'checkpoint saved', 'text-emerald-300'],
  ['result.validation', 'summary verified', 'text-emerald-300'],
];

export const runtimeBadges = [
  {
    icon: <ShieldCheck className="h-4 w-4 text-blue-400" />,
    label: 'Controlled agent actions',
  },
  {
    icon: <Workflow className="h-4 w-4 text-violet-400" />,
    label: 'Durable retries and resume',
  },
  {
    icon: <Globe className="h-4 w-4 text-emerald-400" />,
    label: 'Local, edge, or cloud',
  },
];

export const securityItems = [
  {
    title: 'Local-first options',
    text: 'Useful for private research, internal agents, and sensitive workflows that should stay on your infrastructure.',
  },
  {
    title: 'Bounded execution',
    text: 'Positioned around safe, controlled execution rather than giving long-lived agents unrestricted access by default.',
  },
  {
    title: 'Durable recovery',
    text: 'Workflow state and retry semantics help teams recover from failure without rebuilding business logic around outages.',
  },
  {
    title: 'Clear trust pages',
    text: 'Privacy and terms pages keep the project easier to evaluate while the Why page explains self-hosted security posture.',
  },
];
