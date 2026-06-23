import type { Meta, StoryObj } from "@storybook/nextjs";
import { Separator } from "./separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <div>
        <h3 className="text-lg font-medium">Section One</h3>
        <p className="text-sm text-muted-foreground">Some content here</p>
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-medium">Section Two</h3>
        <p className="text-sm text-muted-foreground">More content here</p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-32 items-center gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium">Left</p>
        <p className="text-xs text-muted-foreground">Content</p>
      </div>
      <Separator orientation="vertical" />
      <div className="flex-1">
        <p className="text-sm font-medium">Right</p>
        <p className="text-xs text-muted-foreground">Content</p>
      </div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-64">
      <ul className="space-y-0">
        <li className="py-2 px-2">Item One</li>
        <Separator />
        <li className="py-2 px-2">Item Two</li>
        <Separator />
        <li className="py-2 px-2">Item Three</li>
      </ul>
    </div>
  ),
};

export const WithMargin: Story = {
  render: () => (
    <div className="w-64 space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-4">Section with margin</h3>
        <p className="text-sm text-muted-foreground mb-4">Content</p>
      </div>
      <Separator />
      <div>
        <h3 className="text-sm font-medium mb-4">Next section</h3>
        <p className="text-sm text-muted-foreground mb-4">More content</p>
      </div>
    </div>
  ),
};
