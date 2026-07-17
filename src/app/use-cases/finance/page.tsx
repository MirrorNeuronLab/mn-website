import UseCasePage from '@/components/use-cases/UseCasePage';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Finance AI Workflow Runtime',
  path: '/use-cases/finance',
  description:
    'Run durable financial AI workflows, market simulations, and risk monitors near sensitive data with persisted state and recovery.',
  keywords: [
    'self-hosted finance AI',
    'financial AI workflows',
    'durable finance agents',
  ],
});

export default function FinanceUseCase() {
  return (
    <UseCasePage
      eventKey="finance"
      eyebrow="Finance"
      title="Financial AI workflows near sensitive data."
      description="Run market monitors, risk simulations, and analysis loops beside the feeds and systems they need. Keep state through interruptions and results open to review."
      command={{
        value: 'mn blueprint run vc_assistant',
        label: 'Run finance blueprint',
        title: 'Test the workflow before designing the platform.',
        text: 'Run a complete market-risk workflow, inspect its stages, then replace the mock feeds with your own adapters and controls.',
      }}
      challengeTitle="Markets keep moving after the model responds."
      challenge={[
        'Feeds update, tools fail, limits change, and people need to review decisions. A useful workflow must preserve its state across all of them.',
        'The runtime should keep sensitive adapters and data paths close without making the team build custom recovery logic for every analysis loop.',
      ]}
      capabilities={[
        {
          title: 'Work that outlives a request',
          text: 'Keep market monitors, event processors, and review cycles running for as long as the analysis needs.',
        },
        {
          title: 'State teams can inspect',
          text: 'Persist job state, events, and artifacts so a team can understand what ran and recover from a known point.',
        },
        {
          title: 'Deployment beside private systems',
          text: 'Run close to sensitive feeds and internal risk tools, then add trusted nodes without rewriting the workflow.',
        },
      ]}
      blueprintsTitle="Start from finance workflows you can inspect."
      blueprints={[
        {
          title: 'VC Assistant',
          text: 'Turn mixed startup document packets into source-grounded heuristic reports, research ledgers, and batch coverage summaries.',
          href: 'https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/vc_assistant',
          slug: 'vc_assistant',
        },
      ]}
      closingTitle="Keep execution close to the data."
      closingText="MirrorNeuron provides state, history, retries, and recovery in a runtime you can deploy inside your environment."
    />
  );
}
