import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuthMock = vi.hoisted(() => vi.fn());
const listStarterRecordsMock = vi.hoisted(() => vi.fn());
const dbMock = vi.hoisted(() => ({}));
const pageShellMock = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/lib/route-guards", () => ({
  requireAuth: requireAuthMock,
}));

vi.mock("@/features/database-starter/lib/starter-records-repository", () => ({
  listStarterRecords: listStarterRecordsMock,
}));

vi.mock("@/lib/db/client", () => ({
  db: dbMock,
}));

vi.mock(
  "@/features/database-starter/components/database-starter/database-starter-page-shell",
  () => ({
    DatabaseStarterPageShell: pageShellMock,
  }),
);

import DatabaseStarterPage from "./page";

describe("starter database page", () => {
  beforeEach(() => {
    requireAuthMock.mockReset();
    listStarterRecordsMock.mockReset();
    pageShellMock.mockReset();
  });

  it("requires auth and renders starter rows", async () => {
    requireAuthMock.mockResolvedValue({
      id: "user-1",
      email: "person@example.com",
    });
    listStarterRecordsMock.mockResolvedValue([
      {
        id: "row-1",
        name: "Seed row",
        createdAt: new Date("2026-06-16T11:00:00.000Z"),
      },
    ]);
    pageShellMock.mockImplementation(({ records }) => (
      <div>
        <h1>Database starter records</h1>
        {records.map((record: { id: string; name: string }) => (
          <p key={record.id}>{record.name}</p>
        ))}
      </div>
    ));

    render(await DatabaseStarterPage());

    expect(requireAuthMock).toHaveBeenCalledTimes(1);
    expect(listStarterRecordsMock).toHaveBeenCalledWith(dbMock);
    expect(
      screen.getByRole("heading", { name: "Database starter records" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Seed row")).toBeInTheDocument();
  });
});
