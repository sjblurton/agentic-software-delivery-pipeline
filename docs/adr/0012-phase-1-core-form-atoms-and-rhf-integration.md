# Phase 1: Core Form Atoms and React-Hook-Form Integration

Install shadcn's foundational form components (input, textarea, checkbox, radio-group, switch, select) and Field building blocks (FieldLabel, FieldError, FieldDescription), then build FormFieldRHF as a custom Molecule that wraps these with react-hook-form integration and Zod schema introspection.

## Context

Forms are central to the boilerplate. Rather than build custom form primitives from scratch, we align with shadcn/ui's accessible, well-tested Field component family. This gives us semantic HTML, ARIA labels, and Radix UI primitives out of the box. However, shadcn's Field components are compositional primitives; they don't integrate with react-hook-form automatically. FormFieldRHF bridges that gap.

## Decision

**Phase 1 scope:**

**Install from shadcn/ui:**

- `input`, `textarea`, `checkbox`, `radio-group`, `switch`, `select` (Atoms — single-purpose input primitives)
- `field`, `field-label`, `field-error`, `field-description` (Molecules — Field composition helpers)

**Build custom:**

- `FormFieldRHF` — a Molecule wrapping shadcn's Field + Input/Textarea/etc., adding react-hook-form `useController()` binding and Zod schema introspection. Automatically extracts `required` from schema and renders asterisk on labels. Supports async validation error display.

**Each component:**

- Installed/built using co-location (`/src/components/ui/component-name/component-name.tsx` + `component-name.stories.tsx`)
- Includes 2 stories: "Happy Path" + "Error State"
- Stories include play functions (interactive testing)
- Storybook a11y addon verifies accessibility automatically (no separate Playwright a11y suite)

**Do NOT install in Phase 1:**

- Popover (deferred to Phase 2 — needed for date-picker, not for basic inputs)
- Advanced inputs (date-picker, time-picker, combobox — Phase 2)
- Grouped field patterns (FieldGroup, FieldSet, FieldLegend, FieldSeparator — Phase 3)

## Why this approach

1. **Align with shadcn's design philosophy** — use their accessibility-first primitives rather than reinvent
2. **Clean separation of concerns** — FormFieldRHF owns react-hook-form plumbing; shadcn Field components stay dumb and composable
3. **Testability** — co-located stories with play functions and Storybook a11y addon catch regressions early
4. **Vertical slices** — Phase 1 is complete, shippable, and feature-independent; later phases (advanced inputs, complex layouts) don't block Phase 1 delivery

## Considered options

1. **Build FormField from scratch** — Write FormFieldPrimitive and FormFieldRHF without shadcn. Rejected: shadcn's Field system is already accessible, semantic, and battle-tested; reinventing wastes effort.
2. **Use shadcn's pre-built Form wrapper (if it exists)** — Checked shadcn docs; they provide Field components but not a ready-made FormFieldRHF. Building FormFieldRHF is the right call.
3. **Defer all form components to later phases** — Rejected: forms are foundational; Phase 1 must include at least the core atoms.

## Consequences

- Phase 1 PR will be large (~10 components + stories + play functions + A11y checks). Plan accordingly.
- FormFieldRHF becomes the template for all phase-2 and phase-3 form molecules; consistency is locked in here.
- Storybook a11y addon must be enabled (verify it's already on in `.storybook/main.ts`).

## Skills to invoke

- `shadcn` — when installing shadcn components
- `tdd` — when building FormFieldRHF (write failing test first)
- `playwright-best-practices` — when writing play functions in stories
- `ui-ux-review` — when reviewing FormFieldRHF for consistency and usability
