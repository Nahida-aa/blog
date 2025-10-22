"use server";
import { auth } from ".";
import { headers } from "next/headers";
import type { AuthSession } from "./auth.provider";
/** @deprecated Use `sApi.getSession`  **/
// 标记这个函数已弃用

export const getSession = async () => {
  const session = await auth.api.getSession({ headers: await headers() }); // pass the headers
  return session as AuthSession | null;
};
