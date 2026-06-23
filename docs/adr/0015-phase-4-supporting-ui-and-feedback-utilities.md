# Phase 4: Supporting UI Components and Enhancement Utilities

Install shadcn's feedback and metadata components (tooltip, badge, alert) and build utility Atoms for form feedback (FieldHint, FieldValidation, FormStatus).

## Context

Phases 1–3 cover the core form input and layout patterns. Phase 4 adds supporting UI — hints under fields, validation feedback badges, status alerts — that enhance user feedback and guidance without being form inputs themselves.

## Decision

**Install from shadcn/ui:**

- `tooltip` (hover hints)
- `badge` (status indicators, tags)
- `alert` (form-wide status messages, server errors)

**Build custom:**

- `FieldHint` — Atom that renders optional helper text below a field (e.g., "Password must be 12+ characters")
- `FieldValidation` — Atom that renders real-time validation status as an icon/badge (✓ or ✗)
- `FormStatus` — Molecule displaying form-wide feedback (submission success, server errors, warnings)

**Each component:**

- Same co-location and story structure as earlier phases
- Stories test successful, error, and warning states
- Play functions test tooltip interactions, badge visibility state changes

**Do NOT install in Phase 4:**

- Additional form controls or layout patterns (those are Phases 1–3)

## Why this approach

1. **Non-blocking** — Phase 4 is polish; Phases 1–3 are shippable without it
2. **Separation of concerns** — Supporting UI is distinct from core input/layout logic
3. **Reusable feedback patterns** — FieldHint, FieldValidation, FormStatus are building blocks for any form-heavy feature

## Consequences

- Phase 4 may span multiple PRs (feedback components are often tweaked based on real usage)
- FieldValidation and FieldHint will be used within Phase 1–3 components, but the components themselves are decoupled

## Skills to invoke

- `shadcn` — when installing supporting UI
- `tdd` — when building feedback components
- `ui-ux-review` — when reviewing hint clarity and validation messaging
