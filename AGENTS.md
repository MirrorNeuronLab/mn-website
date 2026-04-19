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

## Design Pattern Consistency

- Keep the visual system consistent across homepage, trust pages, blog, and blueprint/use-case pages: dark infrastructure background, slate cards, cyan/blue action accents, and restrained category colors only where they clarify content.
- Use `rounded-3xl` for major page cards and panels, `rounded-2xl` for nested cards, and `rounded-xl` for buttons and compact controls.
- Primary CTAs should be white-filled buttons on dark backgrounds; secondary CTAs should be bordered dark buttons with subtle hover states.
- Interactive cards should have an obvious but calm affordance, usually `hover:border-cyan-400/30` or a small `hover:-translate-y-0.5` lift.
- Step indicators should stay compact and supportive. Avoid oversized numeric badges; the step title and action should carry the information hierarchy.
- Hero-side panels should stay simple, direct, and benefit-led. Avoid stacking multiple explanatory cards in the hero when one focused path card is enough.
- Use icons to clarify category or action, such as finance, marketing, science, video/demo, or install states, but avoid decorative icon clutter.

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
- Trust pages like security, privacy, and terms should exist and stay internally consistent.
- Do not reintroduce a pricing page or pricing navigation link unless explicitly requested.

## Implementation Guardrails

- The maintenance blur is currently intentional and JS-controlled. Do not remove it, change its default state, or make it affect SEO metadata unless explicitly requested.
- Keep the install path and primary CTA clear and consistent across the site.
- When editing copy, reinforce that MirrorNeuron lets people work in their language with normal code and avoids heavyweight workflow ceremony.
- When adding new pages or sections, prefer content that supports product clarity, trust, and indexing over decorative filler.
