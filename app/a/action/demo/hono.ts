import { Hono } from "hono"; // bun add hono
import { zValidator } from "@hono/zod-validator"; // bun add @hono/zod-validator
import z from "zod";

const demoZ = z.object({ a: z.coerce.number(), b: z.number() });

const app = new Hono().post("/demo", zValidator("json", demoZ), (c) => {
  const { a, b } = c.req.valid("json");
  return c.json({ ret: a + b });
});
