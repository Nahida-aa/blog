"use server";
import { and, eq, desc } from "drizzle-orm";
import { db, type Db } from "@/lib/db";
import { channelMessage, userReadState } from "@/lib/db/schema";
import { broadcastToChannel, broadcastToCommunity } from "@/api/ws/router";
import type { ListIn } from "@/lib/client/zod";
import type { MsgInput } from "@/lib/services/community/msg.t";

export const setUserReadState = async (
  db: Db,
  data: { userId: string; channelId: string; lastReadMessageId: string },
) => {
  const updated = await db
    .update(userReadState)
    .set({ lastReadMessageId: data.lastReadMessageId })
    .where(
      and(
        eq(userReadState.userId, data.userId),
        eq(userReadState.channelId, data.channelId),
      ),
    )
    .returning({
      userId: userReadState.userId,
    });
  if (updated.length === 0) {
    await db.insert(userReadState).values(data);
  }
};

// TODO: 细节, logic
// 当 用户 进入 频道时，更新用户的最后阅读状态
export const onUserClickChannel = async (
  userId: string,
  channelId: string,
  lastReadMessageId?: string,
) => {
  if (!lastReadMessageId) return;
  await setUserReadState(db, { userId, channelId, lastReadMessageId });
};

// TODO: 细节, logic
// sendMessage ToChannel - 发送消息到频道
export const sendMsg = async (data: MsgInput) => {
  console.log(
    "/home/aa/repos/mc_ls/mcc-next/src/api/community/channel/message/service.ts sendMsg:data:",
    data,
  );
  const { communityId, ...msg } = data;
  return await db.transaction(async (tx) => {
    // 发送消息到频道
    const [newMessage] = await tx.insert(channelMessage).values(msg).returning();
    console.log(
      "/home/aa/repos/mc_ls/mcc-next/src/api/community/channel/message/service.ts sendMsg:newMessage:",
      newMessage,
    );

    // 更新用户的最后阅读状态
    await setUserReadState(tx, {
      userId: newMessage.userId,
      channelId: newMessage.channelId,
      lastReadMessageId: newMessage.id,
    });

    // 2. 通过 WebSocket 实时推送给频道或社区内的用户
    if (!communityId) {
      console.log(
        "/home/aa/repos/mc_ls/mcc-next/src/api/community/channel/message/service.ts sendMsg:broadcastToChannel:",
      );
      broadcastToChannel(newMessage.channelId, {
        op: "newMessage",
        d: newMessage,
      });
    } else {
      console.log(
        "/home/aa/repos/mc_ls/mcc-next/src/api/community/channel/message/service.ts sendMsg:broadcastToCommunity:",
      );
      broadcastToCommunity(communityId, {
        op: "newMessage",
        d: { communityId, ...newMessage },
      });
    }

    return newMessage;
  });
};

export const listMsg = async ({ id, limit = 30, offset = 0 }: ListIn) => {
  return await db
    .select()
    .from(channelMessage)
    .where(eq(channelMessage.channelId, id))
    .orderBy(desc(channelMessage.createdAt))
    .limit(limit)
    .offset(offset);
};
