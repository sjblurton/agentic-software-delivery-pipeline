import type { Meta, StoryObj } from "@storybook/nextjs";
import { Label } from "./label";
import { Input } from "@/components/ui/input/input";

const meta = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64 space-y-2">
      <Label {...args} htmlFor="input">
        Email
      </Label>
      <Input id="input" placeholder="example@email.com" />
    </div>
  ),
};

export const WithRequiredIndicator: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="required">
        Full Name <span className="text-destructive">*</span>
      </Label>
      <Input id="required" placeholder="John Doe" required />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="disabled" className="opacity-50">
        Disabled Label
      </Label>
      <Input id="disabled" disabled placeholder="Cannot edit" />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Label htmlFor="search">🔍 Search</Label>
      <Input id="search" placeholder="Enter search term..." />
    </div>
  ),
};
