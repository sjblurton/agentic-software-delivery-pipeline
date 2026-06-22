import { describe, expect, expectTypeOf, it } from "vitest";
import type { FormActionState } from "./form-action-state";

describe("FormActionState", () => {
  it("supports the default generic payload without requiring data", () => {
    const defaultState: FormActionState = {
      status: "idle",
      fieldErrors: {},
    };

    expect(defaultState.status).toBe("idle");
    expect(defaultState.data).toBeUndefined();
  });

  it("supports generic success payload data", () => {
    const successState: FormActionState<{ userId: string }> = {
      status: "success",
      data: { userId: "user_123" },
      fieldErrors: {},
    };

    expect(successState.data?.userId).toBe("user_123");
  });

  it("supports nested field error paths via dot notation", () => {
    const errorState: FormActionState<never> = {
      status: "error",
      fieldErrors: {
        "phones.0.number": ["Phone number is invalid."],
      },
    };

    expect(errorState.fieldErrors["phones.0.number"]).toEqual([
      "Phone number is invalid.",
    ]);
  });

  it("uses the expected status and field error shape", () => {
    const idleState: FormActionState<unknown> = {
      status: "idle",
      fieldErrors: {},
    };

    expect(idleState.status).toBe("idle");
    expectTypeOf<FormActionState<unknown>["status"]>().toEqualTypeOf<
      "success" | "error" | "idle"
    >();
    expectTypeOf<FormActionState<unknown>["fieldErrors"]>().toEqualTypeOf<
      Record<string, string[]>
    >();
    expectTypeOf<FormActionState<unknown>["message"]>().toEqualTypeOf<
      string | undefined
    >();
  });
});
