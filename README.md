# Agentic Software Delivery Pipeline

AI-driven delivery system that turns a product brief into reviewed pull requests through constrained orchestration.

## Architecture (Primary)

### **Brief -> Context Expansion -> PRD -> Issue Graph -> Agent Execution -> Human Review -> PR Integration**

```mermaid
flowchart LR
	A[Product Brief] --> B[Context Expansion<br/>Retrieval-Augmented Grounding]
	B --> C[PRD Generation]
	C --> D[Issue Graph<br/>Task Decomposition]
	D --> E[Execution Layer<br/>AI Coding Agents]
	E --> F[Evaluation Layer<br/>Critique & Spec Alignment]
	F --> G[Human Review]
	G --> H[PR Integration]
	F -. Feedback .-> C
	G -. Refinement .-> D
	E -. Rework .-> D

	subgraph Guardrails
		I[CI Validation<br/>Tests • Lint • Type Safety]
	end

	E --> I
	I --> F

	subgraph Future
		J[Ralph Loop<br/>Batch Execution & Autonomous PRs]
	end

	J -. Evolution .-> E
```

This lifecycle is iterative, not single-pass: execution and review outcomes can trigger PRD refinement, issue-graph updates, and re-execution before merge.

1. Start with a high-level product brief.
2. Expand context via retrieval-augmented grounding from repository and documentation sources.
3. Generate a structured PRD with scope and acceptance criteria.
4. Decompose the PRD into dependency-aware GitHub issues.
5. Execute issues with AI agents that produce code and tests.
6. Gate integration through human review and CI validation.

## Agent Model

- Planning layer: PRD generation and issue decomposition.
- Execution layer: bounded task implementation under repository constraints.
- Evaluation layer: critique, regression detection, and spec alignment.

## Ralph Loop (Planned)

Next evolution: a value-prioritised batch execution mode that selects the highest-value available issues first, delivers them to pull request state, and applies pre-merge validation via internal critique agents.

Ralph Loop does not merge autonomously. It runs until all selected issues are in pull request state, or until the next highest-value issue is blocked and requires human review.

## Guardrails

- Agent outputs are validated against PRD acceptance criteria.
- CI enforces correctness constraints (tests, linting, type safety, build, visual checks).
- Human review is required before any merge.
- Structured artefacts reduce hallucination risk versus free-form generation.
- The system is designed for constrained autonomy, with explicit validation boundaries.

## Implementation Layer

Supporting infrastructure (execution substrate):

- Next.js + TypeScript
- Supabase + Drizzle
- Vitest + Playwright + Storybook
- GitHub Actions

## Database starter slice (local + CI Docker flow)

The `/starter/database` route is a thin vertical slice for Drizzle + Postgres:
it requires auth, writes a row, and reads rows back from `starter_records`.

Local setup uses Supabase Docker Postgres via `DATABASE_URL` in `.env.local`
(see `.env.example`, default local Docker URL is `127.0.0.1:54322`):

1. Start local services (`supabase start`) and set `DATABASE_URL`.
2. Apply schema with `pnpm db:push`.
3. Run the app (`pnpm dev`) and use `/starter/database`.

CI e2e runs in the existing `.github/workflows/e2e.yml` pipeline with a Docker
Postgres service, prepares the `auth` schema/table needed by Drizzle references,
applies schema, then executes Playwright in both logged-in and logged-out auth
modes.

## Philosophy

Structured AI-assisted engineering: decompose work, generate explicit artefacts, validate continuously, and integrate under human control.
