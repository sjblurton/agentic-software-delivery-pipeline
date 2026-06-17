-- RLS policies for the starter_records table.
-- Kept separate from the Drizzle-generated migration per project convention
-- (see CONTEXT.md: "RLS policies are not part of a Migration").

ALTER TABLE "starter_records" ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users
CREATE POLICY "starter_records_authenticated_select" ON "starter_records"
  AS PERMISSIVE FOR SELECT TO "authenticated"
  USING (true);

CREATE POLICY "starter_records_authenticated_insert" ON "starter_records"
  AS PERMISSIVE FOR INSERT TO "authenticated"
  WITH CHECK (true);

CREATE POLICY "starter_records_authenticated_update" ON "starter_records"
  AS PERMISSIVE FOR UPDATE TO "authenticated"
  USING (true) WITH CHECK (true);

CREATE POLICY "starter_records_authenticated_delete" ON "starter_records"
  AS PERMISSIVE FOR DELETE TO "authenticated"
  USING (true);

-- Allow postgres user (for server-side queries)
CREATE POLICY "starter_records_postgres_select" ON "starter_records"
  AS PERMISSIVE FOR SELECT TO "postgres"
  USING (true);

CREATE POLICY "starter_records_postgres_insert" ON "starter_records"
  AS PERMISSIVE FOR INSERT TO "postgres"
  WITH CHECK (true);

CREATE POLICY "starter_records_postgres_update" ON "starter_records"
  AS PERMISSIVE FOR UPDATE TO "postgres"
  USING (true) WITH CHECK (true);

CREATE POLICY "starter_records_postgres_delete" ON "starter_records"
  AS PERMISSIVE FOR DELETE TO "postgres"
  USING (true);
