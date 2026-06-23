import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FieldLabel } from "./field-label";

describe("FieldLabel invalid styles", () => {
  it("supports data-invalid destructive text styling", () => {
    render(<FieldLabel data-invalid="true">Email</FieldLabel>);

    const label = screen.getByText("Email");

    expect(label).toHaveClass("data-[invalid=true]:text-destructive");
    expect(label).toHaveClass(
      "group-data-[invalid=true]/field:text-destructive",
    );
  });
});
