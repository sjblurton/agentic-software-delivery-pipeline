"use client";

import * as React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";

import { mergeClassNames as cn } from "@/lib/utils/styling/class-names";

/**
 * Separator primitive for a Field composition.
 * https://www.radix-ui.com/primitives/docs/components/separator
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        `shrink-0 bg-border data-[orientation=horizontal]:h-px
        data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full
        data-[orientation=vertical]:w-px`,
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
