"use server";

import { orgItemFields, userItemFields } from "../../../lib/services/user/index.t";
import { db } from "@/lib/db";
import { notification, notificationReceiver, projectMember } from "@/lib/db/schema";

import { and, asc, eq, notInArray } from "drizzle-orm";
import { projectMemberPermissionsKV, type ProjectMemberPermission } from "./permission";
import { AppErr } from "@/lib/types";
import type {
  ProjectMember,
  ProjectMemberStatus,
  ProjectMemberUpdate,
} from "@/lib/services/project/member.t";
import { notificationType } from "@/lib/services/notification/index.t";

// 修改成员的权限: 对于个人项目仅限所有者, 对于 org(团队) 项目, 管理员也能修改

// 检查权限的辅助函数
export const checkMemberPermission = async (
  projectId: string,
  authId: string,
  requiredPermission: ProjectMemberPermission,
) => {
  const member = await getProjectMemberByUser(projectId, "user", authId);
  // console.log("member Permissions:", member);
  const has = member.isOwner || member?.permissions.includes(requiredPermission) || false;
  if (!has) {
    console.log(
      member.id,
      "没有",
      projectMemberPermissionsKV[requiredPermission],
      "权限",
    );
    throw AppErr(`缺少 ${projectMemberPermissionsKV[requiredPermission]}`, 403);
  }
  return has;
};

// R
export const getProjectMember = async (id: string) => {
  const member = await db.query.projectMember.findFirst({
    where: eq(projectMember.id, id),
    with: {
      user: { columns: userItemFields },
      organization: { columns: orgItemFields },
    },
  });
  if (!member) throw AppErr("项目成员不存在", 404);
  return member;
};
export const _getProjectMemberByUser = async (
  projectId: string,
  entityType: "user" | "organization",
  entityId: string,
) => {
  // console.log("Fetching user project permissions for:", { projectId, userId })
  const condition =
    entityType === "user"
      ? eq(projectMember.userId, entityId)
      : eq(projectMember.organizationId, entityId);
  const member = await db.query.projectMember.findFirst({
    where: and(
      eq(projectMember.projectId, projectId),
      eq(projectMember.entityType, entityType), // 冗余字段，方便查询
      condition,
    ),
    with: {
      user: { columns: userItemFields },
      organization: { columns: orgItemFields },
    },
  });
  return member;
};
export const getProjectMemberByUser = async (
  projectId: string,
  entityType: "user" | "organization",
  entityId: string,
) => {
  const member = await _getProjectMemberByUser(projectId, entityType, entityId);
  if (!member) throw AppErr("项目成员不存在", 404);
  return member;
};
export const listProjectMember = async (
  projectId: string,
  noStatus: ProjectMemberStatus[] = [],
) => {
  const members = await db.query.projectMember.findMany({
    where: and(
      eq(projectMember.projectId, projectId),
      notInArray(projectMember.status, noStatus),
    ),
    orderBy: [asc(projectMember.createdAt)],
    with: {
      user: {
        columns: userItemFields,
      },
      organization: {
        columns: orgItemFields,
      },
    },
  });
  return members as ProjectMember[];
};

// 邀请用户加入 projectMember 流程:
// 1. invitationJoinProjectMember(inviterId, projectId, targetUserId)
export const inviteJoinProjectMember = async (
  projectId: string,
  targetUserId: string,
  inviterId: string,
) => {
  const member = await _getProjectMemberByUser(projectId, "user", targetUserId);
  if (member) throw AppErr("用户已是项目成员", 400);

  // 检查权限
  await checkMemberPermission(projectId, inviterId, "member.admin");
  return await db.transaction(async (tx) => {
    // 1. 插入 projectMember
    const [newMember] = await tx
      .insert(projectMember)
      .values({
        projectId: projectId,
        entityType: "user",
        userId: targetUserId,
        status: "pending", // 待接受邀请
        inviterId: inviterId,
      })
      .returning();
    // 2. 插入 notification
    const [newNotification] = await tx
      .insert(notification)
      .values({
        type: notificationType.invite_project_member,
        senderId: inviterId,
        content: {
          projectId,
        },
      })
      .returning();
    // 3. 插入 notification_receiver
    await tx.insert(notificationReceiver).values({
      notificationId: newNotification.id,
      userId: targetUserId,
      isRead: false,
    });
    return {
      member: newMember,
      notification: newNotification,
    };
  });
};

// U
export const updateProjectMember = async (
  id: string,
  newData: ProjectMemberUpdate,
  projectId: string,
  authId: string,
) => {
  // 检查成员是否存在
  // const targetMember = await getProjectMember(id)

  await checkMemberPermission(projectId, authId, "member.write");

  // 更新成员
  const [updatedMember] = await db
    .update(projectMember)
    .set(newData)
    .where(
      and(
        eq(projectMember.id, id),
        // eq(projectMember.projectId, projectId),
        // eq(projectMember.entityType, entityType),
        // entityType === "user" ? eq(projectMember.userId, entityId) : eq(projectMember.organizationId, entityId),
      ),
    )
    .returning();

  return updatedMember;
};
