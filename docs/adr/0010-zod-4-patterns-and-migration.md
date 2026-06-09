# Zod 4 — required version and pattern reference

This project uses **Zod 4**. Zod 3 patterns are forbidden. The API changed in ways that are syntactically valid in both versions but produce different runtime behaviour, so agents must not rely on pre-training knowledge of Zod 3.

## Breaking changes — do not use these

```ts
// ❌ Zod 3 — forbidden
z.string().email()
z.string().uuid()
z.string().url()
z.string().nonempty()
z.object({ ... }).required_error("Required")
z.string().email("Invalid email")   // string shorthand for error
```

## Correct Zod 4 equivalents

```ts
// ✅ Zod 4 — required
z.email()
z.uuid()
z.url()
z.string().min(1)
z.object({ ... }, { error: "Required" })
z.email({ error: "Invalid email" })  // error key, not message
```

## Error messages

Zod 4 uses `{ error: "..." }` — not the string shorthand and not `{ message: "..." }`.

```ts
// ❌
z.string().min(1, "Required")
z.string().min(1, { message: "Required" })

// ✅
z.string().min(1, { error: "Required" })
z.email({ error: "Invalid email address" })
```

## Skill

Before writing any Zod schema, invoke the `zod-4` skill. It provides the full pattern reference and React Hook Form integration examples.
