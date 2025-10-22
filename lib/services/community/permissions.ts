// string[]

import { ADMIN, hasPermission } from "../permission";

export const PERMISSIONS = {
  // === 通用权限 ===
  CREATE_INSTANT_INVITE: "create_instant_invite", // 创建邀请链接
  MANAGE_CHANNELS: "manage_channels", // 管理频道
  MANAGE_COMMUNITY: "manage_community", // 管理社区
  VIEW_AUDIT_LOG: "view_audit_log", // 查看审计日志
  VIEW_COMMUNITY_INSIGHTS: "view_community_insights", // 查看社区统计

  // === 文本权限 ===
  VIEW_CHANNELS: "view_channels", // 查看频道
  SEND_MESSAGES: "send_messages", // 发送消息
  SEND_TTS_MESSAGES: "send_tts_messages", // 发送TTS消息
  MANAGE_MESSAGES: "manage_messages", // 管理消息
  EMBED_LINKS: "embed_links", // 嵌入链接
  ATTACH_FILES: "attach_files", // 附加文件
  READ_MESSAGE_HISTORY: "read_message_history", // 读取历史消息
  MENTION_EVERYONE: "mention_everyone", // 提及所有人
  USE_EXTERNAL_EMOJIS: "use_external_emojis", // 使用外部表情
  ADD_REACTIONS: "add_reactions", // 添加反应
  USE_SLASH_COMMANDS: "use_slash_commands", // 使用命令

  // === 语音权限 ===
  CONNECT: "connect", // 连接语音
  SPEAK: "speak", // 语音发言
  MUTE_MEMBERS: "mute_members", // 静音成员
  DEAFEN_MEMBERS: "deafen_members", // 耳聋成员
  MOVE_MEMBERS: "move_members", // 移动成员
  USE_VAD: "use_vad", // 语音活动检测
  PRIORITY_SPEAKER: "priority_speaker", // 优先发言

  // === 管理权限 ===
  MANAGE_NICKNAMES: "manage_nicknames", // 管理昵称
  MANAGE_ROLES: "manage_roles", // 管理角色
  MANAGE_WEBHOOKS: "manage_webhooks", // 管理Webhook
  MANAGE_EMOJIS: "manage_emojis", // 管理表情

  // === 高级权限 ===
  KICK_MEMBERS: "kick_members", // 踢出成员
  BAN_MEMBERS: "ban_members", // 禁用成员
  ADMIN: ADMIN, // 管理员

  // === 项目特定权限 ===
  MANAGE_PROJECT: "manage_project", // 管理项目
  UPLOAD_FILES: "upload_files", // 上传文件
  MANAGE_VERSIONS: "manage_versions", // 管理版本
  REVIEW_SUBMISSIONS: "review_submissions", // 审核提交
  MANAGE_DEPENDENCIES: "manage_dependencies", // 管理依赖
  VIEW_ANALYTICS: "view_analytics", // 查看数据分析
} as const;

// 权限组合
export const PermissionPresets = {
  VIEW_ONLY: [PERMISSIONS.VIEW_CHANNELS, PERMISSIONS.READ_MESSAGE_HISTORY], // 仅查看
  MEMBER: [
    PERMISSIONS.VIEW_CHANNELS, // 查看频道
    PERMISSIONS.SEND_MESSAGES, // 发送消息
    PERMISSIONS.ADD_REACTIONS, // 添加表情
    PERMISSIONS.ATTACH_FILES, // 附加文件
    PERMISSIONS.READ_MESSAGE_HISTORY, // 查看消息历史
    PERMISSIONS.USE_SLASH_COMMANDS, // 使用斜杠命令
  ],
  CONTRIBUTOR: [
    // 贡献者
    PERMISSIONS.VIEW_CHANNELS,
    PERMISSIONS.SEND_MESSAGES,
    PERMISSIONS.ADD_REACTIONS, // 添加表情
    PERMISSIONS.ATTACH_FILES, // 附加文件
  ],
  MAINTAINER: [
    // 维护者
    PERMISSIONS.VIEW_CHANNELS, // 查看频道
    PERMISSIONS.SEND_MESSAGES, // 发送消息
    PERMISSIONS.ADD_REACTIONS, // 添加表情
    PERMISSIONS.ATTACH_FILES, // 附加文件
    PERMISSIONS.READ_MESSAGE_HISTORY, // 查看消息历史
    PERMISSIONS.USE_SLASH_COMMANDS, // 使用斜杠命令
    PERMISSIONS.UPLOAD_FILES, // 上传文件
    PERMISSIONS.MANAGE_VERSIONS, // 管理版本
    PERMISSIONS.MANAGE_MESSAGES, // 管理消息
    PERMISSIONS.MANAGE_CHANNELS, // 管理频道
    PERMISSIONS.KICK_MEMBERS, // 踢出成员
    PERMISSIONS.REVIEW_SUBMISSIONS, // 审核提交
  ],
  OWNER: [PERMISSIONS.ADMIN], // 管理员
  DEFAULT_ROLE: [
    PERMISSIONS.VIEW_CHANNELS, // 查看频道
    PERMISSIONS.SEND_MESSAGES, // 发送消息
    PERMISSIONS.READ_MESSAGE_HISTORY, // 查看消息历史
  ],
};

/*
 * 过滤出 PERMISSIONS 中存在的权限
 */
export function getPermissionList(
  permissions: string[],
  PERMISSIONS: Record<string, string>,
): string[] {
  const permissionList: string[] = [];
  for (const [name, value] of Object.entries(PERMISSIONS)) {
    if (hasPermission(permissions, value)) {
      permissionList.push(name);
    }
  }
  return permissionList;
}

export function calculateChannelPermissions(
  memberPermissions: string[], // communityMember.permissions
  channelOverwrites: Array<{
    // 频道的权限覆盖列表: channel.permissionOverwrites
    allow: string[]; // 允许
    deny: string[]; // 拒绝
    type: "role" | "member"; // 表示是针对角色还是针对用户
    id: string; // 对应角色ID或用户ID
  }>,
  userId: string,
  userRoles: string[], // 当前用户拥有的角色 ID 列表
): string[] {
  let permissions = memberPermissions; // 初始化权限

  // 应用角色覆写
  for (const overwrite of channelOverwrites) {
    if (overwrite.type === "role" && userRoles.includes(overwrite.id)) {
      permissions = permissions.filter((p) => !overwrite.deny.includes(p)); // 移除被拒绝的权限
      permissions = Array.from(new Set([...permissions, ...overwrite.allow])); // 添加允许的权限
    }
  }

  // 应用用户覆写, 用户覆写优先级最高
  for (const overwrite of channelOverwrites) {
    if (overwrite.type === "member" && overwrite.id === userId) {
      permissions = permissions.filter((p) => !overwrite.deny.includes(p));
      permissions = Array.from(new Set([...permissions, ...overwrite.allow]));
    }
  }

  return permissions;
}

// 权限名称映射（UI显示用）
export const PermissionNames: Record<string, string> = {
  CREATE_INSTANT_INVITE: "创建邀请链接",
  MANAGE_CHANNELS: "管理频道",
  MANAGE_COMMUNITY: "管理社区",
  VIEW_AUDIT_LOG: "查看审计日志",
  VIEW_COMMUNITY_INSIGHTS: "查看社区统计",
  VIEW_CHANNELS: "查看频道",
  SEND_MESSAGES: "发送消息",
  SEND_TTS_MESSAGES: "发送TTS消息",
  MANAGE_MESSAGES: "管理消息",
  EMBED_LINKS: "嵌入链接",
  ATTACH_FILES: "附加文件",
  READ_MESSAGE_HISTORY: "读取历史消息",
  MENTION_EVERYONE: "提及所有人",
  USE_EXTERNAL_EMOJIS: "使用外部表情",
  ADD_REACTIONS: "添加反应",
  USE_SLASH_COMMANDS: "使用命令",
  CONNECT: "连接语音",
  SPEAK: "语音发言",
  MUTE_MEMBERS: "静音成员",
  DEAFEN_MEMBERS: "耳聋成员",
  MOVE_MEMBERS: "移动成员",
  USE_VAD: "语音活动检测",
  PRIORITY_SPEAKER: "优先发言",
  MANAGE_NICKNAMES: "管理昵称",
  MANAGE_ROLES: "管理角色",
  MANAGE_WEBHOOKS: "管理Webhook",
  MANAGE_EMOJIS: "管理表情",
  KICK_MEMBERS: "踢出成员",
  BAN_MEMBERS: "封禁成员",
  ADMIN: "管理员",
  MANAGE_PROJECT: "管理项目",
  UPLOAD_FILES: "上传文件",
  MANAGE_VERSIONS: "管理版本",
  REVIEW_SUBMISSIONS: "审核提交",
  MANAGE_DEPENDENCIES: "管理依赖",
  VIEW_ANALYTICS: "查看数据分析",
};
