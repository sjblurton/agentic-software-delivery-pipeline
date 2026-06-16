import { z } from "zod";

const starterRecordSchema = z.object({
  name: z.string().trim().min(1, { error: "Please enter a name." }),
});

type StarterRecordInput = z.infer<typeof starterRecordSchema>;

type ParseStarterRecordInputResult =
  | { ok: true; input: StarterRecordInput }
  | { ok: false; fieldErrors: Record<string, string[]> };

export function parseStarterRecordInput(
  formData: FormData,
): ParseStarterRecordInputResult {
  const parsedInput = starterRecordSchema.safeParse({
    name: formData.get("name"),
  });

  if (!parsedInput.success) {
    return {
      ok: false,
      fieldErrors: parsedInput.error.flatten().fieldErrors,
    };
  }

  return {
    ok: true,
    input: parsedInput.data,
  };
}
