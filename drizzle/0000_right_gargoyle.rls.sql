-- RLS policies for the profiles table.
-- Kept separate from the Drizzle-generated migration per project convention
-- (see CONTEXT.md: "RLS policies are not part of a Migration").
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_authenticated_select_own" ON "profiles"
  AS PERMISSIVE FOR SELECT TO "authenticated"
  USING (auth.uid() = id);

CREATE POLICY "profiles_authenticated_insert_own" ON "profiles"
  AS PERMISSIVE FOR INSERT TO "authenticated"
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_authenticated_update_own" ON "profiles"
  AS PERMISSIVE FOR UPDATE TO "authenticated"
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_authenticated_delete_own" ON "profiles"
  AS PERMISSIVE FOR DELETE TO "authenticated"
  USING (auth.uid() = id);
