"use server";

import { defAct } from "@/app/a/action/lib";
import z from "zod";

const demoZ = z.object({ a: z.coerce.number(), b: z.number() });

export const demo = defAct(demoZ)((c) => c.input.a + c.input.b);
