# Phase 3: Grouped Field Patterns and Complex Form Layouts

Install shadcn's grouped field components (FieldGroup, FieldSet, FieldLegend, FieldSeparator) and build custom Molecules for multi-field layouts (FieldArray, ConditionalField, FormSection).

## Context

Phases 1 and 2 cover individual field inputs. Phase 3 handles scenarios where multiple fields need visual or logical grouping — fieldsets (radio/checkbox groups), field arrays (repeat-until-empty patterns), conditional sections (show field B if field A is X).

## Decision

**Install from shadcn/ui:**

- `field-group`, `field-set`, `field-legend`, `field-separator` (structural helpers for grouped inputs)

**Build custom:**

- `FieldArray` — render repeated field instances (e.g., multiple phone numbers), with add/remove buttons; integrates react-hook-form `useFieldArray()`
- `ConditionalField` — render/hide a field based on another field's value; integrates `useWatch()` to track dependencies
- `FormSection` — visual grouping with title and optional description for related fields

**Each component:**

- Same co-location and story structure as earlier phases
- Play functions test add/remove in FieldArray, conditional show/hide in ConditionalField
- Storybook a11y addon tests nested field structures

**Do NOT install in Phase 3:**

- Multi-step form orchestration (separate Organism — Phase 4 or later)
- Supporting UI (tooltip, badge, alert — Phase 4)

## Why this approach

1. **Dependency order** — These patterns only make sense after Phase 1's basic fields are solid
2. **Composition model** — FieldArray, ConditionalField wrap existing fields; they extend rather than compete
3. **Vertical slice** — Phase 3 is complete when multi-field forms work end-to-end

## Considered options

1. **Build FieldArray in Phase 1** — Rejected: too early; Phase 1 focus is single-field inputs. FieldArray is an orchestration pattern, not a primitive.
2. **Use a form library's built-in array handling** — react-hook-form's `useFieldArray()` is already available; wrap it for consistency with your architecture

## Consequences

- FieldArray play functions will be complex (add/remove interactions, value assertions); test carefully
- ConditionalField introduces reactive rendering; ensure stories demonstrate all branches
- Phase 3 PR may be medium-sized (~5–8 components)

## Skills to invoke

- `tdd` — when building FieldArray, ConditionalField, FormSection
- `playwright-best-practices` — when writing play functions for dynamic field manipulation
- `ui-ux-review` — when reviewing multi-field layouts for clarity and accessibility
