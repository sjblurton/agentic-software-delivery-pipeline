CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE POLICY "profiles_authenticated_select_own" ON "profiles" AS PERMISSIVE FOR SELECT TO "authenticated" USING (auth.uid() = id);
--> statement-breakpoint
CREATE POLICY "profiles_authenticated_insert_own" ON "profiles" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (auth.uid() = id);
--> statement-breakpoint
CREATE POLICY "profiles_authenticated_update_own" ON "profiles" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
--> statement-breakpoint
CREATE POLICY "profiles_authenticated_delete_own" ON "profiles" AS PERMISSIVE FOR DELETE TO "authenticated" USING (auth.uid() = id);