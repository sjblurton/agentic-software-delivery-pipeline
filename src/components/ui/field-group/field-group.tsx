import { mergeClassNames as cn } from "@/lib/utils/styling/class-names";

/** Vertical group for multiple Field blocks.
 * https://ui.shadcn.com/docs/components/base/field#fieldgroup
 */
function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        `group/field-group @container/field-group flex w-full flex-col gap-7
        data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4`,
        className,
      )}
      {...props}
    />
  );
}

export { FieldGroup };
