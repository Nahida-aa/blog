"use server";

import { getProjectMember, getProjectMemberByUser } from "./member";
import type {
  ProjectCreate,
  ListProjectQuery,
  ListUserSelfProjectQuery,
  ProjectStatus,
  ProjectUpdate,
} from "./index.t";
import { projectMemberPermissions } from "./permission";
import {
  eq,
  ilike,
  inArray,
  or,
  and,
  desc,
  type SQL,
  sql,
  sum,
  count,
} from "drizzle-orm";
import { AppErr } from "@/lib/types";
import { hasPermission } from "@/lib/services/permission";
import { db } from "@/lib/db";
import { createCommunity } from "@/lib/services/community";
import { project } from "@/lib/db/schema";
import { insertProjectMember } from "@/lib/db/service";
import { cookies } from "next/headers";

export const createProject = async (data: ProjectCreate, ownerId: string) => {
  return await db.transaction(async (tx) => {
    // 插入新项目
    const [newProject] = await tx
      .insert(project)
      .values({
        ...data,
        ownerType: "user", // 暂时只支持用户创建项目
        ownerId: ownerId,
      })
      .returning({
        id: project.id,
        slug: project.slug,
        name: project.name,
        status: project.status,
        createdAt: project.createdAt,
      });

    // 插入项目成员表，将创建者设为项目所有者
    await insertProjectMember(tx, {
      projectId: newProject.id,
      entityType: "user",
      userId: ownerId,
      role: "owner",
      permissions: [...projectMemberPermissions],
      isOwner: true,
      status: "active",
      joinMethod: "system",
    });

    // create community , 暂时用于提供 一个社区空间
    const newCommunity = await createCommunity(tx, {
      name: newProject.name,
      summary: data.summary,
      type: "project",
      entityId: newProject.id,
      ownerId: ownerId,
    });
    return newProject;
  });
};

// R
export const _getProjectBySlug = async (slug: string) =>
  await db.query.project.findFirst({
    where: (project, { eq }) => eq(project.slug, slug),
  });
export const getProjectBySlug = async (slug: string) => {
  const item = await _getProjectBySlug(slug);
  if (!item) throw AppErr("项目不存在", 404);
  return item;
};
export const getProjectById = async (id: string) => {
  const item = await db.query.project.findFirst({
    where: (project, { eq }) => eq(project.id, id),
  });
  if (!item) throw AppErr("项目不存在", 404);
  return item;
};
// type=mod, status=community 的项目, 可以被 type=community, status:any 搜索, 也可以被  type=mod, status=['community']
export const listProject = async (query: ListProjectQuery) => {
  const {
    limit = 20,
    offset = 0,
    type,
    q: search,
    v: gameVersions,
    s: sort,
    e,
    loaders,
    openSource,
    tags,
  } = query;
  const conditions = [eq(project.visibility, "public")];

  let status: ProjectStatus[] = query.status;
  // 添加已归档项目
  if (status.includes("published")) {
    status.push("archived");
  }
  if (type === "community") {
    conditions.push(eq(project.status, "community"));
  } else {
    conditions.push(eq(project.type, type));
    conditions.push(inArray(project.status, status));
  }
  if (search) {
    // 使用 PostgreSQL 的 ILIKE 做不区分大小写的模糊搜索，匹配 name 或 summary
    conditions.push(
      // sql`${project.name} ILIKE %${search}% OR ${project.summary} ILIKE %${search}%`,
      or(
        ilike(project.name, `%${search}%`),
        ilike(project.summary, `%${search}%`),
      ) as SQL,
    );
  }
  return await db
    .select()
    .from(project)
    .where(and(...conditions))
    .orderBy(desc(project.updatedAt))
    .limit(limit)
    .offset(offset);
};

const _makeListUserProjectConditions = (
  userId: string,
  query?: ListUserSelfProjectQuery,
) => {
  const { limit = 10, offset = 0, type, status, search } = query || {};
  // 构建查询条件 - 使用 Select API
  const conditions = [eq(project.ownerId, userId)];

  if (type) conditions.push(eq(project.type, type));
  if (status) conditions.push(eq(project.status, status));
  if (search) {
    // 使用 PostgreSQL 的 ILIKE 做不区分大小写的模糊搜索，匹配 name 或 summary
    conditions.push(
      // sql`${project.name} ILIKE %${search}% OR ${project.summary} ILIKE %${search}%`,
      or(
        ilike(project.name, `%${search}%`),
        ilike(project.summary, `%${search}%`),
      ) as SQL,
    );
  }
  return conditions;
};
export const listUserProject = async (
  userId: string,
  query?: ListUserSelfProjectQuery,
) => {
  const { limit = 10, offset = 0, type, status, search } = query || {};
  const conditions = _makeListUserProjectConditions(userId, query);
  // 获取项目列表 - 使用 Select API
  const projects = await db
    .select()
    .from(project)
    .where(and(...conditions))
    .orderBy(desc(project.updatedAt))
    .limit(limit)
    .offset(offset);

  return projects;
};

export interface UserProjectStats {
  total: number;
  totalDownloads: number;
  totalLikes: number;
  totalStars: number;
}
// stat
export const statUserProject = async (
  userId: string,
  query?: ListUserSelfProjectQuery,
) => {
  const conditions = _makeListUserProjectConditions(userId, query);

  //  total 与 sums（独立查询，使用聚合函数）
  const [item] = await db
    .select({
      total: count(),
      totalDownloads: sum(project.downloads).mapWith(Number),
      totalLikes: sum(project.likes).mapWith(Number),
      totalStars: sum(project.stars).mapWith(Number),
    })
    .from(project)
    .where(and(...conditions));
  return item as UserProjectStats;
};

// U
export const updateProject = async (id: string, data: ProjectUpdate, authId: string) => {
  const member = await getProjectMemberByUser(id, "user", authId);
  if (!member.isOwner) {
    if (data.slug || data.visibility) {
      if (!hasPermission(member.permissions, "project", "admin")) {
        throw AppErr("无权限修改项目标识符或可见性", 403);
      }
    } else {
      if (!hasPermission(member.permissions, "project", "write")) {
        throw AppErr("无权限修改项目信息", 403);
      }
    }
  }
  await db.update(project).set(data).where(eq(project.id, id));
};
