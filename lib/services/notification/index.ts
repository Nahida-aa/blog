import { desc, eq } from "drizzle-orm";
import type { NotificationType } from "./index.t";
import { db } from "@/lib/db";
import { notification, notificationReceiver, user } from "@/lib/db/schema";

// 构建通知 insert
export const buildNotificationInsert = (
  type: NotificationType,
  senderId: string,
  content: Record<string, any>,
) => {
  return {
    type,
    senderId,
    content,
  };
};

// 2. listNotification(userId, limit, offset)
export const listNotification = async (
  authId: string,
  limit: number = 20,
  offset: number = 0,
) => {
  const notifications = await db
    .select({
      // 通知信息
      id: notification.id,
      type: notification.type,
      senderId: notification.senderId,
      content: notification.content,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,

      // 接收状态
      isRead: notificationReceiver.isRead,
      readAt: notificationReceiver.readAt,

      // 发送者信息
      sender: {
        id: user.id,
        username: user.username,
        displayUsername: user.displayUsername,
        image: user.image,
      },
    })
    .from(notificationReceiver)
    .innerJoin(notification, eq(notificationReceiver.notificationId, notification.id))
    .leftJoin(user, eq(notification.senderId, user.id))
    .where(eq(notificationReceiver.userId, authId))
    .orderBy(desc(notification.createdAt))
    .limit(limit)
    .offset(offset);

  return notifications;
};
