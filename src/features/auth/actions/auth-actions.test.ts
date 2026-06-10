import { beforeEach, describe, expect, it, vi } from "vitest";
import { initialAuthActionState } from "../lib/auth-action-state";
import { signInAction, signOutAction, signUpAction } from "./auth-actions";

const redirectMock = vi.hoisted(() => vi.fn());
const createClientMock = vi.hoisted(() => vi.fn());
const signInWithPasswordMock = vi.hoisted(() => vi.fn());
const signUpMock = vi.hoisted(() => vi.fn());
const signOutMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: createClientMock,
}));

function createAuthFormData(email: string, password: string) {
  const formData = new FormData();
  formData.set("email", email);
  formData.set("password", password);
  return formData;
}

describe("auth server actions", () => {
  beforeEach(() => {
    createClientMock.mockReset();
    signInWithPasswordMock.mockReset();
    signUpMock.mockReset();
    signOutMock.mockReset();
    redirectMock.mockReset();
  });

  it("returns field-level errors at the boundary for invalid sign-in input", async () => {
    const result = await signInAction(
      initialAuthActionState,
      createAuthFormData("bad", "123"),
    );

    expect(result.status).toBe("error");
    expect(result.fieldErrors).toEqual({
      email: ["Please enter a valid email."],
      password: ["Password must be at least 8 characters."],
    });
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("returns field-level errors at the boundary for invalid sign-up input", async () => {
    const result = await signUpAction(
      initialAuthActionState,
      createAuthFormData("bad", "123"),
    );

    expect(result.status).toBe("error");
    expect(result.fieldErrors).toEqual({
      email: ["Please enter a valid email."],
      password: ["Password must be at least 8 characters."],
    });
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("signs in and redirects for valid credentials", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        signInWithPassword: signInWithPasswordMock.mockResolvedValue({
          error: null,
        }),
      },
    });

    await signInAction(
      initialAuthActionState,
      createAuthFormData("person@example.com", "password123"),
    );

    expect(signInWithPasswordMock).toHaveBeenCalledWith({
      email: "person@example.com",
      password: "password123",
    });
    expect(redirectMock).toHaveBeenCalledWith("/?auth=sign-in-success");
  });

  it("returns an error state when sign-in fails at the provider seam", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        signInWithPassword: signInWithPasswordMock.mockResolvedValue({
          error: { message: "Invalid login credentials." },
        }),
      },
    });

    const result = await signInAction(
      initialAuthActionState,
      createAuthFormData("person@example.com", "password123"),
    );

    expect(result).toEqual({
      status: "error",
      message: "Invalid login credentials.",
      fieldErrors: {},
    });
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("signs up and redirects for valid credentials", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        signUp: signUpMock.mockResolvedValue({ error: null }),
      },
    });

    await signUpAction(
      initialAuthActionState,
      createAuthFormData("person@example.com", "password123"),
    );

    expect(signUpMock).toHaveBeenCalledWith({
      email: "person@example.com",
      password: "password123",
    });
    expect(redirectMock).toHaveBeenCalledWith("/?auth=sign-up-success");
  });

  it("returns an error state when sign-up fails at the provider seam", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        signUp: signUpMock.mockResolvedValue({
          error: { message: "Account already exists." },
        }),
      },
    });

    const result = await signUpAction(
      initialAuthActionState,
      createAuthFormData("person@example.com", "password123"),
    );

    expect(result).toEqual({
      status: "error",
      message: "Account already exists.",
      fieldErrors: {},
    });
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("signs out and redirects to sign-in", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        signOut: signOutMock.mockResolvedValue({ error: null }),
      },
    });

    await signOutAction(initialAuthActionState);

    expect(signOutMock).toHaveBeenCalled();
    expect(redirectMock).toHaveBeenCalledWith(
      "/auth/sign-in?auth=sign-out-success",
    );
  });

  it("returns an error state when sign-out fails at the provider seam", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        signOut: signOutMock.mockResolvedValue({
          error: { message: "Unable to sign out." },
        }),
      },
    });

    const result = await signOutAction(initialAuthActionState);

    expect(result).toEqual({
      status: "error",
      message: "Unable to sign out.",
      fieldErrors: {},
    });
    expect(redirectMock).not.toHaveBeenCalled();
  });
});
