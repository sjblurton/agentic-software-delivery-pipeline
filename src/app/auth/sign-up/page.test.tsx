import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/auth/components/auth-form-container", () => ({
  AuthFormContainer: () => null,
}));
vi.mock("@/features/auth/components/auth-status-toast", () => ({
  AuthStatusToast: () => null,
}));

import SignUpPage from "./page";

describe("SignUpPage", () => {
  it("renders the sign-up page content", async () => {
    const result = await SignUpPage({});
    expect(result).toBeTruthy();
  });
});
