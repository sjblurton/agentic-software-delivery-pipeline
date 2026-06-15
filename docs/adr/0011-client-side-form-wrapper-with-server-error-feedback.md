# Client-Side Form Wrapper with Server Error Feedback

We build form UI with a client-side `FormContainer` + `FormField` pattern using react-hook-form + Zod for client validation, combined with automatic server-side error synchronization. This gives us the best UX: format errors show instantly on blur, while business validation errors (like "email taken") display in the same field with the same UI after server feedback.

## Context

Form validation lives on a spectrum:

- **Pure server-side**: Simple, no client code, but slow feedback (full roundtrip for every keystroke).
- **Pure client-side**: Fast feedback, but can't catch business rules (e.g., "email already registered").
- **Hybrid**: Client formats validation + server business validation.

Our forms live in App Router, where Server Components and Client Components coexist. Previously, we used Server Action error states passed as props to Presentation Components — this worked but required manual error bridging and didn't integrate with form state.

## Decision

We adopted a **client-side form wrapper** (`FormContainer` + `FormField`) that:

1. Manages client-side validation via react-hook-form + Zod (mode: "onBlur" by default)
2. Auto-syncs server-side field errors via `form.setError()` when Server Actions return them
3. Provides a reusable `FormField` molecule (Label + Input + error) that works in Storybook standalone

FormField is a Presentation Component using `useController()` internally. FormContainer is a generic orchestrator that wraps the form, handles Server Actions via `useActionState()`, and auto-syncs errors. Both are Client Components.

## Considered Options

1. **Pure server-side forms** — simpler architecture, but no real-time validation feedback.
2. **Pure client-side validation** — fast but can't validate business rules; server errors become generic toasts.
3. **Manual error bridging** — each form manually calls `form.setError()` after Server Action; verbose and error-prone.

## Consequences

- **Benefit**: Form state is always in sync. Client validates format, server validates business logic, both feed into the same error display.
- **Benefit**: FormField is reusable across all forms and testable in isolation (via Storybook decorator).
- **Benefit**: Blur-on-blur validation gives users instant feedback; no full roundtrips for format errors.
- **Trade-off**: All form fields must be Client Components. This is acceptable because shadcn/ui atoms are already Client Components.
- **Trade-off**: Server-side validation must return errors in the `FormActionState` shape (fieldErrors as Record<string, string[]>). This is enforced by type-checking.
- **Constraint**: Nested fields (e.g., "phones.0.number") are supported by react-hook-form natively; no special handling needed.

## Related

- [ADR-0005: Zod at Boundaries Only](./0005-zod-at-boundaries-only.md) — Zod schemas live only at form boundaries and Server Actions.
- CONTEXT.md: "Boundary" term — form input is the primary boundary where Zod validation happens.
