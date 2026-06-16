import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import type { FormActionState } from "@/features/forms/lib/form-action-state";

type DatabaseStarterFormProps = {
  fieldErrors: FormActionState["fieldErrors"];
  formStatus: FormActionState["status"];
  formMessage?: string;
  isSubmitting: boolean;
  formAction?: (formData: FormData) => void;
};

export function DatabaseStarterForm({
  fieldErrors,
  formStatus,
  formMessage,
  isSubmitting,
  formAction,
}: DatabaseStarterFormProps) {
  const nameFieldError = fieldErrors.name?.[0];

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id="name"
          name="name"
          aria-label="Record name"
          placeholder="Record name"
          aria-invalid={Boolean(nameFieldError)}
          disabled={isSubmitting}
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          Add row
        </Button>
      </div>
      {nameFieldError ? (
        <p className="text-destructive text-sm" role="alert">
          {nameFieldError}
        </p>
      ) : null}
      {formStatus === "error" && formMessage ? (
        <p className="text-destructive text-sm" role="alert">
          {formMessage}
        </p>
      ) : null}
    </form>
  );
}
