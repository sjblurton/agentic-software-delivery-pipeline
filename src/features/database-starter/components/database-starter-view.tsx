import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table";
import type { FormActionState } from "@/features/forms/lib/form-action-state";

type StarterRecordRow = {
  id: string;
  name: string;
  createdAt: Date;
};

type DatabaseStarterViewProps = {
  records: StarterRecordRow[];
  formFieldErrors: FormActionState["fieldErrors"];
  formStatus: FormActionState["status"];
  formMessage?: string;
  isSubmitting: boolean;
  formAction?: (formData: FormData) => void;
};

function formatCreatedAtLabel(createdAt: Date) {
  return createdAt.toISOString().replace("T", " ").slice(0, 16);
}

export function DatabaseStarterView({
  records,
  formFieldErrors,
  formStatus,
  formMessage,
  isSubmitting,
  formAction,
}: DatabaseStarterViewProps) {
  const nameFieldError = formFieldErrors.name?.[0];

  return (
    <section
      className="bg-card text-card-foreground w-full rounded-xl border p-6
        shadow-sm md:p-8"
    >
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
        Database starter records
      </h1>
      <p className="text-muted-foreground mt-2">
        Add and read starter rows to verify the Drizzle + Postgres slice.
      </p>

      <form
        action={formAction}
        className="mt-6 flex flex-col gap-2 sm:flex-row"
      >
        <Input
          id="name"
          name="name"
          aria-label="Record name"
          placeholder="Record name"
          aria-invalid={Boolean(nameFieldError)}
          disabled={isSubmitting}
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          Add row
        </Button>
      </form>
      {nameFieldError ? (
        <p className="text-destructive mt-2 text-sm" role="alert">
          {nameFieldError}
        </p>
      ) : null}
      {formStatus === "error" && formMessage ? (
        <p className="text-destructive mt-2 text-sm" role="alert">
          {formMessage}
        </p>
      ) : null}

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2}>
                  No records yet. Add one to verify database writes.
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>
                    {formatCreatedAtLabel(record.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
