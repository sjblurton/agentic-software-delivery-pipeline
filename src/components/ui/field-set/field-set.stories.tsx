import type { Meta, StoryObj } from "@storybook/nextjs";
import { FieldSet } from "./field-set";
import { FieldLegend } from "@/components/ui/field-legend/field-legend";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@/components/ui/label/label";

const meta = {
  title: "UI/FieldSet",
  component: FieldSet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FieldSet>;

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
        <div className="flex items-center gap-2">
          <Checkbox id="opt3" />
          <Label htmlFor="opt3">Option 3</Label>
        </div>
      </div>
    </FieldSet>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FieldSet disabled>
      <FieldLegend>Disabled Preferences</FieldLegend>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox id="opt1" disabled />
          <Label htmlFor="opt1">Option 1</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="opt2" disabled />
          <Label htmlFor="opt2">Option 2</Label>
        </div>
      </div>
    </FieldSet>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Notifications</FieldLegend>
      <p className="mb-3 text-sm text-muted-foreground">
        Choose which notifications you want to receive
      </p>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox id="email" defaultChecked />
          <Label htmlFor="email">Email notifications</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="sms" />
          <Label htmlFor="sms">SMS notifications</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="push" />
          <Label htmlFor="push">Push notifications</Label>
        </div>
      </div>
    </FieldSet>
  ),
};
