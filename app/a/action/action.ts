"use server";

import { defAct } from "@/app/a/action/lib";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import z from "zod";

const data = {
  id: "aa",
  name: "xaa",
};
export async function updateName(name: string) {
  console.log("name:", name);
  data.name = name;
  await new Promise((resolve) => setTimeout(resolve, 500));
  return name;
}

export type NameState = {
  name: string;
};
export async function updateNameState(
  currentState: NameState,
  name: string,
): Promise<NameState> {
  console.log("name:", name);
  currentState.name = name;
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { name };
}

export async function getName(id: string) {
  return data;
}

const demoZ = z.object({ a: z.coerce.number(), b: z.number() });

// demo3: (input: { a: unknown; b: number }) => Promise<number>
export const demo3 = defAct(demoZ).pre(async (c) => {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log("session:", session);
  return { session, id: "aa" };
})(async (c) => {
  // c: { input: { a: number; b: number }, session: AuthSession | null, id: string }
  console.log("id:", c.id);
  return c.input.a + c.input.b;
});
