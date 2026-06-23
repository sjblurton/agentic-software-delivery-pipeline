import { mergeClassNames as cn } from "@/lib/utils/styling/class-names";

/** Content wrapper for label/control/description stacks in a Field row.
 * https://ui.shadcn.com/docs/components/base/field#fieldcontent
 */
function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        className,
      )}
      {...props}
    />
  );
}

export { FieldContent };
