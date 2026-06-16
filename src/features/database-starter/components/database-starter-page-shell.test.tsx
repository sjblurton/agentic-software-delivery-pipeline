import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DatabaseStarterPageShell } from "./database-starter-page-shell";

const refreshMock = vi.hoisted(() => vi.fn());
const databaseStarterContainerMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

vi.mock("./database-starter-container", () => ({
  DatabaseStarterContainer: databaseStarterContainerMock,
}));

describe("DatabaseStarterPageShell", () => {
  it("refreshes server data after a successful create callback", () => {
    databaseStarterContainerMock.mockImplementation(
      ({ onSuccessfulCreate }: { onSuccessfulCreate: () => void }) => {
        onSuccessfulCreate();
        return <div>Mock container</div>;
      },
    );

    render(<DatabaseStarterPageShell records={[]} />);

    expect(refreshMock).toHaveBeenCalledTimes(1);
  });
});
