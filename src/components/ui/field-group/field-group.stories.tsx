import type { Meta, StoryObj } from "@storybook/nextjs";
import { FieldGroup } from "./field-group";
import { Field } from "@/components/ui/field/field";
import { FieldLabel } from "@/components/ui/field-label/field-label";
import { Input } from "@/components/ui/input/input";

const meta = {
  title: "UI/FieldGroup",
  component: FieldGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FieldGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" placeholder="you@example.com" />
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input id="password" type="password" placeholder="••••••••" />
      </Field>
    </FieldGroup>
  ),
};

export const MultipleGroups: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="firstname">First Name</FieldLabel>
        <Input id="firstname" placeholder="John" />
      </Field>
      <Field>
        <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
        <Input id="lastname" placeholder="Doe" />
      </Field>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="street">Street</FieldLabel>
          <Input id="street" placeholder="123 Main St" />
        </Field>
        <Field>
          <FieldLabel htmlFor="city">City</FieldLabel>
          <Input id="city" placeholder="New York" />
        </Field>
      </FieldGroup>
    </FieldGroup>
  ),
};

export const TightSpacing: Story = {
  render: () => (
    <FieldGroup className="gap-2">
      <Field>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input id="username" placeholder="john_doe" />
      </Field>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" placeholder="john@example.com" />
      </Field>
    </FieldGroup>
  ),
};
