import { _userUpdateZ, orgSelectZ, userSelectZ, type UserSelect } from "@/lib/db/service";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userRes = userSelectZ.extend({
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  banExpires: z.string().or(z.date()).nullable(),
});
export type UserRes = z.infer<typeof userRes>;

export const userItemFields = {
  id: true,
  name: true,
  username: true,
  displayUsername: true,
  email: true,
  image: true,
} as const;
export const userItemZ = userSelectZ.pick(userItemFields);
export type UserItem = z.infer<typeof userItemZ>;

export const orgItemFields = {
  id: true,
  name: true,
  slug: true,
  logo: true,
} as const;
export const orgItemZ = orgSelectZ.pick(orgItemFields);
export type OrganizationItem = z.infer<typeof orgItemZ>;

export const userUpdateZ = _userUpdateZ.pick({
  name: true,
  email: true,
  image: true,
  username: true,
  displayUsername: true,
  phoneNumber: true,
  summary: true,
  description: true,
});
export type UserUpdate = z.infer<typeof userUpdateZ>;
