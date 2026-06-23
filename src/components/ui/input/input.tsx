import { mergeClassNames } from "@/lib/utils/styling/class-names";
import * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={mergeClassNames(
        `h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3
        py-1 text-base shadow-xs transition-[color,box-shadow] outline-none
        selection:bg-primary selection:text-primary-foreground file:inline-flex
        file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium
        file:text-foreground placeholder:text-muted-foreground
        disabled:pointer-events-none disabled:cursor-not-allowed
        disabled:opacity-50 md:text-sm dark:bg-input/30`,
        `focus-visible:border-ring focus-visible:ring-[3px]
        focus-visible:ring-ring/50`,
        `aria-invalid:border-destructive aria-invalid:bg-destructive/5
        aria-invalid:ring-[3px] aria-invalid:ring-destructive/20
        group-data-[invalid=true]/field:border-destructive
        group-data-[invalid=true]/field:bg-destructive/5
        group-data-[invalid=true]/field:ring-[3px]
        group-data-[invalid=true]/field:ring-destructive/20
        dark:aria-invalid:bg-destructive/10
        dark:aria-invalid:ring-destructive/40
        dark:group-data-[invalid=true]/field:bg-destructive/10
        dark:group-data-[invalid=true]/field:ring-destructive/40`,
        className,
      )}
      {...props}
    />
  );
}

export { Input };
