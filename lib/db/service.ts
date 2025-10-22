// import {
//   createInsertSchema,
//   createSelectSchema,
//   createUpdateSchema,
// } from "@/api/openapi/helpers/create";
import type { Db } from ".";
import {
  community,
  communityMember,
  channelMessage,
  userReadState,
  channel,
  project,
  projectMember,
  projectVersion,
  versionFile,
  user,
  organization,
  friend,
} from "./schema";
import { eq, and, desc, sql, type SQL } from "drizzle-orm";
import type { z } from "zod";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import type { _ProjectInsert } from "@/lib/services/project/index.t";

// user
export const userSelectZ = createSelectSchema(user);
export type UserSelect = typeof user.$inferSelect;
export const userInsertZ = createInsertSchema(user);
export type UserInsert = typeof user.$inferInsert;
export const _userUpdateZ = createUpdateSchema(user);

export type _UserUpdate = z.infer<typeof _userUpdateZ>;
// org
export const orgSelectZ = createSelectSchema(organization);
export type OrgSelect = typeof organization.$inferSelect;
// friend
export const friendSelectZ = createSelectSchema(friend);
export type FriendSelect = typeof friend.$inferSelect;

export const projectSelectSchema = createSelectSchema(project);
export const projectInsertZ = createInsertSchema(project);

export const _projectUpdateZ = createUpdateSchema(project);
export type _ProjectUpdate = z.infer<typeof _projectUpdateZ>;
export const insertProject = async (db: Db, data: _ProjectInsert) =>
  await db.insert(project).values(data).returning();

// project version
export const versionSelectSchema = createSelectSchema(projectVersion);
export type SelectVersion = z.infer<typeof versionSelectSchema>;
export const versionInsertSchema = createInsertSchema(projectVersion);
export type InsertVersion = typeof projectVersion.$inferInsert;
export const insertVersion = async (db: Db, data: InsertVersion) =>
  await db.insert(projectVersion).values(data).returning();
export const versionUpdateSchema = createUpdateSchema(projectVersion);
export type UpdateVersion = z.infer<typeof versionUpdateSchema>;
// version file
export const versionFileSelectSchema = createSelectSchema(versionFile);
export type SelectVersionFile = z.infer<typeof versionFileSelectSchema>;
export const _versionFileInsertZ = createInsertSchema(versionFile);
export type _VersionInsertFile = typeof versionFile.$inferInsert;
export const versionFileUpdateSchema = createUpdateSchema(versionFile);
export type _UpdateVersionFile = z.infer<typeof versionFileUpdateSchema>;

// project member
export const projectMemberInsertSchema = createInsertSchema(projectMember);
export type ProjectMemberInsert = typeof projectMember.$inferInsert;
export const insertProjectMember = async (db: Db, data: ProjectMemberInsert) =>
  await db.insert(projectMember).values(data).returning();
export const projectMemberSelect = createSelectSchema(projectMember);
export type ProjectMemberSelect = typeof projectMember.$inferSelect;
export const _projectMemberUpdate = createUpdateSchema(projectMember);
export type _ProjectMemberUpdate = z.infer<typeof _projectMemberUpdate>;

export const communityInsertSchema = createInsertSchema(community);
export type CommunityInsert = typeof community.$inferInsert;
export const communitySelectSchema = createInsertSchema(community);
export type CommunitySelect = typeof community.$inferSelect;
export const communityUpdateSchema = createUpdateSchema(community);
export type CommunityUpdate = z.infer<typeof communityUpdateSchema>;
export const insertCommunity = async (db: Db, data: CommunityInsert) =>
  await db.insert(community).values(data).returning();
export const updateCommunity = async (db: Db, data: CommunityUpdate) =>
  await db.update(community).set(data).returning();

export const communityMemberInsertSchema = createInsertSchema(communityMember);
export type CommunityMemberInsert = typeof communityMember.$inferInsert;
export const communityMemberSelectSchema = createSelectSchema(communityMember);
export type CommunityMemberSelect = typeof communityMember.$inferSelect;
export const communityMemberUpdateSchema = createUpdateSchema(communityMember);
export const insertCommunityMember = async (db: Db, data: CommunityMemberInsert) =>
  await db.insert(communityMember).values(data).returning();

export const channelSelectSchema = createSelectSchema(channel);
export type ChannelSelect = typeof channel.$inferSelect;
export const channelInsertSchema = createInsertSchema(channel);
export type ChannelInsert = typeof channel.$inferInsert;
export const insertChannel = async (db: Db, data: ChannelInsert[]) =>
  await db.insert(channel).values(data).returning();
// msg
export const channelMessageInsertZ = createInsertSchema(channelMessage);
export type ChannelMessageInsert = typeof channelMessage.$inferInsert;
export const channelMessageSelectZ = createSelectSchema(channelMessage);
export type ChannelMessageSelect = typeof channelMessage.$inferSelect;
export const channelMessageUpdateSchema = createUpdateSchema(channelMessage);
