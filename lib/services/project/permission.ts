// 公开项目 不检查 部分读取权限
export const projectMemberPermissionsKV = {
  "project.admin": "管理项目", // delete, 转让, visibility, slug
  "project.write": "编辑项目",
  "version.admin": "管理版本", // Maintain
  "version.write": "编辑版本",
  "member.admin": "管理成员", // 添加/删除团队成员 (Owner / Team Maintainer)
  "member.write": "编辑成员", // 设置成员权限 (Owner / Team Maintainer)
  "analysis.read": "查看分析",
  "revenue.read": "查看收入",
} as const;

export const projectMemberPermissions = Object.keys(
  projectMemberPermissionsKV,
) as (keyof typeof projectMemberPermissionsKV)[];

export type ProjectMemberPermission = (typeof projectMemberPermissions)[number];

// ✅ 生成选项列表 用于 UI
export const projectMemberPermissionsOptions = Object.entries(projectMemberPermissionsKV).map(
  ([key, label]) => ({
    key: key as ProjectMemberPermission,
    label,
  }),
);
