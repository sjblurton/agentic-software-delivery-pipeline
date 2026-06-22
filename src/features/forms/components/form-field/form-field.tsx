"use client";

import { Input } from "@/components/ui/input/input";
import { useController, useFormContext } from "react-hook-form";
import type { ZodTypeAny } from "zod";

type FormFieldProps = {
  label: string;
  name: string;
  type: "email" | "password" | "text";
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
};

export function FormField({
  label,
  name,
  type,
  placeholder,
  autoComplete,
  disabled,
}: FormFieldProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });
  const schema = (
    control as {
      _options?: {
        context?: {
          schema?: ZodTypeAny;
        };
      };
    }
  )._options?.context?.schema;
  const isRequired = isFieldRequired(schema, name);
  const firstErrorMessage =
    fieldState.error?.message ??
    (fieldState.error?.types
      ? Object.values(fieldState.error.types)[0]
      : undefined);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        required={isRequired}
        aria-invalid={Boolean(firstErrorMessage)}
        {...field}
      />
      {firstErrorMessage ? (
        <p className="text-destructive text-sm" role="alert">
          {firstErrorMessage}
        </p>
      ) : null}
    </div>
  );
}

function isFieldRequired(
  schema: ZodTypeAny | undefined,
  path: string,
): boolean {
  if (!schema) {
    return false;
  }

  const fieldSchema = getSchemaAtPath(schema, path);
  if (!fieldSchema) {
    return false;
  }

  if (typeof fieldSchema.isOptional === "function") {
    return !fieldSchema.isOptional();
  }

  return true;
}

function getSchemaAtPath(
  rootSchema: ZodTypeAny,
  path: string,
): ZodTypeAny | undefined {
  const pathSegments = path.split(".");
  let currentSchema: ZodTypeAny | undefined = rootSchema;

  for (const segment of pathSegments) {
    const unwrappedSchema = unwrapSchema(currentSchema);

    if (isArrayIndex(segment)) {
      currentSchema = getArrayElementSchema(unwrappedSchema);
      continue;
    }

    const objectShape = getObjectShape(unwrappedSchema);
    if (!objectShape || !(segment in objectShape)) {
      return undefined;
    }

    currentSchema = objectShape[segment];
  }

  return currentSchema;
}

function isArrayIndex(segment: string): boolean {
  return Number.isInteger(Number(segment));
}

function getObjectShape(
  schema: ZodTypeAny | undefined,
): Record<string, ZodTypeAny> | undefined {
  if (!schema) {
    return undefined;
  }

  const objectSchema = schema as ZodTypeAny & {
    shape?: Record<string, ZodTypeAny> | (() => Record<string, ZodTypeAny>);
  };
  if (!objectSchema.shape) {
    return undefined;
  }

  return typeof objectSchema.shape === "function"
    ? objectSchema.shape()
    : objectSchema.shape;
}

function getArrayElementSchema(
  schema: ZodTypeAny | undefined,
): ZodTypeAny | undefined {
  if (!schema) {
    return undefined;
  }

  const arraySchema = schema as ZodTypeAny & {
    element?: ZodTypeAny;
    def?: {
      element?: ZodTypeAny;
    };
    _def?: {
      element?: ZodTypeAny;
      type?: ZodTypeAny;
    };
  };

  return (
    arraySchema.element ?? arraySchema.def?.element ?? arraySchema._def?.element
  );
}

function unwrapSchema(schema: ZodTypeAny | undefined): ZodTypeAny | undefined {
  if (!schema) {
    return undefined;
  }

  let current: ZodTypeAny = schema;

  // Unwrap wrappers (optional, default, transforms, etc.) to reach object/array roots.
  while (true) {
    const wrapped = current as ZodTypeAny & {
      def?: {
        innerType?: ZodTypeAny;
        schema?: ZodTypeAny;
        type?: ZodTypeAny;
      };
      _def?: {
        innerType?: ZodTypeAny;
        schema?: ZodTypeAny;
        type?: ZodTypeAny;
      };
    };

    const next =
      wrapped.def?.innerType ??
      wrapped.def?.schema ??
      wrapped._def?.innerType ??
      wrapped._def?.schema;

    if (!next || next === current) {
      return current;
    }

    current = next;
  }
}
