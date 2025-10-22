import { z } from "@hono/zod-openapi";
import { userBaseSchema } from "../../../api/auth/model";
import { createSelectSchema } from "../../../api/openapi/helpers/create";
import { notification } from "@/lib/db/schema";

// export type NotificationType =
//   | 'invite_project_member'
//   | 'invite_accepted'
//   | 'invite_rejected'
//   | 'project_join_request'
//   | 'request_approved'
//   | 'request_rejected'
//   | 'project_update'
//   | 'version_published'
//   | 'comment_received'
//   // 收到关注
//   | 'followed_user' // 用户被关注
//   | 'followed_project' // 项目被关注
//   // 好友请求
//   | 'friend_request' // 收到好友请求
// 提供给 switch-case 使用, 不是 schema
export const notificationType = {
  invite_project_member: "invite_project_member",
  invite_accepted: "invite_accepted",
  invite_rejected: "invite_rejected",
  project_join_request: "project_join_request",
  request_approved: "request_approved",
  request_rejected: "request_rejected",
  project_update: "project_update",
  version_published: "version_published",
  comment_received: "comment_received",
  followed_user: "followed_user",
  followed_project: "followed_project",
  friend_request: "friend_request",
} as const;
export type NotificationType = keyof typeof notificationType;

export const notificationSelectSchema = createSelectSchema(notification);
export type NotificationSelect = typeof notification.$inferSelect;

export const notificationSchema = notificationSelectSchema.extend({
  isRead: z.boolean(),
  readAt: z.date().nullable(),
  sender: userBaseSchema.nullable(),
});
