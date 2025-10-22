import type { project } from "@/lib/db/schema";
import { _projectUpdateZ } from "@/lib/db/service";
import z from "zod/v4";
export type ProjectSelect = typeof project.$inferSelect;
export type _ProjectInsert = typeof project.$inferInsert;
export const projectCreateZ = z.object({
  name: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[\w\u4e00-\u9fff-]+$/u, "slug 只能包含字母、数字、中文、连字符和下划线"),
  summary: z.string().min(1).max(500),
  visibility: z.enum(["public", "private", "unlisted"]).default("public"),
});
export type ProjectCreate = z.infer<typeof projectCreateZ>;
// 多选
const modTags = [
  "adventure", // 冒险
  "cursed", // 诅咒
  "decorative", // 装饰
  "economy", // 经济
  "equipment", // 装备"
  "food", // 食物
  "game_mechanics", // 游戏机制
  "library", // 库
  "magic", // 法术
  "management", // 管理
  "minigame", // 小游戏
  "mobs", // 怪物
  "optimization", // 优化
  "social", // 社交
  "storage", // 存储
  "technology", // 技术
  "transportation", // 运输, 输送, 交通车辆
  "utility", // 实用
  "world_generation", // 世界生成
];
const environment = ["client", "server"];
export const projectStatus = [
  "community", // 默认
  "draft", // 不需要批准,草稿, 仅自己可见
  "processing", // 审核中
  "rejected", // 被驳回
  "preparing", // 已批准,筹备中,可通过参数 status=['preparing'] 搜索
  "published", // 已批准,可搜索
  "archived", // 不需要另外批准,仅允许:published->archived,已归档,可搜索
  "withheld", // 违规, 已扣留, 被隐藏
] as const;
export const queryStatus = ["published", "community", "preparing"] as const; // 查询可用状态
export const modLoaders = [
  "Fabric",
  "Forge",
  "NeoForge",
  "Quilt",
  "Babric",
  "BTA(Babric)",
  "Java_Agent",
  "Legacy_Forge",
  "Risugami's_ModLoader",
  "NilLoader",
  "Ornithe",
  "Rift",
].map((s) => s.toLowerCase());
export const shaderLoaders = ["Canvas", "Iris", "OptiFine", "vanilla_Shader"].map((s) =>
  s.toLowerCase(),
);
export const pluginLoaders = [
  "Bukkit",
  "Folia",
  "Paper",
  "Purpur",
  "Spigot",
  "Sponge",
].map((s) => s.toLowerCase());
// 单选
export const sortOptions = [
  "relevance",
  "download_count",
  "follow_count",
  "published_at",
  "updated_at",
] as const;
export const projectType = [
  "mod", // 模组
  "resource_pack", // 资源包,由旧版的材质包(Texture Pack)扩展. 贴图、模型、声音、语言、字体、GUI 等
  "data_pack", // // 数据包,由旧版的行为包(Behavior Pack)扩展. 修改游戏规则、函数、合成、掉落等逻辑
  "shader",
  "world",
  "modpack", // 整合包
  "plugin",
  "server",
  "project",
  "community",
  "user",
  "other",
] as const;
export const listProjectQuery = z.object({
  q: z.string().optional(),
  limit: z.coerce.number().int().min(5).max(100).default(20).optional(),
  offset: z.coerce.number().int().min(0).default(0).optional(),

  s: z.enum(sortOptions).default("relevance").optional(),
  type: z.enum(projectType),
  v: z.string().array().optional(),
  loaders: z.string().array().optional(),
  tags: z.string().array().optional(),
  e: z.string().array().optional(),
  openSource: z.boolean().optional(),
  status: z.preprocess(
    (val) => {
      if (val == null) return undefined;
      if (Array.isArray(val)) return val;
      if (typeof val === "string")
        return val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      return undefined;
    },
    z
      .enum(queryStatus)
      .array()
      .optional()
      .default(["published"])
      .transform((arr) =>
        arr.filter((v) => queryStatus.includes(v as (typeof queryStatus)[number])),
      ),
  ),
});
export type ListProjectQuery = z.infer<typeof listProjectQuery>;
export type ListProjectPageQuery = Omit<ListProjectQuery, "type">;
export type ProjectType = (typeof projectType)[number];
export type ProjectStatus = (typeof projectStatus)[number];
export const projectTypeS = z.object({ type: z.enum(projectType) });

export const listUserSelfProjectQuery = z.object({
  offset: z.coerce.number().int().min(0).default(0).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(10).optional(),
  type: z
    .enum(["mod", "resource_pack", "data_pack", "shader", "world", "project"])
    .optional(),
  status: z
    .enum(["draft", "processing", "rejected", "approved", "archived", "private"])
    .optional(),
  search: z.string().optional(),
});
export type ListUserSelfProjectQuery = z.infer<typeof listUserSelfProjectQuery>;

export const projectUpdateZ = _projectUpdateZ.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  publishedAt: true,
  status: true, // 特殊处理
  ownerType: true, // 特殊处理
  ownerId: true, // 特殊处理
  downloads: true,
  likes: true,
  latestVersionId: true,
});
export type ProjectUpdate = z.infer<typeof projectUpdateZ>;
