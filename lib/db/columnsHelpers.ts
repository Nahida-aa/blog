// src/lib/db/schema/columnsHelpers.ts
import { serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
  // deletedAt: timestamp("deleted_at"),
};

export const timestamps_with_deleted_at = {
  ...timestamps,
  deleted_at: timestamp(),
};

export const commonColumns = {
  name: varchar({ length: 255 }).notNull(),
  summary: varchar({ length: 2048 }), // 摘要
  ...timestamps,
};

// export const commonColumnsWithDeletedAt = {
// }

export const autoIncrementCommon = {
  id: serial().primaryKey().notNull(),
  ...commonColumns,
};

export const uuidCommon = {
  id: uuid().primaryKey().notNull().defaultRandom(),
  ...commonColumns,
};

export const autoIncrementWithTimestamps = {
  id: serial().primaryKey().notNull(),
  ...timestamps,
};

export const uuidWithTimestamps = {
  id: uuid().primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).$onUpdate(() => new Date().toISOString()).notNull(),
};
