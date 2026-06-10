import { describe, expect, it } from "vitest";
import { parseAuthCredentials } from "./auth-schemas";

describe("parseAuthCredentials", () => {
  it("returns shaped field errors for invalid sign-in input", () => {
    const formData = new FormData();
    formData.set("email", "not-an-email");
    formData.set("password", "123");

    const result = parseAuthCredentials(formData);

    expect(result.ok).toBe(false);
    if (result.ok) {
      throw new Error("Expected parse failure");
    }

    expect(result.fieldErrors.email).toEqual(["Please enter a valid email."]);
    expect(result.fieldErrors.password).toEqual([
      "Password must be at least 8 characters.",
    ]);
  });
});
