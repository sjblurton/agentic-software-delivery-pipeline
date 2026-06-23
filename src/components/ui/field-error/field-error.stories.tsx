import type { Meta, StoryObj } from "@storybook/nextjs";
import { FieldError } from "@/components/ui/field-error/field-error";

const meta = {
  title: "UI/FieldError",
  component: FieldError,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FieldError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleError: Story = {
  args: {
    children: "This field is required",
  },
};

export const CustomErrorContent: Story = {
  args: {
    children: "Please enter a valid email address",
  },
};

export const MultipleErrors: Story = {
  args: {
    errors: [
      { message: "Password must be at least 8 characters" },
      { message: "Password must contain at least one number" },
      { message: "Password must contain at least one special character" },
    ],
  },
};

export const DuplicateErrorsFiltered: Story = {
  args: {
    errors: [
      { message: "This field is required" },
      { message: "This field is required" },
      { message: "This field is required" },
    ],
  },
};

export const WithoutContent: Story = {
  args: {},
  render: () => <div />,
};

export const WithLongError: Story = {
  args: {
    children:
      "The username you entered is already taken. Please try a different username or contact support if you believe this is an error.",
  },
};
