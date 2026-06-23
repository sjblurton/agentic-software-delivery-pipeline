import type { Meta, StoryObj } from "@storybook/nextjs";
import { FieldLegend } from "./field-legend";
import { FieldSet } from "@/components/ui/field-set/field-set";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@/components/ui/label/label";

const meta = {
  title: "UI/FieldLegend",
  component: FieldLegend,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FieldLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Preferences</FieldLegend>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox id="opt1" />
          <Label htmlFor="opt1">Option 1</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="opt2" />
          <Label htmlFor="opt2">Option 2</Label>
        </div>
      </div>
    </FieldSet>
  ),
};

export const LegendVariant: Story = {
  args: {
    variant: "legend",
    children: "Select your preferences",
  },
};

export const LabelVariant: Story = {
  args: {
    variant: "label",
    children: "Select your preferences",
  },
};

export const WithDescription: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Communication</FieldLegend>
      <p className="mb-3 text-sm text-muted-foreground">
        Choose how you&apos;d like to receive updates
      </p>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox id="email" />
          <Label htmlFor="email">Email</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="sms" />
          <Label htmlFor="sms">SMS</Label>
        </div>
      </div>
    </FieldSet>
  ),
};
