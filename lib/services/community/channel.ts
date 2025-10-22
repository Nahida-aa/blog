"use server";

import { eq, and, inArray } from "drizzle-orm";
import { calculateChannelPermissions, PERMISSIONS } from "./permissions";
import { channel, communityMember, communityRole } from "@/lib/db/schema";
import { hasPermission } from "@/lib/services/permission";
import { db } from "@/lib/db";

export const listChannel = async (communityId: string) => {
  return await db.select().from(channel).where(eq(channel.communityId, communityId));
  // .orderBy(asc(channel.createdAt));
};

/**
 * 有权限查看的频道列表
 */
export const getUserAccessibleChannels = async (authId: string): Promise<string[]> => {
  try {
    // 1. 获取用户所在的所有社区
    const userCommunities = await db
      .select({
        communityId: communityMember.communityId,
        permissions: communityMember.permissions,
        roles: communityMember.roles,
      })
      .from(communityMember)
      .where(
        and(eq(communityMember.userId, authId), eq(communityMember.status, "active")),
      );

    if (!userCommunities.length) {
      return [];
    }

    const accessibleChannels: string[] = [];

    // 2. 遍历每个社区，检查用户可访问的频道
    for (const userCommunity of userCommunities) {
      const { communityId, permissions: memberPermissions, roles } = userCommunity;

      // 获取该社区的所有频道
      const channels = await db
        .select({
          id: channel.id,
          permissionOverwrites: channel.permissionOverwrites,
        })
        .from(channel)
        .where(eq(channel.communityId, communityId));

      // 获取角色权限
      const rolePermissions = await db
        .select({
          permissions: communityRole.permissions,
        })
        .from(communityRole)
        .where(
          and(
            eq(communityRole.communityId, communityId),
            inArray(communityRole.id, roles),
          ),
        );

      // 计算基础权限
      let basePermissions = memberPermissions;
      for (const role of rolePermissions) {
        basePermissions = [...basePermissions, ...role.permissions];
      }

      // 检查每个频道的访问权限
      for (const channelInfo of channels) {
        const channelPermissions = calculateChannelPermissions(
          basePermissions,
          channelInfo.permissionOverwrites,
          authId,
          roles,
        );

        // 检查是否有查看频道的权限
        const canViewChannel = hasPermission(
          channelPermissions,
          PERMISSIONS.VIEW_CHANNELS,
        );

        if (canViewChannel) {
          accessibleChannels.push(channelInfo.id);
        }
      }
    }

    return accessibleChannels;
  } catch (error) {
    console.error("Error getting user accessible channels:", error);
    return [];
  }
};

/**
 * 检查用户是否可以访问特定频道
 */
export const canUserAccessChannel = async (
  authId: string,
  channelId: string,
): Promise<boolean> => {
  try {
    // 获取频道信息
    const [channelInfo] = await db
      .select({
        communityId: channel.communityId,
        permissionOverwrites: channel.permissionOverwrites,
      })
      .from(channel)
      .where(eq(channel.id, channelId))
      .limit(1);

    if (!channelInfo) return false;
    if (!channelInfo.communityId) return true; // 说明是 DM 频道

    // 获取用户在社区中的信息
    const [memberInfo] = await db
      .select({
        permissions: communityMember.permissions,
        roles: communityMember.roles,
        status: communityMember.status,
      })
      .from(communityMember)
      .where(
        and(
          eq(communityMember.communityId, channelInfo.communityId),
          eq(communityMember.userId, authId),
          eq(communityMember.status, "active"),
        ),
      )
      .limit(1);

    if (!memberInfo) return false;

    const { permissions, roles } = memberInfo;

    // 获取角色权限
    const rolePermissions = await db
      .select({
        permissions: communityRole.permissions,
      })
      .from(communityRole)
      .where(
        and(
          eq(communityRole.communityId, channelInfo.communityId),
          inArray(communityRole.id, roles),
        ),
      );

    // 计算基础权限
    let basePermissions = permissions;
    for (const role of rolePermissions) {
      basePermissions = [...basePermissions, ...role.permissions];
    }

    // 计算频道权限
    const channelPermissions = calculateChannelPermissions(
      basePermissions,
      channelInfo.permissionOverwrites,
      authId,
      roles,
    );

    // 检查是否有查看频道的权限
    return hasPermission(channelPermissions, PERMISSIONS.VIEW_CHANNELS);
  } catch (error) {
    console.error("Error checking channel access:", error);
    return false;
  }
};
