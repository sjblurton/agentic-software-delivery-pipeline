import { beforeEach, describe, expect, it, vi } from "vitest";

const redirectMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({ redirect: redirectMock }));

import Home from "./page";

describe("Home page", () => {
  beforeEach(() => {
    redirectMock.mockReset();
  });

  it("redirects to /dashboard", async () => {
    await Home();

    expect(redirectMock).toHaveBeenCalledWith("/dashboard");
  });
});
