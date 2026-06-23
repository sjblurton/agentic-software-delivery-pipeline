import type { Meta, StoryObj } from "@storybook/nextjs";
import { FieldLabel } from "@/components/ui/field-label/field-label";
import { Input } from "@/components/ui/input/input";

const meta = {
  title: "UI/FieldLabel",
  component: FieldLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FieldLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64 space-y-2">
      <FieldLabel {...args} htmlFor="input">
        Email Address
      </FieldLabel>
      <Input id="input" placeholder="example@email.com" />
    </div>
  ),
};

export const WithRequiredIndicator: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <FieldLabel htmlFor="required-field">
        Full Name <span className="text-destructive">*</span>
      </FieldLabel>
      <Input id="required-field" placeholder="John Doe" required />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64 space-y-2 opacity-50">
      <FieldLabel htmlFor="disabled-field">Disabled Field</FieldLabel>
      <Input id="disabled-field" disabled placeholder="Cannot edit" />
    </div>
  ),
};

export const LongLabel: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <FieldLabel htmlFor="long-label">
        Please enter your email address so we can send you important updates and
        notifications about your account
      </FieldLabel>
      <Input id="long-label" placeholder="example@email.com" />
    </div>
  ),
};
