import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { FormField } from "./form-field";

const signInSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }),
});
const nestedSchema = z.object({
  phones: z.array(
    z.object({
      number: z.string().min(1, { error: "Number is required." }),
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
});
