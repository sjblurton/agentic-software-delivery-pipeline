import type { FormActionState } from "@/features/forms/lib/form-action-state";
import { DatabaseStarterForm } from "./DatabaseStarterForm";
import { DatabaseStarterTable } from "./DatabaseStarterTable";

type StarterRecordRow = {
  id: string;
  name: string;
  createdAt: Date;
};

type DatabaseStarterProps = {
  records: StarterRecordRow[];
  formFieldErrors: FormActionState["fieldErrors"];
  formStatus: FormActionState["status"];
  formMessage?: string;
  isSubmitting: boolean;
  formAction?: (formData: FormData) => void;
};

export function DatabaseStarter({
  records,
  formFieldErrors,
  formStatus,
  formMessage,
  isSubmitting,
  formAction,
}: DatabaseStarterProps) {
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

      <div className="mt-6">
        <DatabaseStarterForm
          formAction={formAction}
          fieldErrors={formFieldErrors}
          formStatus={formStatus}
          formMessage={formMessage}
          isSubmitting={isSubmitting}
        />
      </div>

      <div className="mt-6">
        <DatabaseStarterTable records={records} />
      </div>
    </section>
  );
}
