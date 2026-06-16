import { starterRecords } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import type { db } from "@/lib/db/client";

type DatabaseLike = {
  select: typeof db.select;
  insert: typeof db.insert;
};

export async function listStarterRecords(database: DatabaseLike) {
  return database
    .select()
    .from(starterRecords)
    .orderBy(asc(starterRecords.createdAt), asc(starterRecords.id));
}

export async function createStarterRecord(
  database: DatabaseLike,
  input: { name: string },
) {
  const [createdStarterRecord] = await database
    .insert(starterRecords)
    .values({ name: input.name })
    .returning();

  return createdStarterRecord;
}
