import UseCasePage from '@/components/use-cases/UseCasePage';
import { createMetadata } from '@/lib/site';

export const metadata = createMetadata({
  title: 'Science and Research Workflows',
  path: '/use-cases/science',
  description:
    'Run durable scientific AI workflows, simulations, and research loops near private data with persisted state and recovery.',
  keywords: [
    'self-hosted scientific AI',
    'scientific workflows',
    'deep research runtime',
  ],
});

export default function ScienceUseCase() {
  return (
    <UseCasePage
      eventKey="science"
      eyebrow="Science and research"
      title="Research workflows that do not lose the experiment."
      description="Run simulations, discovery loops, and multi-stage analysis close to lab data, internal tools, and private compute. Preserve the work through long runs and ordinary failures."
      challengeTitle="Research is iterative. The runtime has to remember every turn."
      challenge={[
        'A discovery loop can query databases, run predictions, score candidates, ask for review, and use the result to plan another round. A simulation may fan out before aggregating a result.',
        'When a tool or worker fails late in a long run, the workflow needs a known recovery point—not another start from the beginning.',
      ]}
      capabilities={[
        {
          title: 'Parallel workflow graphs',
          text: 'Distribute logical workers across eligible runtime nodes, then aggregate their outputs into the next stage.',
        },
        {
          title: 'Multi-stage research loops',
          text: 'Define explicit stages where agents exchange artifacts, branch, repeat, and pause for review.',
        },
        {
          title: 'Persisted run state',
          text: 'Keep job metadata, events, and terminal state inspectable and recovery-aware after interruptions.',
        },
      ]}
      blueprintsTitle="Start from a working research loop."
      blueprints={[
        {
          title: 'Ecosystem Science Research',
          text: 'Run a deterministic multi-region ecosystem simulation and use one LLM to explain the frozen scientific result.',
          href: 'https://github.com/MirrorNeuronLab/mn-blueprints/tree/main/ecosystem_science_research',
          slug: 'ecosystem_science_research',
        },
      ]}
      closingTitle="Keep infrastructure from becoming another research project."
      closingText="Start beside private research data on one machine, then add capacity without redesigning the workflow around a general-purpose platform."
    />
  );
}
