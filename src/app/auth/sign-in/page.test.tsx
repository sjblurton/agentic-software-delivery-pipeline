import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/auth/components/auth-form-container", () => ({
  AuthFormContainer: () => null,
}));
vi.mock("@/features/auth/components/auth-status-toast", () => ({
  AuthStatusToast: () => null,
}));

import SignInPage from "./page";

describe("SignInPage", () => {
  it("renders the sign-in page content", async () => {
    const result = await SignInPage({});
    expect(result).toBeTruthy();
  });
});
