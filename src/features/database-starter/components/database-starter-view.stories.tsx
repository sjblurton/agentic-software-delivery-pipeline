import type { Meta, StoryObj } from "@storybook/nextjs";
import { DatabaseStarterView } from "./database-starter-view";

const meta = {
  title: "Features/DatabaseStarter/DatabaseStarterView",
  component: DatabaseStarterView,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    formFieldErrors: {},
    formStatus: "idle",
    isSubmitting: false,
  },
} satisfies Meta<typeof DatabaseStarterView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  args: {
    records: [],
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
};
