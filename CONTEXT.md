# Next.js + Supabase Boilerplate

A GitHub template encoding the correct architectural decisions, tooling, and conventions for a Next.js + Supabase project once, so they never need to be repeated.

## Documentation boundaries

- `README.md` describes what the project is (portfolio/CV-facing overview), not implementation rules.
- Implementation rules and engineering conventions belong in `CONTEXT.md`, `AGENTS.md`, and ADRs.
- Database Starter Slice implementation flow guidance (local/CI Postgres + Drizzle commands) belongs in `CONTEXT.md`/ADRs, not `README.md`.

## Language

**Vertical Slice**:
A self-contained unit of functionality delivered in a single PR, comprising backend logic, frontend UI, and visible user feedback. Every feature is a vertical slice.
_Avoid_: feature ticket, story, module

**Feature**:
A vertical slice of functionality living in `src/features/`. Each feature owns its own components, hooks, server actions, types, and tests.
_Avoid_: module, section, page

**Database Starter Slice**:
A starter vertical slice proving end-to-end database integration in the template: protected page, Drizzle read query rendered in a basic table, and a Server Action create flow that updates visible data.
_Avoid_: DB demo, database example, drizzle sample

**Boundary**:
The point where untrusted data enters the system — form input, API response, URL params, environment variables — and is parsed through a Zod schema. Zod lives only at boundaries; internal domain types are plain TypeScript.
_Avoid_: edge, entry point, validation layer

**Presentation Component**:
A pure UI component that accepts props and renders JSX. Contains no data fetching, no server actions, and no external state. Fully testable with props alone. Storybookable.
_Avoid_: dumb component, UI component, stateless component

**Container Component**:
A component that owns data fetching and business logic, passing data down to Presentation Components as props. In App Router, a Container Component is typically a Server Component.
_Avoid_: smart component, page component, data component

**Atom**:
A single-purpose UI primitive that cannot be broken down further — Button, Input, Label, Badge. Sourced from shadcn/ui and owned by the project.
_Avoid_: primitive, base component, element

**Molecule**:
A composition of Atoms forming a reusable UI pattern — FormField (Label + Input + error), SearchBar. Has no awareness of business domain.
_Avoid_: composite component, compound component

**Organism**:
A composition of Molecules and Atoms forming a complete, domain-aware UI section — LoginForm, ProfileCard, NavigationBar.
_Avoid_: section, block, panel

**Migration**:
A Drizzle schema change expressed in TypeScript, from which `drizzle-kit generate` produces a SQL file. RLS policies are not part of a Migration — they are written as raw SQL alongside the generated file.
_Avoid_: schema change, database update, Supabase migration

**Story**:
A Storybook story file that renders a Presentation Component in isolation. Each story represents one distinct state of the component and includes a `play` function for interaction testing. Committed baselines are used for visual regression in CI.
_Avoid_: example, demo, showcase

**Component Co-location**:
The file-structure convention where each UI component lives in its own folder with its implementation and story side-by-side (for example `component-name/component-name.tsx` and `component-name/component-name.stories.tsx`). This is mandatory for all new UI components.
_Avoid_: flat component files, separate story tree

**FormField**:
A reusable Molecule combining Label + Input + error display for a single form field. Accepts `name`, `type`, `placeholder`, and other HTML input attributes. Uses `useController()` internally to bind to react-hook-form. Extracts `required` constraint from Zod schema automatically. Works standalone in Storybook.
_Avoid_: form component, input wrapper, field component

**FormContainer**:
A generic Client Component orchestrator for forms. Accepts a Zod schema, validation mode (default "onBlur"), a Server Action (`onSubmit`), and an `onSuccess` callback. Wraps children in `FormProvider`, manages `useActionState()` for Server Action submission, and auto-syncs server-side field errors via `form.setError()`. Passes `isPending` state to children.
_Avoid_: form component, form wrapper, form orchestrator

**FormActionState**:
The return shape of a Server Action handling form submission. Contains `status` ("success" | "error" | "idle"), `fieldErrors` (nested paths like "phones.0.number" supported), optional `message` (for toasts), and optional generic `data` (success payload). FormContainer auto-syncs `fieldErrors` back into react-hook-form on error responses.
_Avoid_: form state, action state, error state

**Quality Gate**:
An automated check that must pass before a PR can merge into main. The ordered gate sequence is: `tsc --noEmit` → ESLint → Vitest with coverage → Playwright visual regression. Coverage must never decrease between PRs.
_Avoid_: CI step, pipeline check, lint pass

## Skills

The following skills are installed globally and should be invoked when relevant:

| Skill               | When to use                                                                     |
| ------------------- | ------------------------------------------------------------------------------- |
| `tdd` (Matt Pocock) | Writing any new feature — failing test first, always                            |
| `zod-v4`            | Any time Zod schemas are written or reviewed — prevents v3 deprecation patterns |
| `ui-ux-review`      | Reviewing Presentation Components, Atoms, Molecules, Organisms                  |
| `grill-with-docs`   | Stress-testing a new plan or design decision                                    |

The following skills may need to be installed or written:

| Skill             | Status                                                                                |
| ----------------- | ------------------------------------------------------------------------------------- |
| `db-migration`    | Search skill.sh for a Drizzle migration skill; write custom if none suitable          |
| `storybook-story` | Search skill.sh for a Storybook + play functions skill; write custom if none suitable |
