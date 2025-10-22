import { type UserBase, userBaseSchema } from "@/api/auth/model";
import { type community, communityMember } from "@/lib/db/schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

export type SelectCommunity = typeof community.$inferSelect;
export type SelectCommunityMember = typeof communityMember.$inferSelect;
export type InsertCommunityMember = typeof communityMember.$inferInsert;
export type ChannelMemberInfo = Omit<
  SelectCommunityMember,
  "createdAt" | "updatedAt" | "joinMethod" | "inviterId"
> & {
  isOnline?: boolean;
  lastActiveAt?: string | null;
  user: UserBase;
};
// export interface ChannelMemberWithPermissions {
//   id: string;
//   userId: string;
//   nickname: string | null;
//   permissions: string[]
//   roles: string[];
//   isOwner: boolean;
//   status: string;
//   createdAt: Date;
//   communityId: string;
//   user: {
//     username: string;
//     avatar: string | null;
//   };
//   isOnline?: boolean; // 新增：在线状态
// }
export const channelMemberWithPermissionsSchema = createSelectSchema(communityMember)
  .omit({
    createdAt: true,
    updatedAt: true,
    joinMethod: true,
    inviterId: true,
  })
  .extend({
    isOnline: z.boolean().optional(),
    lastActiveAt: z.string().nullable().optional(),
    channelPermissions: z.array(z.string()),
    canViewChannel: z.boolean(),
    canSendMessages: z.boolean(),
    canManageMessages: z.boolean(),
    user: userBaseSchema,
  });
// zod -> type
export type ChannelMemberWithPermissions = z.infer<
  typeof channelMemberWithPermissionsSchema
>;

// 带邀请者信息的成员详情
export type CommunityMemberWithInviter = {
  member: SelectCommunityMember;
  inviter?: UserBase;
};
