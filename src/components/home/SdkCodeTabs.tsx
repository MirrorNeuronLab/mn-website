'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

type CodeTab = {
  id: 'python' | 'typescript';
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
} satisfies Record<CodeTab['id'], string>;

const pythonExample = `import asyncio
import json

from mn_sdk import Client, agent, workflow


# --- Decorators Example ---

class CustomAgents:
    @agent.defn(name="code-reviewer")
    def review_code(self, code: str):
        print(f"[Code Review Agent] Analyzing code: {code[:30]}...")
        return {"status": "passed", "issues": []}

    @agent.defn(name="tester")
    def run_tests(self):
        print("[Testing Agent] Running tests...")
        return {"status": "passed"}


@workflow.defn(name="CodeDeliveryWorkflow")
class DeliveryWorkflow:
    def __init__(self):
        self.agents = CustomAgents()

    @workflow.run
    async def execute_workflow(self, code: str):
        print("Starting delivery workflow...")
        review_result = self.agents.review_code(code)
        if review_result["status"] == "passed":
            test_result = self.agents.run_tests()
            print(f"Workflow completed. Test status: {test_result['status']}")


# --- Client Example ---

async def run_client_example():
    client = Client("localhost:50051")

    try:
        print("--- Submitting a Job ---")
        manifest_json = json.dumps({
            "version": "1.0",
            "command": "python script.py",
        })

        payloads = {
            "script.py": b'print("Hello from Mirror Neuron Python SDK!")',
        }

        job_id = await client.submit_job(manifest_json, payloads)
        print(f"Successfully submitted job with ID: {job_id}")

        print("\\n--- Getting Job Status ---")
        job_status_json = await client.get_job(job_id)
        print(f"Job Status: {job_status_json}")

        print("\\n--- Streaming Job Events ---")
        # Note: In a real system, you might want to break out of this loop
        # once the job reaches a terminal state (COMPLETED, FAILED, CANCELED).
        async for event_json in client.stream_events(job_id):
            print(f"Received event: {event_json}")

            # Example: Parsing the JSON and stopping if it's a completion event
            # event = json.loads(event_json)
            # if event["type"] == "JOB_COMPLETED":
            #     break

    except Exception as error:
        print(f"Error during client example: {error}")


# Run the examples
async def main():
    print("=== Running Decorator Example ===")
    delivery_workflow = DeliveryWorkflow()
    await delivery_workflow.execute_workflow("function test() { return true; }")

    print("\\n=== Running Client Example ===")
    # To run the client example, you need a running Mirror Neuron gRPC server.
    # Uncomment the line below to test it against a real server.
    # await run_client_example()
    print(
        "(Client example is commented out by default as it requires a running gRPC server on localhost:50051)"
    )


asyncio.run(main())`;

const typescriptExample = `import { Client, agent, workflow, workflowRun } from '../src';
import * as fs from 'fs';
import * as path from 'path';

// --- Decorators Example ---

class CustomAgents {
  @agent('code-reviewer')
  reviewCode(code: string) {
    console.log(\`[Code Review Agent] Analyzing code: \${code.substring(0, 30)}...\`);
    return { status: 'passed', issues: [] };
  }

  @agent('tester')
  runTests() {
    console.log('[Testing Agent] Running tests...');
    return { status: 'passed' };
  }
}

@workflow('CodeDeliveryWorkflow')
class DeliveryWorkflow {
  private agents = new CustomAgents();

  @workflowRun()
  async executeWorkflow(code: string) {
    console.log('Starting delivery workflow...');
    const reviewResult = this.agents.reviewCode(code);
    if (reviewResult.status === 'passed') {
      const testResult = this.agents.runTests();
      console.log(\`Workflow completed. Test status: \${testResult.status}\`);
    }
  }
}

// --- Client Example ---

async function runClientExample() {
  const client = new Client('localhost:50051');

  try {
    console.log('--- Submitting a Job ---');
    const manifestJson = JSON.stringify({
      version: '1.0',
      command: 'python script.py',
    });

    const payloads: Record<string, Buffer> = {
      'script.py': Buffer.from('print("Hello from Mirror Neuron TS SDK!")'),
    };

    const jobId = await client.submitJob(manifestJson, payloads);
    console.log(\`Successfully submitted job with ID: \${jobId}\`);

    console.log('\\n--- Getting Job Status ---');
    const jobStatusJson = await client.getJob(jobId);
    console.log(\`Job Status: \${jobStatusJson}\`);

    console.log('\\n--- Streaming Job Events ---');
    // Note: In a real system, you might want to break out of this loop
    // once the job reaches a terminal state (COMPLETED, FAILED, CANCELED).
    for await (const eventJson of client.streamEvents(jobId)) {
      console.log(\`Received event: \${eventJson}\`);

      // Example: Parsing the JSON and stopping if it's a completion event
      // const event = JSON.parse(eventJson);
      // if (event.type === 'JOB_COMPLETED') break;
    }
  } catch (error) {
    console.error('Error during client example:', error);
  }
}

// Run the examples
async function main() {
  console.log('=== Running Decorator Example ===');
  const workflow = new DeliveryWorkflow();
  await workflow.executeWorkflow('function test() { return true; }');

  console.log('\\n=== Running Client Example ===');
  // To run the client example, you need a running Mirror Neuron gRPC server.
  // Uncomment the line below to test it against a real server.
  // await runClientExample();
  console.log(
    '(Client example is commented out by default as it requires a running gRPC server on localhost:50051)'
  );
}

main();`;

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
];

function commentIndex(line: string, language: CodeTab['id']) {
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
      <span key={lineIndex} className="block min-h-7">
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
      <div className="flex flex-col gap-4 border-b border-slate-700/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex rounded-xl border border-slate-800 bg-slate-950/70 p-1">
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
      <div className="max-h-[42rem] min-w-0 overflow-auto p-6">
        <pre className="min-w-max font-mono text-sm leading-7 text-slate-200">
          <code>{highlightCode(activeExample.code, activeExample.id)}</code>
        </pre>
      </div>
    </div>
  );
}
