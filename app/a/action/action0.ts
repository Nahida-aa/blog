// import { cookies, headers } from "next/headers";
// import { z, type ZodType } from "zod";
// // 基础上下文（换成 interface，提升扩展效率）
// interface BaseActionContext<TInput, TOutput> {
//   input: TInput;
//   output?: TOutput; // 可选，用于 handler 设置输出
//   headers: typeof headers;
//   cookies: typeof cookies;
// }

// // 完整上下文，支持额外泛型 TExtra
// type ActionContext<TInput, TOutput, TExtra = {}> = BaseActionContext<TInput, TOutput> &
//   TExtra;

// type Middleware<TInput, TOutput, TExtra = {}> = (
//   c: ActionContext<TInput, TOutput, TExtra>,
//   next: () => Promise<void>,
// ) => Promise<void>;

// type Handler<TInput = any, TOutput = unknown, TExtra = {}> = (
//   c: ActionContext<TInput, TOutput, TExtra>,
// ) => TOutput | Promise<TOutput>;
// type InferHandlerInput<TF extends (...args: any) => any> = Parameters<TF>[0]["input"];
// type InferHandlerOutput<TF extends (...args: any) => any> = Awaited<ReturnType<TF>>;
// type InferHandlerExtra<TF> = TF extends Handler<any, any, infer E> ? E : never;
// /**
//  * Defines a new nextjs action
//  * @param
//  * @returns
//  * @example
//  * ```
//  * const example = defAction((c)=>{
//  *   return c.input.a + c.input.b
//  * })
//  * ```
//  */
// export const defAction = <
//   TSpecifiedInput extends InferHandlerInput<TH>,
//   TH extends Handler<TSpecifiedInput, any, any> = Handler<TSpecifiedInput, any, any>,
// >(
//   ...args: [TH] | [...Middleware<TSpecifiedInput, InferHandlerOutput<TH>, any>[], TH]
// ): ((input: TSpecifiedInput) => Promise<InferHandlerOutput<TH>>) => {
//   if (args.length === 0) throw new Error("Handler required");
//   const handler = args[args.length - 1] as TH; // 最后一个是 handler
//   const middlewares =
//     args.length > 1
//       ? (args.slice(0, -1) as Middleware<
//           InferHandlerInput<TH>,
//           InferHandlerOutput<TH>,
//           InferHandlerExtra<TH>
//         >[])
//       : [];
//   // 如果指定 TInput，检查匹配（TS 静态报错）
//   type ActualInput = InferHandlerInput<TH>;
//   type _CheckInput = TSpecifiedInput extends ActualInput
//     ? true
//     : "Specified TInput must match handler's c.input type";
//   // 构建 middleware 链（从后往前执行 next）
//   const runChain = async (
//     c: ActionContext<ActualInput, InferHandlerOutput<TH>, InferHandlerExtra<TH>>,
//     index: number = 0,
//   ): Promise<void> => {
//     if (index === middlewares.length) {
//       // 所有 middleware 跑完，执行 handler
//       c.output = await handler(c);
//       return;
//     }

//     const mw = middlewares[index];
//     await mw(c, () => runChain(c, index + 1));
//   };

//   return async (input: ActualInput): Promise<InferHandlerOutput<TH>> => {
//     "use server"; // 确保服务器执行

//     // 初始化上下文
//     const ctx = { input, headers, cookies } as ActionContext<
//       ActualInput,
//       InferHandlerOutput<TH>,
//       InferHandlerExtra<TH>
//     >;

//     try {
//       await runChain(ctx);
//       return ctx.output!;
//     } catch (error) {
//       console.error("Action failed:", error);
//       throw error;
//     }
//   };
// };
// export const defMiddleware = <TInput, TOutput, TExtra = {}>(
//   fn: (
//     c: ActionContext<TInput, TOutput, TExtra>,
//     next: () => Promise<void>,
//   ) => Promise<void>,
// ): Middleware<TInput, TOutput, TExtra> => fn;
// export const newActions = <TExtra = {}>() => {
//   return {
//     def: <
//       TSpecifiedInput extends InferHandlerInput<TH>,
//       TH extends Handler<any, any, TExtra> = Handler<any, any, TExtra>,
//     >(
//       ...args: Parameters<
//         typeof defAction<
//           TSpecifiedInput,
//           TH extends Handler<any, any, TExtra> ? TH : never
//         >
//       >
//     ) =>
//       defAction<TSpecifiedInput, TH extends Handler<any, any, TExtra> ? TH : never>(
//         ...args,
//       ),
//     defMiddleware: <TInput = any, TOutput = unknown>(
//       fn: (
//         c: ActionContext<TInput, TOutput, TExtra>,
//         next: () => Promise<void>,
//       ) => Promise<void>,
//     ): Middleware<TInput, TOutput, TExtra> => fn,
//   } as const;
// };

// // usage code:
// // 扩展上下文
// type ContextExtra = {
//   authId?: string;
//   // 可以加更多：role?: string; user?: User; 等
// };
// const act = newActions<ContextExtra>();

// const example11 = defAction<any, { a: number; b: number }>((c) => {
//   return c.input.a + c.input.b;
// });
// const example12 = act.def<{ a: number; b: number }>((c) => {
//   return c.input.a + c.input.b;
// });

// const _example = (c: { input: { a: number; b: number } }) => c.input.a + c.input.b;
// const example21 = defAction(_example);
// const example22 = act.def(_example);

// // middleware
// const exampleWithMiddleware = act.def(
//   async (c, next) => {
//     c.authId = "aa";
//     await next();
//   },
//   async (c, next) => {
//     c.authId = "bb";
//     await next();
//   },
//   (c: { input: { a: number; b: number }; authId?: string }) => {
//     console.log(c.authId);
//     return c.input.a + c.input.b;
//   },
// );

// // custom middleware
// const customMiddleware = act.defMiddleware(async (c, next) => {
//   c.authId = "aa";
//   await next();
// });
// const exampleWithCustomMiddleware = act.def(
//   customMiddleware,
//   customMiddleware,
//   customMiddleware,
//   (c) => {
//     console.log(c.authId);
//     return c.input.a + c.input.b;
//   },
// );

// // zod middleware
// export const validateMiddleware = <TInput>(schema: ZodType<TInput>) =>
//   defMiddleware(async (c, next) => {
//     c.input = schema.parse(c.input);
//     await next();
//   });
// const exampleWithSchema = z.object({ a: z.number(), b: z.number() });
// const exampleWithZod = defAction(validateMiddleware(exampleWithSchema), (c) => {
//   return c.input.a + c.input.b;
// });
