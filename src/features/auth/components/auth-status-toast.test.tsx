import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthStatusToast } from "./auth-status-toast";

const toastMock = vi.hoisted(() => ({
  success: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: toastMock,
}));

describe("AuthStatusToast", () => {
  beforeEach(() => {
    toastMock.success.mockReset();
  });

  it("emits a success toast for known auth status values", () => {
    render(<AuthStatusToast authStatus="sign-in-success" />);
    expect(toastMock.success).toHaveBeenCalledWith("Signed in successfully.");
  });

  it("does not emit toasts for unknown auth status values", () => {
    render(<AuthStatusToast authStatus="unknown-status" />);
    expect(toastMock.success).not.toHaveBeenCalled();
  });
});
