import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, within } from "storybook/test";
import { Input } from "./input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Type here...",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Disabled value",
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    value: "invalid-email",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByDisplayValue("invalid-email");
    const styles = getComputedStyle(input);

    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(styles.getPropertyValue("--tw-ring-color").trim()).not.toBe(
      "",
    );
  },
};
