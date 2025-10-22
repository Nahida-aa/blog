"use server";
import { eq, and, desc, inArray, sql, is } from "drizzle-orm";
import { calculateChannelPermissions, PERMISSIONS } from "./permissions";
import { db } from "@/lib/db";
import {
  channel,
  channelMessage,
  community,
  communityMember,
  communityRole,
  user,
} from "@/lib/db/schema";
import type { ChannelMemberWithPermissions } from "./member.t";
import { hasPermission } from "../permission";
import { AppErr } from "@/lib/types";
import { isOnline } from "@/lib/ws/server";

// 频道成员 并非真正的频道成员 而是 从 社区成员 中 计算 得到的
// 获取频道成员列表, 只返回有权限查看该频道的成员
export const listChannelMember = async (
  channelId: string,
): Promise<ChannelMemberWithPermissions[]> => {
  // 1. 获取频道信息和权限覆写
  const channelInfo = await db
    .select({
      id: channel.id,
      name: channel.name,
      communityId: channel.communityId,
      permissionOverwrites: channel.permissionOverwrites,
    })
    .from(channel)
    .where(eq(channel.id, channelId))
    .limit(1);

  if (!channelInfo.length) throw AppErr("频道不存在", 404);
  const { communityId, permissionOverwrites } = channelInfo[0];
  if (!communityId) throw AppErr("频道所属社区不存在", 404);

  // 2. 获取社区所有成员及其角色信息
  const membersWithRoles = await db
    .select({
      id: communityMember.id,
      userId: communityMember.userId,
      nickname: communityMember.nickname,
      permissions: communityMember.permissions,
      roles: communityMember.roles,
      isOwner: communityMember.isOwner,
      status: communityMember.status,
      // joinMethod: communityMember.joinMethod,
      // inviterId: communityMember.inviterId,
      createdAt: communityMember.createdAt,
      communityId: communityMember.communityId,
      user: {
        id: user.id,
        username: user.username,
        displayUsername: user.displayUsername,
        image: user.image,
      },
    })
    .from(communityMember)
    .innerJoin(user, eq(communityMember.userId, user.id))
    .innerJoin(community, eq(communityMember.communityId, community.id))
    .where(
      and(
        eq(communityMember.communityId, communityId),
        eq(communityMember.status, "active"), // 只获取活跃成员
      ),
    )
    .orderBy(desc(communityMember.createdAt));

  // 3. 获取所有角色信息
  const roles = await db
    .select()
    .from(communityRole)
    .where(eq(communityRole.communityId, communityId));

  const roleMap = new Map(roles.map((role) => [role.id, role]));

  // 4. 计算每个成员的频道权限并过滤
  const result: ChannelMemberWithPermissions[] = [];

  for (const member of membersWithRoles) {
    // 计算基础权限（成员权限 + 角色权限）
    let basePermissions = member.permissions;

    for (const roleId of member.roles) {
      const role = roleMap.get(roleId);
      if (role) {
        basePermissions = [...basePermissions, ...role.permissions];
      }
    }

    // 计算频道权限（应用频道覆写）, 用户在此频道的权限
    const channelPermissions = calculateChannelPermissions(
      basePermissions,
      permissionOverwrites,
      member.userId,
      member.roles,
    );

    // 检查是否有查看频道的权限
    const canViewChannel = hasPermission(channelPermissions, PERMISSIONS.VIEW_CHANNELS);

    // 如果没有查看权限，跳过此成员
    if (!canViewChannel) {
      continue;
    }

    // 检查其他权限
    const canSendMessages = hasPermission(channelPermissions, PERMISSIONS.SEND_MESSAGES);

    const canManageMessages = hasPermission(
      channelPermissions,
      PERMISSIONS.MANAGE_MESSAGES,
    );

    result.push({
      ...member,
      channelPermissions,
      canViewChannel,
      canSendMessages,
      canManageMessages,
      isOnline: isOnline(member.userId),
    });
  }

  return result;
};

/**
 * 获取频道在线成员列表
 * 基于最近活动时间判断在线状态
 */
// export const listOnlineChannelMember = async (
//   channelId: string,
//   onlineThresholdMinutes: number = 5,
// ): Promise<ChannelMemberWithPermissions[]> => {
//   const members = await listChannelMember(channelId);

// };

/**
 * 检查用户是否可以查看频道
 */
export const canViewChannel = async (
  channelId: string,
  userId: string,
): Promise<boolean> => {
  try {
    // 获取频道信息
    const channelInfo = await db
      .select({
        communityId: channel.communityId,
        permissionOverwrites: channel.permissionOverwrites,
      })
      .from(channel)
      .where(eq(channel.id, channelId))
      .limit(1);

    if (!channelInfo.length) return false;
    const { communityId, permissionOverwrites } = channelInfo[0];
    if (!communityId) throw AppErr("社区ID不存在", 404);

    // 获取用户在社区中的信息
    const memberInfo = await db
      .select({
        permissions: communityMember.permissions,
        roles: communityMember.roles,
        status: communityMember.status,
      })
      .from(communityMember)
      .where(
        and(
          eq(communityMember.communityId, communityId),
          eq(communityMember.userId, userId),
          eq(communityMember.status, "active"),
        ),
      )
      .limit(1);

    if (!memberInfo.length) return true; // 如果 用户不是社区成员, 则可以访问, TODO: 默认是这样

    const { permissions, roles, status } = memberInfo[0];

    // 获取角色权限
    const rolePermissions = await db
      .select({
        permissions: communityRole.permissions,
      })
      .from(communityRole)
      .where(
        and(eq(communityRole.communityId, communityId), inArray(communityRole.id, roles)),
      );

    // 计算基础权限
    let basePermissions = permissions;
    for (const role of rolePermissions) {
      basePermissions = [...basePermissions, ...role.permissions];
    }

    // 计算频道权限
    const channelPermissions = calculateChannelPermissions(
      basePermissions,
      permissionOverwrites,
      userId,
      roles,
    );
    console.log("频道权限:", channelPermissions);
    // console.log("基础权限:", basePermissions);
    // 检查是否有查看频道的权限
    return hasPermission(channelPermissions, PERMISSIONS.VIEW_CHANNELS);
  } catch (error) {
    console.error("检查频道查看权限失败:", error);
    return false;
  }
};

/**
 * 获取频道成员数量统计
 */
// export const statsChannelMember = async (channelId: string) => {
//   const members = await listChannelMember(channelId);
//   const onlineMembers = await listOnlineChannelMember(channelId);

//   // 按角色统计
//   const roleStats = new Map<string, number>();
//   members.forEach((member) => {
//     member.roles.forEach((roleId) => {
//       roleStats.set(roleId, (roleStats.get(roleId) || 0) + 1);
//     });
//   });

//   return {
//     totalMembers: members.length,
//     onlineMembers: onlineMembers.filter((m) => m.isOnline).length,
//     membersByRole: Object.fromEntries(roleStats),
//     membersByStatus: {
//       active: members.filter((m) => m.status === "active").length,
//       inactive: members.filter((m) => m.status === "inactive").length,
//       banned: members.filter((m) => m.status === "banned").length,
//       pending: members.filter((m) => m.status === "pending").length,
//     },
//   };
// };

/**
 * 搜索频道成员
 */
export const searchChannelMembers = async (
  channelId: string,
  query: string,
  limit: number = 10,
): Promise<ChannelMemberWithPermissions[]> => {
  const members = await listChannelMember(channelId);

  const searchQuery = query.toLowerCase();
  const filtered = members.filter(
    (member) =>
      member.user.username?.toLowerCase().includes(searchQuery) ||
      member.user.displayUsername?.toLowerCase().includes(searchQuery) ||
      (member.nickname && member.nickname.toLowerCase().includes(searchQuery)),
  );

  return filtered.slice(0, limit);
};
