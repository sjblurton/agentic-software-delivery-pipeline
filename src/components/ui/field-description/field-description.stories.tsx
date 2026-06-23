import type { Meta, StoryObj } from "@storybook/nextjs";
import { FieldDescription, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";

const meta = {
  title: "UI/FieldDescription",
  component: FieldDescription,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FieldDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleDescription: Story = {
  render: (args) => (
    <div className="w-64 space-y-2">
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" placeholder="example@email.com" />
      <FieldDescription {...args}>
        We&apos;ll never share your email with anyone else.
      </FieldDescription>
    </div>
  ),
};

export const HelperTextDescription: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <Input id="password" type="password" />
      <FieldDescription>
        At least 8 characters, including uppercase, lowercase, and numbers.
      </FieldDescription>
    </div>
  ),
};

export const WithLink: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <FieldLabel htmlFor="terms">Terms</FieldLabel>
      <Input id="terms" type="checkbox" />
      <FieldDescription>
        I agree to the{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          terms and conditions
        </a>
      </FieldDescription>
    </div>
  ),
};

export const LongDescription: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <FieldLabel htmlFor="bio">Biography</FieldLabel>
      <textarea
        id="bio"
        className="block w-full rounded-md border border-input bg-background
          px-3 py-2 text-base placeholder-muted-foreground shadow-sm"
        placeholder="Tell us about yourself..."
      />
      <FieldDescription>
        Your biography will be displayed on your public profile. Keep it
        professional and informative. You can include relevant links and
        information about your background, expertise, and interests.
      </FieldDescription>
    </div>
  ),
};

export const MultipleDescriptions: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <div className="space-y-2">
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input id="username" placeholder="john_doe" />
        <FieldDescription>
          3-20 characters, letters, numbers, and underscores only
        </FieldDescription>
      </div>
      <div className="space-y-2">
        <FieldLabel htmlFor="domain">Domain</FieldLabel>
        <Input id="domain" placeholder="example.com" />
        <FieldDescription>
          Your custom domain for your public profile
        </FieldDescription>
      </div>
    </div>
  ),
};
