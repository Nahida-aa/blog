import { friendSelectZ } from "@/lib/db/service";
import { userItemZ } from "./index.t";
import z from "zod";

export const friendStatus = z.enum(["pending", "accepted", "rejected"]);
export type FriendStatus = z.infer<typeof friendStatus>;

export const friendItemZ = friendSelectZ
  .omit({ createdAt: true, updatedAt: true, status: true, reason: true })
  .extend({
    user1: userItemZ.nullable(),
    user2: userItemZ.nullable(),
  });
export type FriendItem = z.infer<typeof friendItemZ>;

export const friendRequest = z.object({
  targetId: z.string(),
  msg: z.string().default("添加你为好友"),
  nickname: z.string().optional(),
  groupName: z.string().optional().default("default"),
});
export type FriendRequest = z.infer<typeof friendRequest>;
