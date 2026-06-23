import type { Meta, StoryObj } from "@storybook/nextjs";
import { FieldTitle } from "./field-title";

const meta = {
  title: "UI/FieldTitle",
  component: FieldTitle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Title text for form section headers and grouped fields. https://ui.shadcn.com/docs/components/base/field#fieldtitle",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FieldTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Field Title",
  },
};

export const WithIcon: Story = {
  render: () => (
    <FieldTitle>
      <span>⭐</span>
      Featured
    </FieldTitle>
  ),
};

export const WithAsterisk: Story = {
  render: () => (
    <FieldTitle>
      Email
      <span className="text-destructive">*</span>
    </FieldTitle>
  ),
};

export const LongText: Story = {
  args: {
    children:
      "This is a longer field title that explains what goes in this field",
  },
};

export const Disabled: Story = {
  render: () => (
    <div data-disabled="true" className="group/field">
      <FieldTitle>Disabled Field</FieldTitle>
    </div>
  ),
};
