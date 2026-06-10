import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AuthFormView } from "./auth-form-view";

describe("AuthFormView", () => {
  it("renders form-level and field-level errors from props", () => {
    render(
      <AuthFormView
        mode="sign-in"
        isPending={false}
        fieldErrors={{
          email: ["Please enter a valid email."],
          password: ["Password must be at least 8 characters."],
        }}
        message="Invalid login credentials."
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Sign in" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Invalid login credentials.")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid email.")).toBeInTheDocument();
    expect(
      screen.getByText("Password must be at least 8 characters."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign in with email" }),
    ).toBeInTheDocument();
  });
});
