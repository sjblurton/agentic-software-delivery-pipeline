import { describe, expect, it, vi } from "vitest";
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
});
