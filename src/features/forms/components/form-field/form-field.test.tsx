import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { FormField } from "./form-field";

const signInSchema = z.object({
  email: z.email("Please enter a valid email."),
});
const nestedSchema = z.object({
  phones: z.array(
    z.object({
      number: z.string().min(1, "Number is required."),
      extension: z.string().optional(),
    }),
  ),
});

function TestForm() {
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
      <form>
        <FormField label="Email" name="email" type="email" />
      </form>
    </FormProvider>
  );
}

describe("FormField", () => {
  it("renders label and input for a field", () => {
    render(<TestForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders only the first field error message", () => {
    function TestFormWithErrors() {
      const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
          email: "",
        },
        context: {
          schema: signInSchema,
        },
      });

      useEffect(() => {
        form.setError("email", {
          type: "manual",
          message: "Please enter a valid email.",
          types: {
            first: "Please enter a valid email.",
            second: "Fallback should not render.",
          },
        });
      }, [form]);

      return (
        <FormProvider {...form}>
          <form>
            <FormField label="Email" name="email" type="email" />
          </form>
        </FormProvider>
      );
    }

    render(<TestFormWithErrors />);

    expect(screen.getByText("Please enter a valid email.")).toBeInTheDocument();
    expect(
      screen.queryByText("Fallback should not render."),
    ).not.toBeInTheDocument();
  });

  it("extracts required metadata from schema and supports nested field paths", () => {
    function NestedForm() {
      const form = useForm({
        resolver: zodResolver(nestedSchema),
        defaultValues: {
          phones: [{ number: "", extension: "" }],
        },
        context: {
          schema: nestedSchema,
        },
      });

      return (
        <FormProvider {...form}>
          <form>
            <FormField
              label="Phone number"
              name="phones.0.number"
              type="text"
            />
            <FormField
              label="Phone extension"
              name="phones.0.extension"
              type="text"
            />
          </form>
        </FormProvider>
      );
    }

    render(<NestedForm />);

    const requiredInput = screen.getByLabelText("Phone number");
    const optionalInput = screen.getByLabelText("Phone extension");

    expect(requiredInput).toBeRequired();
    expect(optionalInput).not.toBeRequired();
  });

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
