import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  index,
  uniqueIndex,
  varchar,
  uuid,
  primaryKey,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { uuidWithTimestamps } from "../columnsHelpers";
import { user } from "./auth-schema";
import { PermissionPresets } from "@/lib/services/community/permissions";
import type { FileShow } from "@/lib/upload/types";

// 社区表 - 类似Discord 服务器(server\guild)，与项目/组织1对1对应
export const community = pgTable(
  "community",
  {
    ...uuidWithTimestamps,
    name: varchar("name", { length: 255 }).notNull(),
    summary: varchar("summary", { length: 500 }),
    image: text(),

    // 1对1关系：每个项目或组织对应一个社区
    type: text("type").notNull(), // project, organization
    entityId: text("entity_id").notNull(), // 项目ID或组织ID
    defaultChannelId: uuid("default_channel_id"),

    // 社区设置
    isPublic: boolean("is_public").default(true).notNull(),
    verificationLevel: integer("verification_level").default(0).notNull(), // 0-4, 类似Discord验证等级, 1: 必须绑定已验证的email, 2: 注册时间超过 5 min, 3: 需要等待 10 min, 4: 需要绑定已验证的手机
    memberCount: integer("member_count").default(1).notNull(),
    // 创建者
    ownerId: varchar("owner_id", { length: 255 })
      .notNull()
      .references(() => user.id),
  },
  (table) => [
    uniqueIndex("community_entity_unique_idx").on(table.type, table.entityId), // 确保1对1
    index("community_entity_idx").on(table.type, table.entityId),
    index("community_public_idx").on(table.isPublic),
  ],
);

// 频道表 - 属于社区
export const channel = pgTable(
  "channel",
  {
    ...uuidWithTimestamps,
    // 频道类型 不按照 discord 的分类
    type: text("type").default("chat").notNull(), // discussion{讨论,评论,社区} readme{简介}, forum, welcome, announcement, guide{可以是其他人提供的攻略}, release{发布版本,用户侧}, dm | group_dm
    communityId: uuid("community_id").references(() => community.id, {
      onDelete: "cascade",
    }),
    name: text("name"),
    description: text("description"),
    // parentId: uuid('parent_id'), // 分类频道ID grouping
    // sort 位置
    sort: integer("sort").default(0).notNull(),

    isPrivate: boolean("is_private").default(false).notNull(),
    // 频道权限覆写 - 覆盖默认权限 用于给 频道的 角色或成员设置特定权限
    permissionOverwrites: jsonb("permission_overwrites")
      .$type<
        Array<{
          // ts 层, 数据库中仍是 jsonb: ''
          id: string; // 角色ID或用户ID
          type: "role" | "member";
          allow: string[]; // 允许的权限
          deny: string[]; // 拒绝的权限
        }>
      >()
      .default([])
      .notNull(),

    // 频道设置
    isNsfw: boolean("is_nsfw").default(false).notNull(), // 用来标记某些频道内容敏感
    rateLimitPerUser: integer("rate_limit_per_user").default(0).notNull(), // 慢速模式，秒数
  },
  (table) => [
    index("channel_community_idx").on(table.communityId),
    // index("channel_parent_idx").on(table.parentId),
    index("channel_sort_idx").on(table.communityId, table.sort),
  ],
);
// 频道消息表
export const channelMessage = pgTable(
  "channel_message",
  {
    ...uuidWithTimestamps,
    channelId: uuid("channel_id").notNull(),
    // userId: varchar('user_id', { length: 255 }).notNull().references(() => user.id, { onDelete: 'set null' }), // 消息不应该因为 用户删除而删除
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => user.id), // 消息不应该因为 用户删除而删除

    content: text("content"),
    contentType: varchar("content_type", { length: 20 }).default("text").notNull(),

    // 消息关联
    replyToId: uuid("reply_to_id").references((): AnyPgColumn => channelMessage.id),
    // threadId: uuid('thread_id').references(() => message.id), // TODO: 未来可能考虑的功能

    // 消息状态
    isEdited: boolean("is_edited").default(false).notNull(),
    isDeleted: boolean("is_deleted").default(false).notNull(),
    isPinned: boolean("is_pinned").default(false).notNull(),

    // 消息数据
    attachments: jsonb("attachments").$type<Array<FileShow>>().default([]).notNull(),

    mentions: jsonb("mentions")
      .$type<{
        users?: string[];
        roles?: string[];
        channels?: string[];
        everyone?: boolean;
      }>()
      .default({})
      .notNull(),

    reactions: jsonb("reactions")
      .$type<
        Array<{
          emoji: string;
          count: number;
          users: string[];
        }>
      >()
      .default([])
      .notNull(),
  },
  (table) => [
    index("channel_message_channel_idx").on(table.channelId),
    index("channel_message_user_idx").on(table.userId),
    // index("message_thread_idx").on(table.threadId),
    index("channel_message_created_at_idx").on(table.createdAt),
  ],
);
// 社区成员表 - 所有权限管理的核心
export const communityMember = pgTable(
  "community_member",
  {
    ...uuidWithTimestamps,
    communityId: uuid("community_id")
      .notNull()
      .references(() => community.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // Discord式角色系统
    roles: text("roles").array().default([]).notNull(), // 角色ID数组
    // 权限位掩码 - 64位整数，每一位代表一个权限
    // permissions: bigint("permissions", { mode: "bigint" })
    //   .default(0 as unknown as bigint)
    //   .notNull(),
    // 更简单
    permissions: text("permissions").array().default(PermissionPresets.MEMBER).notNull(),
    isOwner: boolean("is_owner").default(false).notNull(), // 冗余字段用于简化查询

    // 成员状态
    status: varchar("status", { length: 20 }).default("active").notNull(), // active, inactive, banned, pending

    // 加入方式/方法
    joinMethod: varchar("join_method", { length: 20 }).default("discover").notNull(), // invite, manual_review, discover, system
    inviterId: varchar("inviter_id", { length: 255 }).references(() => user.id), // 邀请者ID（如果通过邀请加入）

    // joinedAt == createdAt
    nickname: varchar("nickname", { length: 100 }), // 社区内昵称, 优先级: communityMember.nickname > user.displayUsername > user.username
  },
  (table) => [
    uniqueIndex("community_member_unique_idx").on(table.communityId, table.userId),
    index("community_member_user_idx").on(table.userId),
    index("community_member_status_idx").on(table.status),
    index("community_member_join_method_idx").on(table.joinMethod),
    index("community_member_inviter_idx").on(table.inviterId),
  ],
);

// 角色表 - Discord式角色系统
export const communityRole = pgTable(
  "community_role",
  {
    ...uuidWithTimestamps,
    communityId: uuid("community_id")
      .notNull()
      .references(() => community.id, { onDelete: "cascade" }),

    name: varchar("name", { length: 100 }).notNull(),
    color: varchar("color", { length: 7 }), // 十六进制颜色 #00FFFF
    position: integer("position").default(0).notNull(), // 角色优先级，数字越大权限越高

    permissions: text("permissions").array().default(PermissionPresets.MEMBER).notNull(),

    // 角色设置
    isMentionable: boolean("is_mentionable").default(true).notNull(),
    isHoisted: boolean("is_hoisted").default(false).notNull(), // 是否在成员列表中单独显示
    isManaged: boolean("is_managed").default(false).notNull(), // 是否由系统管理（如bot角色）
  },
  (table) => [
    index("community_role_community_idx").on(table.communityId),
    index("community_role_position_idx").on(table.communityId, table.position),
  ],
);

// export const dmChannel = pgTable("dm_channel", { // 有真正的成员表
//   id: uuid("id").primaryKey().defaultRandom(),
//   type: text("type").default("dm").notNull(), // dm | group_dm
//   name: text("name"), // dm 无名, group_dm 可以自定义
// }, (t) => [
//   index("dm_channel_user_idx").on(t.id, t.type),
// ])
// 私聊频道参与者  用于私聊和群私聊
export const dmChannelParticipant = pgTable(
  "dm_channel_participant",
  {
    channelId: uuid("channel_id")
      .notNull()
      .references(() => channel.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.channelId, t.userId] })],
);

export const userReadState = pgTable(
  "user_read_state",
  {
    userId: varchar("user_id", { length: 32 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }), // char(32) 假设 better-auth 使用 NanoID
    channelId: uuid("channel_id")
      .notNull()
      .references(() => channel.id, { onDelete: "cascade" }), // 频道 ID
    lastReadMessageId: uuid("last_read_message_id")
      .notNull()
      .references(() => channelMessage.id, { onDelete: "cascade" }), // 最后已读消息
    lastReadAt: timestamp("last_read_at")
      .$onUpdate(() => new Date())
      .notNull(), // 用户最后一次阅读时间
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.channelId] }), // 复合主键：每个用户在每个频道只能有一个记录
  ],
);
