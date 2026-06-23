import { mergeClassNames as cn } from "@/lib/utils/styling/class-names";

/** Helper text shown below a field control.
 * https://ui.shadcn.com/docs/components/base/field#fielddescription
 */
function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        `text-sm leading-normal font-normal text-muted-foreground
        group-has-[[data-orientation=horizontal]]/field:text-balance`,
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className,
      )}
      {...props}
    />
  );
}

export { FieldDescription };
