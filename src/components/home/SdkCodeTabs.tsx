'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

type CodeTab = {
  id: 'python' | 'typescript' | 'json';
  label: string;
  filename: string;
  code: string;
};

type TokenKind =
  | 'comment'
  | 'decorator'
  | 'keyword'
  | 'number'
  | 'string'
  | 'text';

const tokenStyles: Record<TokenKind, string> = {
  comment: 'text-slate-500',
  decorator: 'text-fuchsia-300',
  keyword: 'text-sky-300',
  number: 'text-amber-300',
  string: 'text-emerald-300',
  text: 'text-slate-200',
};

const keywordPattern = {
  python:
    'async|await|break|class|def|except|for|from|if|import|in|return|self|try|with|as',
  typescript:
    'async|await|catch|class|const|for|from|function|if|import|new|private|return|try|type',
  json: 'true|false|null',
} satisfies Record<CodeTab['id'], string>;

const pythonExample = `from mn_sdk import agent, workflow
from existing_research import collect_research_summary, save_summary


TOPIC = "electric vehicle charging adoption in New England"


# Reuse your existing code. MirrorNeuron only wires it into a durable run.
class ResearchAgents:
    @agent.defn(name="ingress", type="map")
    def ingress(self, topic: str):
        return {
            "message_type": "research_request",
            "topic": topic,
            "text": "Collect a short research summary.",
        }

    @agent.defn(name="retriever", type="map")
    def retriever(self, request):
        summary = collect_research_summary(
            topic=request["topic"],
            instructions=request["text"],
        )
        return {"message_type": "research_request", "summary": summary}

    @agent.defn(name="reviewer", type="reduce")
    def reviewer(self, result):
        save_summary(result["summary"])
        return {"status": "saved"}


@workflow.defn(name="marketing_research_flow_v1")
class MarketingResearchFlow:
    def __init__(self):
        self.agents = ResearchAgents()

    @workflow.run
    def run(self):
        request = self.agents.ingress(TOPIC)
        result = self.agents.retriever(request)
        return self.agents.reviewer(result)`;

const typescriptExample = `import { agent, workflow, workflowRun } from 'mn-sdk';
import { collectResearchSummary, saveSummary } from './existing-research';

const TOPIC = 'electric vehicle charging adoption in New England';

type ResearchRequest = {
  messageType: 'research_request';
  topic?: string;
  text?: string;
  summary?: string;
};

// Reuse your existing code. MirrorNeuron only wires it into a durable run.
class ResearchAgents {
  @agent('ingress', { type: 'map' })
  ingress(topic: string): ResearchRequest {
    return {
      messageType: 'research_request',
      topic,
      text: 'Collect a short research summary.',
    };
  }

  @agent('retriever', { type: 'map' })
  async retriever(request: ResearchRequest): Promise<ResearchRequest> {
    const summary = await collectResearchSummary({
      topic: request.topic,
      instructions: request.text,
    });
    return { messageType: 'research_request', summary };
  }

  @agent('reviewer', { type: 'reduce' })
  async reviewer(result: ResearchRequest) {
    await saveSummary(result.summary);
    return { status: 'saved' };
  }
}

@workflow('marketing_research_flow_v1')
class MarketingResearchFlow {
  private agents = new ResearchAgents();

  @workflowRun()
  async run() {
    const request = this.agents.ingress(TOPIC);
    const result = await this.agents.retriever(request);
    return this.agents.reviewer(result);
  }
}`;

const jsonExample = `{
  "_comment": "Reuse your existing agent code. This manifest only defines the durable chain.",
  "manifest_version": "1.0",
  "graph_id": "marketing_research_flow_v1",
  "job_name": "market-analysis",
  "entrypoints": ["ingress"],
  "initial_inputs": {
    "ingress": [
      {
        "topic": "electric vehicle charging adoption in New England",
        "text": "Collect a short research summary."
      }
    ]
  },
  "nodes": [
    {
      "node_id": "ingress",
      "agent_type": "router",
      "type": "map",
      "role": "root_coordinator",
      "config": {
        "emit_type": "research_request"
      }
    },
    {
      "node_id": "retriever",
      "agent_type": "router",
      "type": "map",
      "role": "researcher"
    },
    {
      "node_id": "reviewer",
      "agent_type": "aggregator",
      "type": "reduce",
      "role": "result_sink",
      "config": {
        "complete_on_message": true
      }
    }
  ],
  "edges": [
    {
      "edge_id": "ingress_to_retriever",
      "from_node": "ingress",
      "to_node": "retriever",
      "message_type": "research_request"
    },
    {
      "edge_id": "retriever_to_reviewer",
      "from_node": "retriever",
      "to_node": "reviewer",
      "message_type": "research_request"
    }
  ],
  "policies": {
    "recovery_mode": "local_restart"
  }
}`;

const tabs: CodeTab[] = [
  {
    id: 'python',
    label: 'Python',
    filename: 'sdk_example.py',
    code: pythonExample,
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    filename: 'sdk_example.ts',
    code: typescriptExample,
  },
  {
    id: 'json',
    label: 'JSON',
    filename: 'manifest.json',
    code: jsonExample,
  },
];

function commentIndex(line: string, language: CodeTab['id']) {
  if (language === 'json') {
    return -1;
  }

  const marker = language === 'python' ? '#' : '//';
  return line.indexOf(marker);
}

function tokenKind(token: string, language: CodeTab['id']): TokenKind {
  if (/^@\w/.test(token)) {
    return 'decorator';
  }

  if (/^[fbrFBR]*['"`]/.test(token)) {
    return 'string';
  }

  if (/^\d/.test(token)) {
    return 'number';
  }

  if (new RegExp(`^(${keywordPattern[language]})$`).test(token)) {
    return 'keyword';
  }

  return 'text';
}

function highlightCode(code: string, language: CodeTab['id']) {
  const tokenPattern = new RegExp(
    `(@\\w+(?:\\.\\w+)?|[fbrFBR]*"(?:\\\\.|[^"\\\\])*"|[fbrFBR]*'(?:\\\\.|[^'\\\\])*'|\`(?:\\\\.|[^\`\\\\])*\`|\\b(?:${keywordPattern[language]})\\b|\\b\\d+(?:\\.\\d+)?\\b)`,
    'g'
  );

  return code.split('\n').map((line, lineIndex) => {
    const lineCommentIndex = commentIndex(line, language);
    const codePart =
      lineCommentIndex >= 0 ? line.slice(0, lineCommentIndex) : line;
    const commentPart =
      lineCommentIndex >= 0 ? line.slice(lineCommentIndex) : '';
    const nodes: ReactNode[] = [];
    let cursor = 0;

    for (const match of codePart.matchAll(tokenPattern)) {
      const token = match[0];
      const index = match.index ?? 0;

      if (index > cursor) {
        nodes.push(codePart.slice(cursor, index));
      }

      const kind = tokenKind(token, language);
      nodes.push(
        <span key={`${lineIndex}-${index}`} className={tokenStyles[kind]}>
          {token}
        </span>
      );
      cursor = index + token.length;
    }

    if (cursor < codePart.length) {
      nodes.push(codePart.slice(cursor));
    }

    if (commentPart) {
      nodes.push(
        <span key={`${lineIndex}-comment`} className={tokenStyles.comment}>
          {commentPart}
        </span>
      );
    }

    return (
      <span key={lineIndex} className="block min-h-6 sm:min-h-7">
        {nodes.length ? nodes : ' '}
      </span>
    );
  });
}

export default function SdkCodeTabs() {
  const [activeTab, setActiveTab] = useState<CodeTab['id']>('python');
  const activeExample = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <div className="min-w-0 rounded-2xl border border-slate-700/70 bg-[#0d1117] shadow-2xl">
      <div className="flex flex-col gap-3 border-b border-slate-700/70 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-cyan-300 text-slate-950'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="font-mono text-xs text-slate-400">
          {activeExample.filename}
        </div>
      </div>
      <div className="max-h-[42rem] min-w-0 overflow-auto p-4 sm:p-6">
        <pre className="min-w-[34rem] font-mono text-xs leading-6 text-slate-200 sm:min-w-max sm:text-sm sm:leading-7">
          <code>{highlightCode(activeExample.code, activeExample.id)}</code>
        </pre>
      </div>
    </div>
  );
}
