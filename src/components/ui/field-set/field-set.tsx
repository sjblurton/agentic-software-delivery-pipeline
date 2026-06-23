import { mergeClassNames as cn } from "@/lib/utils/styling/class-names";

/** Fieldset wrapper for related controls (checkboxes/radios).
 * https://ui.shadcn.com/docs/components/base/field#fieldset
 */
function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        `has-[>[data-slot=checkbox-group]]:gap-3
        has-[>[data-slot=radio-group]]:gap-3`,
        className,
      )}
      {...props}
    />
  );
}

export { FieldSet };
