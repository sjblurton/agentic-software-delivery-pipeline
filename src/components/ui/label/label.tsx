"use client";

import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";

import { mergeClassNames as cn } from "@/lib/utils/styling/class-names";

/**
 * Label primitive for a FieldLabel in shadcn Field composition.
 * https://www.radix-ui.com/primitives/docs/components/label
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        `flex items-center gap-2 text-sm leading-none font-medium select-none
        group-data-[disabled=true]:pointer-events-none
        group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed
        peer-disabled:opacity-50`,
        className,
      )}
      {...props}
    />
  );
}

export { Label };
