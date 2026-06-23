import type { Meta, StoryObj } from "@storybook/nextjs";
import { FieldSeparator } from "./field-separator";
import { Field } from "@/components/ui/field/field";
import { FieldLabel } from "@/components/ui/field-label/field-label";
import { Input } from "@/components/ui/input/input";
import { FieldGroup } from "@/components/ui/field-group/field-group";

const meta = {
  title: "UI/FieldSeparator",
  component: FieldSeparator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FieldSeparator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" placeholder="you@example.com" />
      </Field>
      <FieldSeparator />
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input id="password" type="password" placeholder="••••••••" />
      </Field>
    </FieldGroup>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" placeholder="you@example.com" />
      </Field>
      <FieldSeparator>Or</FieldSeparator>
      <Field>
        <FieldLabel htmlFor="phone">Phone</FieldLabel>
        <Input id="phone" placeholder="+1 (555) 000-0000" />
      </Field>
    </FieldGroup>
  ),
};

export const WithCustomText: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="password">Enter password</FieldLabel>
        <Input id="password" type="password" placeholder="••••••••" />
      </Field>
      <FieldSeparator>Continue without password</FieldSeparator>
      <Field>
        <FieldLabel htmlFor="code">Verification code</FieldLabel>
        <Input id="code" placeholder="000000" />
      </Field>
    </FieldGroup>
  ),
};
