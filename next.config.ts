import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/01-agents-need-an-operating-model",
        destination: "/blog/agents-need-an-operating-model",
        permanent: true,
      },
      {
        source: "/blog/02-the-real-problem-is-recovery",
        destination: "/blog/ai-demos-fail-because-of-recovery",
        permanent: true,
      },
      {
        source: "/blog/03-memory-is-not-just-context",
        destination: "/blog/memory-is-not-just-context-window-stuffing",
        permanent: true,
      },
      {
        source: "/blog/04-local-first-ai-workflows",
        destination: "/blog/local-first-ai-workflows",
        permanent: true,
      },
      {
        source: "/blog/05-from-prompts-to-blueprints",
        destination: "/blog/from-prompts-to-blueprints",
        permanent: true,
      },
      {
        source: "/blog/06-the-case-for-human-checkpoints",
        destination: "/blog/human-checkpoints-for-ai-workflows",
        permanent: true,
      },
      {
        source: "/blog/07-why-verification-will-matter",
        destination: "/blog/verification-for-agent-workflows",
        permanent: true,
      },
      {
        source: "/blog/08-why-multi-agent-systems-feel-chaotic",
        destination: "/blog/why-multi-agent-systems-feel-chaotic",
        permanent: true,
      },
      {
        source: "/blog/09-workflow-is-the-new-user-interface",
        destination: "/blog/workflow-is-the-new-user-interface",
        permanent: true,
      },
      {
        source: "/blog/10-software-is-becoming-continuous",
        destination: "/blog/software-is-becoming-continuous",
        permanent: true,
      },
      {
        source: "/blog/11-the-runtime-is-the-product",
        destination: "/blog/agent-runtime-is-the-product",
        permanent: true,
      },
      {
        source: "/blog/12-how-we-built-our-market-simulator",
        destination: "/blog/multi-agent-synthetic-market-simulator",
        permanent: true,
      },
      {
        source: "/blog/how-we-built-our-market-simulator",
        destination: "/blog/multi-agent-synthetic-market-simulator",
        permanent: true,
      },
      {
        source: "/blog/13-introducing-mirrorneuron-v1",
        destination: "/blog/why-we-built-mirrorneuron-ai-workflow-runtime",
        permanent: true,
      },
      {
        source: "/blog/introducing-mirrorneuron-v1",
        destination: "/blog/why-we-built-mirrorneuron-ai-workflow-runtime",
        permanent: true,
      },
      {
        source: "/blog/14-the-future-of-autonomous-devops",
        destination:
          "/blog/workflow-is-becoming-the-software-ai-agent-workflow-stack",
        permanent: true,
      },
      {
        source: "/blog/the-future-of-autonomous-devops",
        destination:
          "/blog/workflow-is-becoming-the-software-ai-agent-workflow-stack",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
