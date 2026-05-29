'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type CodeTab = {
  id: 'python' | 'json';
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
  json: 'true|false|null',
} satisfies Record<CodeTab['id'], string>;

const pythonExample = `import json

from mn_sdk import RetryPolicy, RunnerConfig, agent, workflow


RETRY = RetryPolicy(max_attempts=2, backoff_ms=250)
RUNNER = RunnerConfig.host_local()


class HelloAgents:
    @agent.defn(name="hello", type="map", runner=RUNNER, retries=RETRY, timeout_seconds=10)
    def hello(self, name: str):
        return {"message_type": "hello_result", "text": f"Hello, {name}!"}


@workflow.defn(name="hello_world_v1", recovery_mode="cluster_recover")
class HelloWorldFlow:
    def __init__(self):
        self.agents = HelloAgents()

    @workflow.run
    def run(self):
        name = workflow.input("name", default="world")
        return self.agents.hello(name)


def run_local(name: str = "world") -> dict:
    agents = HelloAgents()
    return agents.hello(name)


if __name__ == "__main__":
    print(json.dumps(run_local(), indent=2, sort_keys=True))`;

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
    filename: 'hello_world.py',
    code: pythonExample,
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
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as CodeTab['id'])}
      className="min-w-0 gap-0 rounded-2xl border border-slate-700/70 bg-[#0d1117] shadow-2xl"
    >
      <div className="flex flex-col gap-3 border-b border-slate-700/70 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <TabsList className="overflow-x-auto rounded-xl border-slate-800 bg-slate-950/70">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="rounded-lg px-3 py-1.5 text-xs"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Badge variant="outline" className="font-mono text-[0.65rem] normal-case tracking-normal">
          {activeExample.filename}
        </Badge>
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-0">
          <div className="max-h-[42rem] min-w-0 overflow-auto p-4 sm:p-6">
            <pre className="min-w-[34rem] font-mono text-xs leading-6 text-slate-200 sm:min-w-max sm:text-sm sm:leading-7">
              <code>{highlightCode(tab.code, tab.id)}</code>
            </pre>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
