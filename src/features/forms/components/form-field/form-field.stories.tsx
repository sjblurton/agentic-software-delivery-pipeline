import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, userEvent, within } from "storybook/test";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { FormField } from "./form-field";

const formFieldSchema = z.object({
  email: z.email("Please enter a valid email."),
});

const meta = {
  title: "Features/Forms/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story, context) => {
      const form = useForm({
        resolver: zodResolver(formFieldSchema),
        defaultValues: {
          email: "",
        },
        context: {
          schema: formFieldSchema,
        },
      });

      useEffect(() => {
        if (context.name === "WithError") {
          form.setError("email", {
            type: "manual",
            message: "Please enter a valid email.",
          });
        }
      }, [context.name, form]);

      return (
        <FormProvider {...form}>
          <form className="w-[360px]">
            <Story />
          </form>
        </FormProvider>
      );
    },
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email",
    name: "email",
    type: "email",
    autoComplete: "email",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText("Email");
    await userEvent.type(emailInput, "story@example.com");
    await expect(emailInput).toHaveValue("story@example.com");
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    name: "email",
    type: "email",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "Please enter a valid email.",
    );
  },
};
