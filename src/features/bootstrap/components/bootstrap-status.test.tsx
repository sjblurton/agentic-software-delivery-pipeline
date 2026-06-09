import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BootstrapStatus } from "./bootstrap-status";

describe("BootstrapStatus", () => {
  it("renders the baseline completion heading", () => {
    render(<BootstrapStatus />);

    expect(
      screen.getByRole("heading", { name: /bootstrap baseline completed/i }),
    ).toBeInTheDocument();
  });
});
