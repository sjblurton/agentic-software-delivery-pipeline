"use client";

import { Input } from "@/components/ui/input/input";
import type { ComponentProps } from "react";
import { useController, useFormContext } from "react-hook-form";

type FormFieldProps = {
  label: string;
  name: string;
  type: ComponentProps<"input">["type"];
} & Omit<ComponentProps<"input">, "name" | "type">;

export function FormField({
  label,
  name,
  type,
  id,
  ...inputProps
}: FormFieldProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });
  const firstErrorMessage =
    fieldState.error?.message ??
    (fieldState.error?.types
      ? Object.values(fieldState.error.types)[0]
      : undefined);
  const inputId = id ?? name;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" htmlFor={inputId}>
        {label}
      </label>
      <Input
        id={inputId}
        type={type}
        {...field}
        {...inputProps}
        aria-invalid={Boolean(firstErrorMessage)}
      />
      {firstErrorMessage ? (
        <p className="text-destructive text-sm" role="alert">
          {firstErrorMessage}
        </p>
      ) : null}
    </div>
  );
}
