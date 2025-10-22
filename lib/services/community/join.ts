"use server";
import { eq, and, desc, inArray, sql, count } from "drizzle-orm";
import type { CommunityMemberWithInviter } from "./member.t";
import { UserBase } from "../../../api/auth/model";
import { requiresApproval, validateJoinData } from "../../../api/community/util/join";
import type { InsertCommunityMember } from "./member.t";
import {
  joinMethod,
  type JoinMethodType,
  type MemberJoinStats,
} from "../../../api/community/member/z.schema";
import { community, communityMember, user } from "@/lib/db/schema";
// import type { Db, Tx } from "@/api/db";
import { broadcastToChannel } from "../../../api/ws/router";
import { db, type Db } from "@/lib/db";
import { withAuth, withLogin } from "@/lib/auth/server";
import { AppErr } from "@/lib/types";

// 检查是否存在成员
export const checkMemberExisting = async (
  communityId: string,
  userId: string,
): Promise<boolean> => {
  const existingMember = await db
    .select({ id: communityMember.id })
    .from(communityMember)
    .where(
      and(
        eq(communityMember.communityId, communityId),
        eq(communityMember.userId, userId),
      ),
    )
    .limit(1);
  return existingMember.length > 0;
};

type AddMemberParams = Omit<InsertCommunityMember, "joinMethod"> & {
  joinMethod: JoinMethodType;
};

export const _addMember = async (db: Db, data: AddMemberParams) => {
  const { joinMethod, inviterId } = data;

  // 验证加入数据
  const validation = validateJoinData({ joinMethod, inviterId });

  if (!validation.valid)
    throw AppErr(`加入数据验证失败: ${validation.errors.join(", ")}`, 422);

  // 检查用户是否已经是成员
  const memberExisting = await checkMemberExisting(data.communityId, data.userId);
  if (memberExisting) throw AppErr("用户已经是社区成员", 409);
  // 检查 社区存在
  const [communityExisting] = await db
    .select({ id: community.id, defaultChannelId: community.defaultChannelId })
    .from(community)
    .where(eq(community.id, data.communityId))
    .limit(1);
  if (!communityExisting) throw AppErr("社区不存在", 404);
  // 添加成员（使用用户指定的状态，不做自动判断）
  const [newMember] = await db.insert(communityMember).values(data).returning();
  if (communityExisting.defaultChannelId) {
    broadcastToChannel(communityExisting.defaultChannelId, {
      op: "userJoined",
      d: {
        communityId: communityExisting.id,
        userId: newMember.userId,
      },
    });
  }

  // 获取完整的成员信息
  return newMember;
};

// 用户发现并直接加入社区
export const _joinDiscoveredCommunity = async (userId: string, communityId: string) => {
  return await _addMember(db, {
    communityId,
    userId,
    joinMethod: joinMethod.DISCOVER,
    status: "active", // 发现加入直接激活
  });
};
export const joinDiscoveredCommunity = withLogin(_joinDiscoveredCommunity);
/**
 *用户sendInvitation 邀请其他用户加入社区, 需要 被邀请用户 的 id
 */
// export const sendInvitation = async (
//   communityId: string,
//   inviterId: string,
//   targetUserId: string,
// ) => { };

/**
 *用户接受邀请加入社区
 *- 注意：这个函数假设邀请已经存在并且有效
 */
export const acceptInviteAndJoin = async (
  communityId: string,
  userId: string,
  inviterId: string,
) => {
  // TODO: 这里应该验证邀请是否存在且有效
  // const invitation = await getValidInvitation(communityId, userId, inviteCode);
  // if (!invitation) throw new HttpError(404, '邀请不存在或已过期');

  return await _addMember(db, {
    communityId,
    userId,
    joinMethod: joinMethod.INVITE,
    inviterId,
    status: "active", // 接受邀请直接激活
  });
};

/**
 * 用户提交申请加入社区（便捷方法）
 */
export async function submitJoinRequest(communityId: string, userId: string) {
  return await _addMember(db, {
    communityId,
    userId,
    joinMethod: joinMethod.MANUAL_REVIEW,
    status: "pending", // 申请状态为待审核
  });
}

export async function getMemberWithInviter(
  memberId: string,
): Promise<CommunityMemberWithInviter> {
  const [result] = await db
    .select({
      member: communityMember,
      user: {
        id: user.id,
        username: user.username,
        displayUsername: user.displayUsername,
        image: user.image,
      },
    })
    .from(communityMember)
    .innerJoin(user, eq(communityMember.userId, user.id))
    .where(eq(communityMember.id, memberId))
    .limit(1);

  if (!result) throw AppErr("成员不存在", 404);

  return result;
}

/**
 * 获取社区成员加入统计
 */
export async function getMemberJoinStats(communityId: string): Promise<MemberJoinStats> {
  // 获取总成员数
  const [totalResult] = await db
    .select({
      total: count(),
    })
    .from(communityMember)
    .where(eq(communityMember.communityId, communityId));

  // 按加入方式统计
  const joinMethodStats = await db
    .select({
      joinMethod: communityMember.joinMethod,
      count: count(),
    })
    .from(communityMember)
    .where(eq(communityMember.communityId, communityId))
    .groupBy(communityMember.joinMethod);

  // 最近7天的加入统计
  const recentJoins = await db
    .select({
      date: sql<string>`DATE(${communityMember.createdAt})`,
      joinMethod: communityMember.joinMethod,
      count: count(),
    })
    .from(communityMember)
    .where(
      and(
        eq(communityMember.communityId, communityId),
        sql`${communityMember.createdAt} >= CURRENT_DATE - INTERVAL '7 days'`,
      ),
    )
    .groupBy(sql`DATE(${communityMember.createdAt})`, communityMember.joinMethod)
    .orderBy(sql`DATE(${communityMember.createdAt})`);

  // 构建统计结果
  const byJoinMethod: Record<JoinMethodType, number> = {
    [joinMethod.INVITE]: 0,
    [joinMethod.MANUAL_REVIEW]: 0,
    [joinMethod.DISCOVER]: 0,
    [joinMethod.SYSTEM]: 0,
  };

  joinMethodStats.forEach((stat) => {
    byJoinMethod[stat.joinMethod as JoinMethodType] = stat.count;
  });

  return {
    total: totalResult.total,
    byJoinMethod,
    recentJoins: recentJoins.map((join) => ({
      date: join.date,
      count: join.count,
      method: join.joinMethod as JoinMethodType,
    })),
  };
}

/**
 * 批准待审核的成员
 */
export async function approvePendingMember(
  communityId: string,
  userId: string,
  // approverId: string,
): Promise<void> {
  const result = await db
    .update(communityMember)
    .set({ status: "active" })
    .where(
      and(
        eq(communityMember.communityId, communityId),
        eq(communityMember.userId, userId),
        eq(communityMember.status, "pending"),
      ),
    )
    .returning();

  if (!result.length) {
    throw new Error("找不到待审核的成员或成员已被处理");
  }

  // TODO: 发送通知给用户
  // await NotificationService.sendMemberApprovedNotification(userId, communityId, approverId);
}

/**
 * 拒绝待审核的成员
 */
export async function rejectPendingMember(
  communityId: string,
  userId: string,
  // rejecterId: string,
  // reason?: string,
): Promise<void> {
  // 删除待审核的成员记录
  const result = await db
    .delete(communityMember)
    .where(
      and(
        eq(communityMember.communityId, communityId),
        eq(communityMember.userId, userId),
        eq(communityMember.status, "pending"),
      ),
    )
    .returning();

  if (!result.length) {
    throw new Error("找不到待审核的成员或成员已被处理");
  }

  // TODO: 发送通知给用户和记录审计日志
  // await NotificationService.sendMemberRejectedNotification(userId, communityId, rejecterId, reason);
  // await AuditService.logMemberAction('reject', communityId, userId, rejecterId, { reason });
}

/**
 * 移除社区成员
 */
export async function removeMember(
  communityId: string,
  userId: string,
  // removerId: string,
  // reason?: string,
): Promise<void> {
  const result = await db
    .delete(communityMember)
    .where(
      and(
        eq(communityMember.communityId, communityId),
        eq(communityMember.userId, userId),
      ),
    )
    .returning();

  if (!result.length) throw AppErr("成员不存在", 404);

  // TODO: 记录审计日志和发送通知
  // await AuditService.logMemberAction('remove', communityId, userId, removerId, { reason });
}
