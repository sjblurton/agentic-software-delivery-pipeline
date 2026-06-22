import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { FormField } from "./form-field";

const signInSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }),
});

describe("FormField integration", () => {
  it("binds input state through useController and submits the updated value", async () => {
    const submitHandler = vi.fn();

    function BindingsForm() {
      const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
          email: "",
        },
        context: {
          schema: signInSchema,
        },
      });

      return (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <FormField label="Email" name="email" type="email" />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    }

    render(<BindingsForm />);

    await userEvent.type(screen.getByLabelText("Email"), "bind@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(submitHandler).toHaveBeenCalledWith(
      { email: "bind@example.com" },
      expect.anything(),
    );
  });
});
