# Phase 2: Advanced Input Types and Layout Helpers

Install shadcn's advanced input components (combobox, date-picker, time-picker) and popover/dropdown-menu, then build Molecule wrappers (ComboboxField, DatePickerField) that integrate with react-hook-form and Zod.

## Context

Phase 1 covers basic input types. Phase 2 adds richer interaction patterns — searchable selects, date pickers, time inputs — and the layout components they depend on (Popover). These require more complex state management and validation logic.

## Decision

**Install from shadcn/ui:**

- `combobox` (searchable select)
- `date-picker` (calendar UI)
- `time-picker` (time input)
- `popover` (underlying UI for date-picker and other modals)
- `dropdown-menu` (alternative select pattern; optional, based on mobile UX needs)

**Build custom:**

- `ComboboxField` — wraps combobox + Popover, integrates react-hook-form + Zod validation
- `DatePickerField` — wraps date-picker + Popover, handles date formatting and validation
- `TimePickerField` — wraps time-picker, integrates react-hook-form

**Each component:**

- Same co-location and story structure as Phase 1 (2 stories, play functions, a11y)
- Play functions test opening/closing Popover, selecting values, date navigation

**Do NOT install in Phase 2:**

- Grouped field patterns (FieldGroup, FieldSet, FieldLegend — Phase 3)
- Supporting UI (tooltip, badge, alert — Phase 4)

## Why this approach

1. **Sequential dependency** — Popover is only needed for date-picker/combobox; waiting until Phase 2 keeps Phase 1 focused
2. **Reusable Popover** — Once installed, Popover becomes available for other use cases (tooltips, dropdowns, modals)
3. **Consistent wrapping pattern** — ComboboxField, DatePickerField follow the same FormFieldRHF template; no new patterns to learn

## Consequences

- DatePickerField may need to handle timezone awareness and locale formatting; plan for extended Zod validation
- Combobox + Popover interaction in stories requires careful play function design (open, interact, close)
- Phase 2 PR may be medium-sized (~6–8 components + associated wrappers)

## Skills to invoke

- `shadcn` — when installing advanced inputs
- `tdd` — when building ComboboxField, DatePickerField, TimePickerField
- `playwright-best-practices` — when writing play functions for Popover interaction
- `ui-ux-review` — when reviewing date/time formatting and validation UX
