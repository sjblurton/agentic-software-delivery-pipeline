import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input } from "./input";

describe("Input invalid state styling contract", () => {
  it("includes aria-invalid ring and destructive color utilities", () => {
    render(<Input aria-invalid defaultValue="invalid@example" />);

    const input = screen.getByDisplayValue("invalid@example");

    expect(input).toHaveClass("aria-invalid:ring-3");
    expect(input).toHaveClass("aria-invalid:ring-destructive/20");
    expect(input).toHaveClass("dark:aria-invalid:ring-destructive/40");
    expect(input).toHaveClass("focus-visible:ring-ring/50");
  });
});
