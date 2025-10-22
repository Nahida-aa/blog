import { getSession } from "@/lib/auth/action";

// withAuth(service) -> action
export function withAuth<
  A extends any[], // 参数类型列表
  R, // 返回类型
>(handler: (userId: string, ...args: A) => Promise<R>): (...args: A) => Promise<R> {
  return async (...args) => {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");
    return handler(session.user.id, ...args);
  };
}

export function withLogin<
  A extends any[], // 参数类型列表
  R, // 返回类型
>(handler: (userId: string, ...args: A) => Promise<R>): (...args: A) => Promise<R> {
  return async (...args) => {
    const session = await getSession();
    if (!session || session.user.isAnonymous)
      throw new Error("Unauthorized: login required");
    return handler(session.user.id, ...args);
  };
}
