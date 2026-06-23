import type { Meta, StoryObj } from "@storybook/nextjs";
import { FieldContent } from "./field-content";
import { FieldLabel } from "@/components/ui/field-label/field-label";
import { FieldDescription } from "@/components/ui/field-description/field-description";
import { Input } from "@/components/ui/input/input";

const meta = {
  title: "UI/FieldContent",
  component: FieldContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FieldContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FieldContent>
      <FieldLabel htmlFor="example">Email</FieldLabel>
      <Input id="example" placeholder="you@example.com" />
    </FieldContent>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <FieldContent>
      <FieldLabel htmlFor="example">Email</FieldLabel>
      <Input id="example" placeholder="you@example.com" />
      <FieldDescription>We&apos;ll never share your email.</FieldDescription>
    </FieldContent>
  ),
};

export const MultipleInputs: Story = {
  render: () => (
    <FieldContent>
      <FieldLabel>Full Name</FieldLabel>
      <div className="flex gap-2">
        <Input placeholder="First name" />
        <Input placeholder="Last name" />
      </div>
    </FieldContent>
  ),
};
