import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, within } from "storybook/test";
import { DatabaseStarterForm } from "./database-starter-form";

const meta = {
  title: "Features/DatabaseStarter/DatabaseStarterForm",
  component: DatabaseStarterForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    fieldErrors: {},
    formStatus: "idle",
    isSubmitting: false,
  },
} satisfies Meta<typeof DatabaseStarterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Add row" })).toBeEnabled();
  },
};
