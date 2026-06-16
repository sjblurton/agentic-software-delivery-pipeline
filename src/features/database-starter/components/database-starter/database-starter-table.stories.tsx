import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, within } from "storybook/test";
import { DatabaseStarterTable } from "./database-starter-table";

const meta = {
  title: "Features/DatabaseStarter/DatabaseStarterTable",
  component: DatabaseStarterTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DatabaseStarterTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  args: {
    records: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("No records yet. Add one to verify database writes."),
    ).toBeInTheDocument();
  },
};

export const PopulatedState: Story = {
  args: {
    records: [
      {
        id: "record-1",
        name: "Starter row A",
        createdAt: new Date("2026-06-16T11:00:00.000Z"),
      },
      {
        id: "record-2",
        name: "Starter row B",
        createdAt: new Date("2026-06-16T11:05:00.000Z"),
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("cell", { name: "Starter row A" }),
    ).toBeVisible();
    await expect(canvas.getByText("Starter row B")).toBeInTheDocument();
  },
};
