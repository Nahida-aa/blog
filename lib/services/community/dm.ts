"use server";

import { db } from "@/lib/db";
import { dmChannelParticipant } from "@/lib/db/schema";
import { and, asc, eq } from "drizzle-orm";
export const listDmChannelByUserId = async (userId: string) => {
  return await db
    .select({
      id: dmChannelParticipant.channelId,
    })
    .from(dmChannelParticipant)
    .where(eq(dmChannelParticipant.userId, userId));
};
