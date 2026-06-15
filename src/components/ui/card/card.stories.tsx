import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>Starter Card</CardTitle>
        <CardDescription>Reusable card container state.</CardDescription>
      </CardHeader>
      <CardContent>Card content area.</CardContent>
      <CardFooter>Card footer actions.</CardFooter>
    </Card>
  ),
};
