import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, userEvent, within } from "storybook/test";
import { AuthFormView } from "./auth-form-view";

const meta = {
  title: "Features/Auth/AuthFormView",
  component: AuthFormView,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-105" data-testid="auth-form-view-story-root">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof AuthFormView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignInDefault: Story = {
  args: {
    mode: "sign-in",
    isPending: false,
    fieldErrors: {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Sign in" }),
    ).toBeVisible();

    const emailField = canvas.getByLabelText("Email");
    await userEvent.type(emailField, "story@example.com");
    await expect(emailField).toHaveValue("story@example.com");
  },
};

export const SignInWithErrors: Story = {
  args: {
    mode: "sign-in",
    isPending: false,
    message: "Invalid login credentials.",
    fieldErrors: {
      email: ["Please enter a valid email."],
      password: ["Password must be at least 8 characters."],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Invalid login credentials."),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("Please enter a valid email."),
    ).toBeInTheDocument();
  },
};

export const SignUpDefault: Story = {
  args: {
    mode: "sign-up",
    isPending: false,
    fieldErrors: {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Create account" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Create account" }),
    ).toBeEnabled();
  },
};
