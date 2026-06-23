import type { Meta, StoryObj } from "@storybook/nextjs";
import { Field, FieldLabel, FieldDescription, FieldError } from "./field";
import { Input } from "@/components/ui/input/input";

const meta = {
  title: "UI/Field",
  component: Field,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalField: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" placeholder="Enter your email" />
      <FieldDescription>We&apos;ll never share your email.</FieldDescription>
    </Field>
  ),
  args: {
    orientation: "vertical",
  },
};

export const HorizontalField: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" placeholder="Enter your username" />
    </Field>
  ),
  args: {
    orientation: "horizontal",
  },
};

export const ResponsiveField: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <Input id="password" type="password" placeholder="Enter your password" />
      <FieldDescription>At least 8 characters long.</FieldDescription>
    </Field>
  ),
  args: {
    orientation: "responsive",
  },
};

export const FieldWithError: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="field-error">Required Field</FieldLabel>
      <Input id="field-error" aria-invalid="true" />
      <FieldError>This field is required</FieldError>
    </Field>
  ),
  args: {
    orientation: "vertical",
  },
};

export const FieldWithMultipleErrors: Story = {
  render: () => (
    <Field>
      <FieldLabel>Password</FieldLabel>
      <Input aria-invalid="true" type="password" />
      <FieldError
        errors={[
          { message: "Password must be at least 8 characters" },
          { message: "Password must contain at least one special character" },
        ]}
      />
    </Field>
  ),
};

export const FieldWithDescriptionAndError: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="bio">Bio</FieldLabel>
      <Input id="bio" aria-invalid="true" />
      <FieldDescription>Maximum 500 characters</FieldDescription>
      <FieldError>Bio contains invalid characters</FieldError>
    </Field>
  ),
};
