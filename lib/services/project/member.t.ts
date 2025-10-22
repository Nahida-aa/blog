import { orgItemZ, userItemZ } from "../user/index.t";
import { projectMember } from "../../db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";
import { _projectMemberUpdate, projectMemberSelect } from "../../db/service";

export const projectMemberStatus = ["active", "inactive", "pending"] as const;
export type ProjectMemberStatus = (typeof projectMemberStatus)[number];

export const projectMemberType = z.enum(["user", "organization"]);
export type ProjectMemberType = z.infer<typeof projectMemberType>;
export const projectMemberQuery = z.object({
  entityType: projectMemberType,
  userId: z.string(),
});
export type ProjectMemberQuery = z.infer<typeof projectMemberQuery>;

export const projectMemberZ = projectMemberSelect.extend({
  user: userItemZ.nullable(),
  organization: orgItemZ.nullable(),
});
export type ProjectMemberT = z.infer<typeof projectMemberZ>;
export interface ProjectMember extends ProjectMemberT {}

export const projectMemberUpdate = _projectMemberUpdate.pick({
  role: true,
  permissions: true,
});
export type ProjectMemberUpdate = z.infer<typeof projectMemberUpdate>;
