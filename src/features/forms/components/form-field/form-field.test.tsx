import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { describe, expect, it } from "vitest";
import { FormField } from "./form-field";

function TestForm() {
  const form = useForm({
    defaultValues: {
      email: "",
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

  it("supports a custom input id", () => {
    function FormWithCustomId() {
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

    render(<FormWithCustomId />);

    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "id",
      "custom-email-id",
    );
  });

  it("renders only the first field error message", () => {
    function TestFormWithErrors() {
      const form = useForm({
        defaultValues: {
          email: "",
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
        defaultValues: {
          email: "",
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

  it("supports nested field paths in react-hook-form state", () => {
    function NestedPathForm() {
      const form = useForm({
        defaultValues: {
          phones: [{ number: "" }],
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
          </form>
        </FormProvider>
      );
    }

    render(<NestedPathForm />);

    expect(screen.getByLabelText("Phone number")).toHaveAttribute(
      "name",
      "phones.0.number",
    );
  });
});
