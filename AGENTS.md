<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Product And Messaging Intent

- MirrorNeuron should be positioned as the simplest way to run durable AI workflows.
- The key differentiation is ease of use compared with Airflow or Temporal, not just raw runtime capability.
- Preferred framing: durable execution without orchestration complexity.
- Acceptable comparison model: MirrorNeuron should feel to durable AI workflows like Ollama feels to local models, meaning powerful but easy to adopt.
- Favor plain-English product language before deep implementation language.

## Homepage And UX Intent

- Lead with simplicity-first messaging, then durability, then privacy/deployment flexibility.
- Prioritize buyer understanding in this order:
  1. What MirrorNeuron is.
  2. Why it is simpler than Airflow or Temporal for this use case.
  3. What real workloads it supports.
  4. Why teams can trust it.
  5. How to start quickly.
- Keep use cases prominent because they help explain the product faster than abstract feature lists.
- Preserve a serious developer-infrastructure visual tone, but avoid generic “enterprise infra” filler copy.
- Mobile navigation and critical conversion paths must remain complete, not desktop-only.

## Content And SEO Intent

- The site should be indexable early and communicate the product clearly to search engines.
- Metadata, structured data, sitemap, robots, canonical URLs, and route-level descriptions should be maintained when adding or changing pages.
- Prefer explicit keyword-relevant phrasing such as:
  - durable AI workflows
  - long-running AI agents
  - background workers
  - Temporal alternative
  - Airflow alternative
  - self-hosted AI workflows
- Add real explanatory copy, not thin placeholder sections, on core pages.
- Trust pages like pricing, security, privacy, and terms should exist and stay internally consistent.

## Implementation Guardrails

- Do not reintroduce maintenance mode overlays or hidden-by-default site states for normal visitors.
- Keep the install path and primary CTA clear and consistent across the site.
- When editing copy, reinforce that MirrorNeuron uses normal Python or TypeScript and avoids heavyweight workflow ceremony.
- When adding new pages or sections, prefer content that supports product clarity, trust, and indexing over decorative filler.
