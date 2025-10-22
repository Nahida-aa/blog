import { channelMessageInsertZ, channelMessageSelectZ } from "@/lib/db/service";
import { z } from "zod/v4";

export const msgInputZ = channelMessageInsertZ
  .pick({
    channelId: true,
    userId: true,
    content: true,
    contentType: true,
    replyToId: true,
    attachments: true,
  })
  .extend({
    communityId: z.uuid().optional(),
  });
export type MsgInput = z.infer<typeof msgInputZ>;
export const msgOutputZ = channelMessageSelectZ.extend({
  communityId: z.string().optional(),
});
export type MsgOut = z.infer<typeof msgOutputZ>;

export const newMsgInput = (
  channelId: string,
  userId: string,
  content: string,
): MsgInput => ({
  channelId,
  userId,
  content,
});
