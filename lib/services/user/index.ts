"use server";
import { ilike, eq } from "drizzle-orm";
import { AppErr } from "@/lib/types";
import { user } from "@/lib/db/schema";
import type { UserUpdate } from "@/lib/services/user/index.t";
import { db } from "@/lib/db";

export const searchUser = async (_q: string) => {
  // 去除 两侧空格
  const q = _q.trim();
  const users = await db
    .select()
    .from(user)
    .where(ilike(user.username, `%${q}%`));
  return users;
};

export const getUser = async (id: string, authId?: string) => {
  const u = await db.query.user.findFirst({ where: eq(user.id, id) });
  if (!u) throw AppErr("User not found", 404);
  return u;
};
export const getUserByName = async (username: string, authId?: string) => {
  const u = await db.query.user.findFirst({
    where: eq(user.username, username),
  });
  if (!u) throw AppErr("User not found", 404);
  return u;
};
export const updateUser = async (authId: string, data: UserUpdate) => {
  await db.update(user).set(data).where(eq(user.id, authId));
};
