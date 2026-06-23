import { mergeClassNames as cn } from "@/lib/utils/styling/class-names";
import { Label } from "@/components/ui/label/label";

/** Label primitive for a field row/content in shadcn Field composition.
 * https://ui.shadcn.com/docs/components/base/field#fieldlabel
 */
function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        `group/field-label peer/field-label flex w-fit gap-2 leading-snug
        group-data-[disabled=true]/field:opacity-50
        data-[invalid=true]:text-destructive
        group-data-[invalid=true]/field:text-destructive`,
        `has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col
        has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border
        *:data-[slot=field]:p-4`,
        `has-data-[state=checked]:border-primary
        has-data-[state=checked]:bg-primary/5
        dark:has-data-[state=checked]:bg-primary/10`,
        className,
      )}
      {...props}
    />
  );
}

export { FieldLabel };
