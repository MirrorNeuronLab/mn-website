---
title: "Future of AI User Interface is a workbench"
date: "2026-07-15"
excerpt: "Chat made AI accessible, but serious work needs a shared environment for objects, plans, previews, approvals, and durable execution. The next generic AI interface is a workbench."
author: "Homer Quan"
tags: ["AI", "Product", "Engineering"]
coverImage: "https://i.imgur.com/r1o4655.png"
coverImageAlt: "A busy workbench"
---

Chat made AI feel natural.

A person can type a request, speak a goal, attach a file, and receive an intelligent response without learning a new application.

That is a major interface breakthrough.

But chat is naturally suited to **starting work**.

It is much less suited to being the place where work lives.

Once AI begins editing a design, running a simulation, coordinating tools, monitoring a system, or working for hours in the background, the user needs more than a transcript.

They need a place where the work has state.

> The future of AI user interface is a workbench.

A workbench is a persistent, shared environment where humans and AI can inspect the same objects, express intent, propose changes, preview consequences, execute tasks, and understand what happened over time.

Chat and voice remain important.

They become the intent channel of the workbench, not the entire product.

## The transcript is not the work

Most AI products still treat the conversation as the center of the experience.

The transcript contains the request, the interpretation, the generated output, the correction, and the next version.

That works when the output is disposable.

It breaks down when the work becomes durable.

A transcript is an event stream.

It is not an object model.

It does not clearly answer:

- Which document is authoritative?
- Which design version is current?
- Which assumptions are active?
- Which changes are proposed but not committed?
- Which tasks are still running?
- Which actions produced external side effects?
- Which result passed verification?
- Which failed step can be resumed?

The user has to reconstruct all of this mentally from a scrolling conversation.

That is not a user interface for serious work.

It is a log pretending to be a workspace.

## A workbench makes the work object primary

The center of an AI workbench is not the assistant.

It is the thing being worked on.

That thing might be:

- a document
- a CAD model
- a software repository
- a dataset
- a workflow
- a scientific experiment
- a map
- an evidence collection
- an operational system
- a physical environment

The work object is the source of truth.

The conversation explains intent, captures discussion, and helps resolve ambiguity.

But the conversation does not own the state.

```text
Chat-first product

conversation
    └── generated outputs
        └── more conversation
            └── uncertain current state


Workbench product

project
├── authoritative objects
├── goals and constraints
├── proposed changes
├── plans and running tasks
├── approvals
├── artifacts and evidence
└── versioned event history
```

This distinction changes the mental model.

The user is no longer asking an AI to produce isolated answers.

The user and AI are operating on a shared world.

## The generic interaction loop is not prompt and response

A useful workbench can be organized around a six-stage loop:

### Select → Express → Propose → Preview → Commit → Observe

### Select

The user identifies the relevant objects through direct manipulation.

They might:

- select two faces in a 3D model
- highlight a paragraph
- brush a group of points on a chart
- choose several files
- circle part of an image
- select a failed workflow step
- pin evidence to a board
- mark a region on a map

Selection provides precise context.

It solves the weakness of words such as “this,” “that,” “the previous one,” and “the red area.”

The AI should receive semantic object references whenever possible, not only a screenshot.

```json
{
  "selection": [
    {
      "id": "assembly/bracket-left/upper-rib",
      "type": "cad_feature",
      "properties": {
        "thickness_mm": 3.0,
        "material": "Aluminum 6061-T6"
      }
    }
  ]
}
```

### Express

The user explains intent through language, voice, gesture, sketch, or parameter changes.

> Make this lighter, but preserve the mounting points and keep the safety factor above 2.5.

Natural language is excellent for goals, priorities, exceptions, and rationale.

It is less reliable for identifying exact objects or expressing every parameter.

That is why language works best when combined with selection and structured state.

### Propose

The AI converts intent into an explicit plan or structured modification.

```text
Proposed change

1. Reduce the upper rib thickness from 3.0 mm to 2.4 mm
2. Add a 1.2 mm fillet at the rib junction
3. Preserve all mounting-hole positions
4. Run static stress analysis
5. Reject the change if safety factor falls below 2.5
```

A proposal is not yet a side effect.

It is an inspectable object.

The user can edit it, ask for alternatives, change a constraint, or delegate execution.

### Preview

The interface shows the likely consequences before committing.

Depending on the domain, that might be:

- a geometry overlay
- a document diff
- a chart comparing alternatives
- an affected-file list
- a workflow path
- a cost estimate
- a permission warning
- a simulation result
- a list of external systems that will change

Preview is where generative intelligence becomes operable.

Without preview, the user is approving language.

With preview, the user is approving consequences.

### Commit

The user or an explicit policy authorizes the change.

Commit should be a real state transition.

It should distinguish:

- accepting a suggestion
- modifying an authoritative object
- executing an external side effect
- launching a long-running delegated task

The workbench should make those boundaries visible.

### Observe

After execution begins, the user can see:

- what is running
- what has completed
- what is waiting
- what failed
- what was retried
- what changed
- what needs a decision
- what the system expects to do next

This is where the interface and the runtime meet.

The workbench can only show reliable execution state if the runtime preserves reliable execution state.

## The workbench is a stable shell with domain-specific views

A generic AI workbench does not mean every domain should use the same canvas.

A CAD system, research environment, spreadsheet, code editor, and operations console need different representations.

The generic layer is the interaction architecture around those representations.

```text
┌──────────────────────────────────────────────────────────────┐
│ Project · Goal · Current state · Active work · Resources     │
├──────────────┬───────────────────────────┬───────────────────┤
│ Object tree  │ Main domain workspace     │ AI inspector      │
│              │                           │                   │
│ Files        │ Document / CAD / Graph    │ Understanding     │
│ Components   │ Map / Table / Timeline    │ Assumptions       │
│ Evidence     │ Simulation / Dashboard    │ Constraints       │
│ Versions     │                           │ Suggestions       │
├──────────────┴───────────────────────────┴───────────────────┤
│ Plan · Tasks · Approvals · Events · History · Cost           │
├──────────────────────────────────────────────────────────────┤
│ Select, type, speak, sketch, attach, or delegate             │
└──────────────────────────────────────────────────────────────┘
```

The shell stays familiar.

The center adapts to the domain.

The local controls can adapt to the task.

This is an important boundary.

The AI should not regenerate the entire application on every turn.

A constantly changing interface destroys navigation, muscle memory, trust, and accessibility.

The stable shell should own:

- project navigation
- authoritative objects
- identity and permissions
- versions
- task history
- approvals
- policies
- activity and recovery

The AI can generate local surfaces for:

- a parameter form
- an alternative comparison
- a follow-up decision
- a simulation control
- a review checklist
- a result viewer
- an approval panel

```text
Stable application shell
    navigation
    workspace
    object model
    history
    permissions
    policies

Generated micro-interfaces
    task-specific controls
    comparisons
    forms
    previews
    decisions
```

This direction is visible in emerging interface systems.

[ChatGPT Canvas](https://openai.com/index/introducing-canvas/) separates conversation from an editable artifact. [A2UI](https://developers.googleblog.com/a2ui-v0-9-generative-ui/) gives agents a declarative way to request task-specific interface components that a host application renders through trusted native controls.

These are useful building blocks.

The larger opportunity is to place them inside a persistent operational workbench.

## Plans should be editable objects

When an agent says, “I will analyze the files and prepare a report,” the user should not have to trust an invisible sequence.

The plan should appear as an object.

```text
Goal: Evaluate three manufacturing designs

✓ Collect design files
✓ Normalize material properties
● Run thermal simulation
○ Run stress simulation
○ Compare manufacturing cost
○ Produce recommendation
```

The user should be able to:

- reorder steps
- remove a step
- add a constraint
- inspect intermediate outputs
- change the executor
- set a budget
- require approval before a side effect
- pause or cancel work
- resume after failure

The plan is not private model reasoning.

It is a public execution contract.

That distinction matters.

A useful plan describes intended actions, dependencies, stop conditions, inputs, outputs, and approval gates.

It does not need to expose hidden chain-of-thought.

Research systems are moving toward this mixed-initiative model. [Magentic-UI](https://arxiv.org/abs/2507.22358) explores co-planning, shared task execution, action approval, verification, memory, and multitasking. Recent work such as [HiLSVA](https://arxiv.org/abs/2606.26614) combines natural language with direct manipulation and stepwise provenance for scientific visualization.

The recurring idea is simple:

> Human involvement should not be treated as a failure of autonomy.

The user and AI should be able to exchange control at the right level and at the right moment.

## The AI inspector should reveal its operating model

A confidence score is rarely enough.

The user needs to understand what the AI currently believes about the work.

A useful inspector might show:

```text
Goal
Reduce bracket weight by at least 15%.

Active constraints
- Mounting holes cannot move
- Material remains Aluminum 6061-T6
- Safety factor must remain above 2.5
- Manufacturing process is 3-axis CNC

Current interpretation
The upper rib and side walls may change.
The base plate is fixed.

Unresolved
Surface-finish requirements are unknown.
```

This makes misunderstanding correctable before it becomes execution.

The inspector should separate:

- known facts
- user-provided constraints
- inferred assumptions
- unresolved questions
- policy restrictions
- tool limitations
- current objective
- success criteria

The goal is not to expose every token the model processed.

The goal is to expose the parts of its working model that matter to the next decision.

## AI actions need visible state boundaries

AI products often blur together a suggestion, an approved change, and a completed side effect.

A workbench should not.

| State | Meaning |
|---|---|
| Suggestion | A low-risk idea with no state change. |
| Proposal | A structured change that has not been applied. |
| Previewed | The expected consequences have been rendered or calculated. |
| Approved | A human or policy has authorized the next transition. |
| Committed | The authoritative project state has changed. |
| Executing | Tools or external systems are currently being changed. |
| Verified | Postconditions or quality checks passed. |
| Waiting | The work is paused for time, an event, or a decision. |
| Failed recoverably | The task can retry or resume from preserved state. |
| Failed terminally | The plan or implementation requires manual repair. |

These distinctions are product design, not back-end trivia.

A user should never have to ask:

> Did the AI only recommend that action, or did it actually do it?

## Multiple agents should appear as work, not characters

A common multi-agent interface presents a collection of avatars:

```text
Research Agent
Design Agent
Reviewer Agent
Manager Agent
```

That is easy to demo.

It is not usually the right abstraction for operating work.

Most users care about:

- what task is assigned
- what capability is required
- what permission is being used
- where the work is running
- how much it costs
- what state it is in
- whether the result passed checks

A workbench should therefore present agents as executors behind tasks.

| Task | Executor | State |
|---|---|---|
| Collect relevant standards | Research capability | Complete |
| Generate geometry variants | Design worker | Running |
| Run finite-element analysis | GPU simulation node | Queued |
| Check manufacturing rules | Verification service | Waiting |
| Prepare recommendation | Language model | Waiting |

Agent identity matters when it changes capability, trust, cost, location, or permission.

Otherwise, the task is the interface.

## A workbench must represent time

Traditional interfaces primarily display current state.

Agentic work also has a meaningful past and future.

```text
Past                     Present                  Future
────────────────────────────────────────────────────────────
what changed             what is running          what is planned
why it changed           what is blocked          what may happen
who approved it          what needs input         expected cost
how to undo it           current resources        stop conditions
```

This suggests a universal activity timeline.

```text
09:13  User selected Assembly / Bracket-Left
09:14  Goal changed: reduce weight by at least 15%
09:14  AI proposed three strategies
09:16  User approved topology exploration
09:17  Simulation task started on GPU node
09:21  Variant 4 rejected: displacement too high
09:25  Workflow requested approval to test a new material
```

The timeline is more than a log.

It enables:

- undo
- audit
- explanation
- recovery
- version comparison
- resuming interrupted work
- understanding agent behavior
- measuring reliability

For long-running AI, time is part of the interface.

## The workbench should call the human for decisions, not narration

There are two bad extremes.

One is full autonomy with no useful visibility until the end.

The other is approval spam after every tool call.

A better workbench asks for the smallest decision that meaningfully changes the path.

```text
The current material constraint conflicts with the weight target.

Which constraint may change?

○ Material
○ Minimum thickness
○ Weight target
○ None — explore another geometry
```

The runtime can continue through reversible, low-risk steps.

It can pause at explicit gates for:

- irreversible changes
- external communication
- financial commitments
- destructive actions
- policy exceptions
- ambiguous goals
- high-cost branches
- changes to authoritative state

The interface should make the autonomy level visible and adjustable.

Human checkpoints are not interruptions added after the system is built.

They are part of the workflow design.

## The workbench needs a durable runtime underneath

A workbench is not only a front-end pattern.

Its strongest features depend on runtime guarantees.

The interface cannot accurately show progress if job state disappears after a process restart.

It cannot offer meaningful resume controls if completed steps and side effects were not recorded.

It cannot show a trustworthy timeline if events are not persisted.

It cannot separate proposal from commit if the execution model has no explicit transitions.

It cannot recover safely if tool calls are not retry-aware and idempotent where necessary.

```text
Intent channels
chat · voice · selection · sketch
              ↓
AI workbench
objects · plans · previews · approvals · history
              ↓
Agent and workflow layer
planning · context · verification · policy
              ↓
Typed domain tools
edit · simulate · search · publish · control
              ↓
Durable runtime
state · events · retries · checkpoints · recovery
              ↓
Files · models · services · devices · infrastructure
```

A beautiful workbench over stateless model calls is theater.

A durable runtime without a workbench remains infrastructure that users cannot fully understand or control.

The product appears when the two are connected.

This is the role MirrorNeuron is designed to support: keep workflow state, events, retries, pauses, approvals, and recovery explicit so higher-level interfaces can present AI work as dependable software rather than a sequence of hopeful requests.

## A minimum viable AI workbench

The first useful version does not need to support every domain.

It needs one real work object and a complete interaction loop.

A minimum viable workbench includes:

1. **An authoritative workspace**  
   One document, model, project, dataset, or operational object that clearly represents current state.

2. **Semantic selection**  
   The ability to pass selected objects and their identities to the AI.

3. **An intent dock**  
   Chat, voice, attachments, and structured inputs for expressing goals and constraints.

4. **A visible plan**  
   Steps, dependencies, status, stop conditions, and editable approval gates.

5. **Proposal and preview**  
   A diff, overlay, simulation, or consequence view before authoritative state changes.

6. **A run surface**  
   Current tasks, outputs, waiting conditions, failures, retries, and resource use.

7. **A durable timeline**  
   Events, versions, decisions, approvals, side effects, and recovery points.

That is already much more useful than a chatbot attached to a dashboard.

## The generic shell can support many domains

The workbench can be universal without making the domain views generic.

```text
Universal workbench shell
├── Projects and goals
├── Object and selection context
├── Chat and voice
├── Plans and task graph
├── Proposals, diffs, and previews
├── Approvals and permissions
├── Runs, resources, and status
├── Event timeline and versions
└── Generated micro-interfaces

Domain adapters
├── Document canvas
├── Code and repository view
├── CAD and 3D viewport
├── Data explorer
├── Scientific visualization
├── Evidence board
├── Workflow graph
├── Map
└── Device-control dashboard
```

The universal shell owns continuity.

The domain adapter owns representation.

The agent connects intent to typed operations.

The runtime keeps execution dependable.

## Design principles for an AI-native workbench

The design can be summarized in a few rules.

### The object is primary; the conversation is secondary

Chat should not become the only place where state exists.

### Use direct manipulation for “what”

Selection, pointing, highlighting, dragging, and sketching provide precise context.

### Use language for “why”

Natural language is best for intent, rationale, tradeoffs, exceptions, and goals.

### Use typed tools for “how”

Actions should cross explicit, testable interfaces rather than depend on vague generated text.

### Preview consequences before consequential commits

The level of preview should scale with irreversibility, cost, and risk.

### Make plans public and editable

The user should be able to inspect and redirect the execution contract.

### Expose time

Show past actions, present execution, and future intent.

### Keep the shell stable

Generate local controls, not an entirely new application every turn.

### Make recovery a normal interaction

Retry, resume, branch, and roll back should be first-class controls.

### Reveal assumptions, not hidden reasoning

Show the operating facts and constraints the user can correct.

### Optimize human involvement

Ask for decisions at meaningful boundaries rather than maximizing or minimizing intervention blindly.

## What not to build

Several patterns look like progress but preserve the limitations of chat.

### Chat with a decorative dashboard

If the transcript still owns the real state, the dashboard is only a visualization of uncertainty.

### A fully regenerated interface every turn

This removes stability and makes the product harder to learn, test, secure, and trust.

### An agent avatar zoo

Personality does not replace task state, capability, permissions, and accountability.

### A raw tool-call firehose

More logs do not automatically create legibility.

The interface should summarize execution at the level required for the user’s decision, with deeper detail available on demand.

### Approval on every action

Constant confirmation trains users to click through without thinking.

Approval should correspond to meaningful state and risk boundaries.

### Hidden side effects

The workbench must make it obvious when something outside the project has changed.

## The workbench is the missing product layer

AI models are becoming more capable.

Agents are gaining tools.

Protocols are making data, tools, and generated interfaces more interoperable.

Runtimes are becoming more durable.

But users still need a coherent place to operate all of this.

That place is the workbench.

It is where:

- objects become addressable
- intent becomes structured work
- plans become editable
- alternatives become comparable
- consequences become visible
- execution becomes observable
- humans can intervene without starting over
- failures can recover
- history becomes reusable knowledge

The workbench is not one screen layout.

It is the product model for mixed-initiative software.

## The takeaway

Chat made AI approachable.

Voice will make it ambient.

Agents will make it active.

But the workbench will make it operational.

The future AI interface is a persistent visual environment containing shared objects, where people use direct manipulation to establish context, language to express intent, and agents to propose and execute observable changes.

Chat does not disappear.

It becomes the command line of the workbench.

> The future of AI user interface is not a place where answers scroll by. It is a place where work has state.

---

## References

- **MirrorNeuron**: “Durable AI workflows, without the orchestration overhead.” [https://www.mirrorneuron.io/](https://www.mirrorneuron.io/)
- **MirrorNeuron Blog**: “Workflow Is the New User Interface.” [https://www.mirrorneuron.io/blog/workflow-is-the-new-user-interface](https://www.mirrorneuron.io/blog/workflow-is-the-new-user-interface)
- **MirrorNeuron Core**: “Generated software, deterministic runtime.” [https://github.com/MirrorNeuronLab/MirrorNeuron](https://github.com/MirrorNeuronLab/MirrorNeuron)
- **Eric Horvitz**: “Principles of Mixed-Initiative User Interfaces.” Microsoft Research. [https://www.microsoft.com/en-us/research/publication/principles-mixed-initiative-user-interfaces/](https://www.microsoft.com/en-us/research/publication/principles-mixed-initiative-user-interfaces/)
- **OpenAI**: “Introducing canvas.” [https://openai.com/index/introducing-canvas/](https://openai.com/index/introducing-canvas/)
- **Google A2UI Team**: “A2UI v0.9: The New Standard for Portable, Framework-Agnostic Generative UI.” [https://developers.googleblog.com/a2ui-v0-9-generative-ui/](https://developers.googleblog.com/a2ui-v0-9-generative-ui/)
- **Mozannar et al.**: “Magentic-UI: Towards Human-in-the-loop Agentic Systems.” [https://arxiv.org/abs/2507.22358](https://arxiv.org/abs/2507.22358)
- **Ai, Do, and Wang**: “HiLSVA: Design and Evaluation of a Human-in-the-Loop Agentic System for Scientific Visualization.” [https://arxiv.org/abs/2606.26614](https://arxiv.org/abs/2606.26614)
