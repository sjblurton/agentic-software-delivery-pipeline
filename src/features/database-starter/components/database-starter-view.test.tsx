import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DatabaseStarterView } from "./database-starter-view";

describe("DatabaseStarterView", () => {
  it("renders an empty-state row when there are no records", () => {
    render(
      <DatabaseStarterView
        records={[]}
        formFieldErrors={{}}
        formStatus="idle"
        isSubmitting={false}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Database starter records" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("No records yet. Add one to verify database writes."),
    ).toBeInTheDocument();
  });

  it("renders records in the table body", () => {
    render(
      <DatabaseStarterView
        records={[
          {
            id: "row-1",
            name: "First row",
            createdAt: new Date("2026-06-16T10:00:00.000Z"),
          },
          {
            id: "row-2",
            name: "Second row",
            createdAt: new Date("2026-06-16T10:01:00.000Z"),
          },
        ]}
        formFieldErrors={{}}
        formStatus="idle"
        isSubmitting={false}
      />,
    );

    expect(screen.getByText("First row")).toBeInTheDocument();
    expect(screen.getByText("Second row")).toBeInTheDocument();
  });
});
