import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { z, type ZodType } from "zod";

interface BaseContext<TInput, TOutput> {
  input: TInput;
  output?: TOutput;
}
type DefaultExtra = Record<string, unknown>;
type Context<TInput, TOutput, TExtra = DefaultExtra> = BaseContext<TInput, TOutput> &
  TExtra;

/**
 * Defines a new nextjs action. curried function that takes a schema and returns a handler function.
 * @example
 * // generic usage
 * const demoZ = z.object({ a: z.coerce.number(), b: z.number() });
 * const demo = defAct(demoZ)(async (c) => c.input.a + c.input.b);
 * // demo: (input: { a: unknown; b: number }) => Promise<number>
 * // c.input is inferred as { a: number; b: number }
 *
 * // no schema
 * const _demo = (c: { input: { a: number; b: number } }) => c.input.a + c.input.b;
 * const demo1 = defAct()(_demo);
 * // (input: { a: number; b: number }) => Promise<number>
 *
 * // pre handler middleware
 * const demo2 = defAct(demoZ).pre(async (c) => {
 *   console.log("ctx in mw:", c);
 *   return { id: "mw-id" };
 * })(async (c) => {
 *   console.log("handler sees id ", c.id);
 *   return c.input.a + c.input.b;
 * });
 * // (input: { a: unknown; b: number }) => Promise<number>
 * // c.input is inferred as { a: number; b: number }, c.id is inferred as string
 *
 * // custom pre handler middleware
 * export const injectCookie = defPre(() => ({ cookies }));
 * export const injectHeaders = defPre(() => ({ headers }));
 * export const authMw = defPre(async () => {
 *   const session = await auth.api.getSession({ headers: await headers() });
 *   console.log("session:", session);
 *   if (!session) throw new Error("NoAuth");
 *   return { authId: session.user.id };
 * });
 * const demo3 = defAct().pre(authMw)(_demo);
 * // (input: { a: number; b: number }) => Promise<number>
 * // c.input is inferred as { a: number; b: number }, c.authId is inferred as string
 */
// Overloads:
// - schema provided: defAct(schema) -> Input is z.infer<typeof schema>
// - generic provided without schema: defAct<TInput>() -> Input is TInput
export function defAct<S extends z.ZodTypeAny, TExtra = DefaultExtra>(
  schema: S,
): ReturnType<typeof createFactoryWithSchema<S, TExtra>>;
export function defAct<TInput, TExtra = DefaultExtra>(): ReturnType<
  typeof createFactoryNoSchema<TInput, TExtra>
>;
export function defAct(arg?: any) {
  // runtime: arg may be schema or undefined
  if (arg) return createFactoryWithSchema(arg);
  return createFactoryNoSchema();
}

// 预处理钩子(中间件)：接收 ctx（ctx.input 已为 Input），返回一个可合并的对象
type PreMw<Input, CurrExtra, Out extends Record<string, any> = Record<string, any>> = (
  ctx: Context<Input, any, CurrExtra>,
) => Out | Promise<Out>;

type CombinePreMwOutputs<Arr extends readonly any[]> = Arr extends [infer H, ...infer R]
  ? H extends PreMw<any, any, infer Out>
    ? R extends readonly any[]
      ? Out & CombinePreMwOutputs<R>
      : Out
    : CombinePreMwOutputs<R>
  : Record<string, never>;

function createFactoryWithSchema<S extends z.ZodTypeAny, TExtra = DefaultExtra>(
  schema: S,
) {
  type Input = z.infer<S>;

  interface Factory<CurrExtraT> {
    <H extends (c: Context<Input, any, CurrExtraT>) => any>(
      handler: H,
    ): (input: z.input<S>) => Promise<Awaited<ReturnType<H>>>;
    pre: <Mws extends readonly PreMw<Input, CurrExtraT, any>[]>(
      ...mws: Mws
    ) => Factory<CurrExtraT & CombinePreMwOutputs<Mws>>;
  }

  function createFactory<CurrExtra = TExtra>(
    pres: readonly PreMw<Input, CurrExtra, any>[] = [],
  ): Factory<CurrExtra> {
    const factory = <H extends (c: Context<Input, any, CurrExtra>) => any>(
      handler: H,
    ) => {
      return async (input: z.input<S>): Promise<Awaited<ReturnType<H>>> => {
        const parsedInput = schema ? schema.parse(input) : (input as unknown as Input);
        const ctx = { input: parsedInput } as Context<
          Input,
          any,
          CurrExtra & Record<string, any>
        >;

        for (const mw of pres) {
          const out = await mw(ctx as any);
          if (out && typeof out === "object") Object.assign(ctx, out);
          else throw new Error("Pre must return an object");
        }

        try {
          return (await handler(ctx)) as Awaited<ReturnType<H>>;
        } catch (err) {
          console.error("Action failed:", err);
          throw err;
        }
      };
    };

    (factory as any).pre = <Mws extends readonly PreMw<Input, CurrExtra, any>[]>(
      ...mws: Mws
    ) => {
      return createFactory<CurrExtra & CombinePreMwOutputs<Mws>>([...pres, ...mws]);
    };

    return factory as unknown as Factory<CurrExtra>;
  }

  return createFactory();
}

function createFactoryNoSchema<TInput, TExtra = DefaultExtra>() {
  type Input = TInput;

  // Allow inferring Input from handler parameter when possible: if handler's param has an `input` property, use that.
  type HandlerToFn<H, CurrExtraT> = H extends (c: infer P) => infer R
    ? P extends { input: infer In }
      ? (input: In) => Promise<R>
      : (input: any) => Promise<R>
    : (input: any) => Promise<any>;

  interface Factory<CurrExtraT> {
    <H extends (c: any) => any>(handler: H): HandlerToFn<H, CurrExtraT>;
    pre: <Mws extends readonly PreMw<Input, CurrExtraT, any>[]>(
      ...mws: Mws
    ) => Factory<CurrExtraT & CombinePreMwOutputs<Mws>>;
  }

  function createFactory<CurrExtra = TExtra>(
    pres: readonly PreMw<Input, CurrExtra, any>[] = [],
  ): Factory<CurrExtra> {
    const factory = <H extends (c: any) => any>(handler: H) => {
      return async (input: any): Promise<any> => {
        const parsedInput = input as Input;

        const ctxBase = { input: parsedInput } as Context<Input, any, CurrExtra>;
        const ctx = { ...ctxBase } as Context<
          Input,
          any,
          CurrExtra & Record<string, any>
        >;

        for (const mw of pres) {
          const out = await mw(ctx as any);
          if (out && typeof out === "object") Object.assign(ctx, out);
          else throw new Error("Pre must return an object");
        }

        try {
          return await handler(ctx);
        } catch (err) {
          console.error("Action failed:", err);
          throw err;
        }
      };
    };

    (factory as any).pre = <Mws extends readonly PreMw<Input, CurrExtra, any>[]>(
      ...mws: Mws
    ) => {
      return createFactory<CurrExtra & CombinePreMwOutputs<Mws>>([...pres, ...mws]);
    };

    return factory as unknown as Factory<CurrExtra>;
  }

  return createFactory();
}

export const defPreMw = <T>(preMw: T) => preMw;

// generic usage
const demoZ = z.object({ a: z.coerce.number(), b: z.number() });

const demo = defAct(demoZ)(async (c) => c.input.a + c.input.b);
// (input: { a: unknown; b: number }) => Promise<number>
// c.input is inferred as { a: number; b: number }

// no schema
const _demo = (c: { input: { a: number; b: number } }) => c.input.a + c.input.b;
const demo1 = defAct()(_demo);
// (input: { a: number; b: number }) => Promise<number>

// pre handler middleware
const demo2 = defAct(demoZ).pre(async (c) => {
  console.log("ctx in mw:", c);
  return { id: "mw-id" };
})(async (c) => {
  console.log("handler sees id ", c.id);
  return c.input.a + c.input.b;
});
// (input: { a: unknown; b: number }) => Promise<number>
// c.input is inferred as { a: number; b: number }, c.id is inferred as string

// custom pre handler middleware
export const injectCookie = defPreMw(() => ({ cookies }));
export const injectHeaders = defPreMw(() => ({ headers }));
export const authMw = defPreMw(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log("session:", session);
  if (!session) throw new Error("NoAuth");
  return { authId: session.user.id };
});
const demo3 = defAct().pre(authMw)(_demo);
