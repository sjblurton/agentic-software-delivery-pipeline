import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BootstrapDemoActions } from "./bootstrap-demo-actions";

const toastMock = vi.hoisted(() => {
  const base = vi.fn();
  return Object.assign(base, { success: vi.fn() });
});

vi.mock("sonner", () => ({
  toast: toastMock,
}));

describe("BootstrapDemoActions", () => {
  it("emits a success toast for the UI baseline action", async () => {
    render(<BootstrapDemoActions />);

    await userEvent.click(
      screen.getByRole("button", { name: /verify ui baseline/i }),
    );

    expect(toastMock.success).toHaveBeenCalledWith("Baseline app is running.", {
      description: "UI atoms + sonner are wired and interactive.",
      icon: expect.any(Object),
    });
  });

  it("emits an informational toast for the server baseline action", async () => {
    render(<BootstrapDemoActions />);

    await userEvent.click(
      screen.getByRole("button", { name: /verify server baseline/i }),
    );

    expect(toastMock).toHaveBeenCalledWith("Server data layer baseline", {
      description: "Server Components + Server Actions tracer slice can start.",
      icon: expect.any(Object),
    });
  });

  it("emits an informational toast for the database baseline action", async () => {
    render(<BootstrapDemoActions />);

    await userEvent.click(
      screen.getByRole("button", { name: /verify db baseline/i }),
    );

    expect(toastMock).toHaveBeenCalledWith("Database baseline", {
      description: "Drizzle + Supabase dependencies are installed.",
      icon: expect.any(Object),
    });
  });
});
