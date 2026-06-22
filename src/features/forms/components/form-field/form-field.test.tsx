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
const optionalRootSchema = z
  .object({
    email: z.email({ error: "Please enter a valid email." }),
  })
  .optional();

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

  it("supports a custom input id and does not mark required without schema context", () => {
    function FormWithoutSchemaContext() {
      const form = useForm({
        defaultValues: {
          email: "",
        },
      });

      return (
        <FormProvider {...form}>
          <form>
            <FormField
              label="Email"
              name="email"
              id="custom-email-id"
              type="email"
            />
          </form>
        </FormProvider>
      );
    }

    render(<FormWithoutSchemaContext />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("id", "custom-email-id");
    expect(input).not.toBeRequired();
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

  it("uses the first typed error when no direct error message is present", () => {
    function TestFormWithTypedErrors() {
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
          types: {
            first: "Typed error should render first.",
            second: "Second typed error should not render.",
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

    render(<TestFormWithTypedErrors />);

    expect(
      screen.getByText("Typed error should render first."),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Second typed error should not render."),
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

  it("handles unknown schema paths without crashing and keeps field optional", () => {
    function UnknownPathForm() {
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
            <FormField label="Unknown field" name="profile.email" type="text" />
          </form>
        </FormProvider>
      );
    }

    render(<UnknownPathForm />);

    expect(screen.getByLabelText("Unknown field")).not.toBeRequired();
  });

  it("unwraps optional root schemas when resolving required metadata", () => {
    function OptionalRootForm() {
      const form = useForm({
        resolver: zodResolver(optionalRootSchema),
        defaultValues: {
          email: "",
        },
        context: {
          schema: optionalRootSchema,
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

    render(<OptionalRootForm />);

    expect(screen.getByLabelText("Email")).toBeRequired();
  });

  it("gracefully handles wrapper metadata with no inner schema", () => {
    const malformedSchema = {
      def: {
        type: "optional",
      },
    } as unknown as z.ZodTypeAny;

    function MalformedSchemaForm() {
      const form = useForm({
        defaultValues: {
          email: "",
        },
        context: {
          schema: malformedSchema,
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

    render(<MalformedSchemaForm />);

    expect(screen.getByLabelText("Email")).not.toBeRequired();
  });
});
