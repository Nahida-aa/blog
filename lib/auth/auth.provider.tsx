"use client";

import { authClient } from "./client";
import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import useSWR, { SWRConfig, unstable_serialize } from "swr";
import { fetcher } from "@/lib/client/swr.c";
import { key } from "@/lib/client/swr";

export type AuthUser = Omit<typeof authClient.$Infer.Session.user, "username"> & {
  username: string;
};
export type AuthSession = {
  user: AuthUser;
  session: typeof authClient.$Infer.Session.session;
};

export type AuthContextValue = {
  session: AuthSession | null | undefined;
  sessionError: any;
  sessionLoading: boolean;
  sessionValidating: boolean;
  mutateSession: () => Promise<AuthSession | null | undefined>;
};

const AuthContext = createContext<AuthContextValue>({
  session: null,
  sessionError: null,
  sessionLoading: false,
  sessionValidating: false,
  mutateSession: async () => null,
});

export const useSession = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be used within an AuthSessionProvider");
  }
  return context;
};

type SessionProviderProps = {
  children: ReactNode;
  session?: AuthSession | null;
};

export const SessionProvider = ({ children, session }: SessionProviderProps) => {
  const ret = useSWR<AuthSession | null>(key.session, fetcher, {
    // 可选：避免焦点刷新（基于你之前问题）
    revalidateOnFocus: false,
    revalidateOnMount: false,
    fallbackData: session,
    // 其他：errorRetryCount: 3, 自动重试
  });
  // 如果没有会话且不在加载中，触发匿名登录
  useEffect(() => {
    const anonymousSignIn = async () => {
      try {
        const { error } = await authClient.signIn.anonymous();
        if (error) {
          console.error("失败: 获得匿名登录后的会话", error);
          return;
        }
        await ret.mutate();
      } catch (error) {
        console.error("匿名登录失败:", error);
      }
    };
    // 优化条件：无数据、无 error、非加载中才触发
    if (!ret.data && !ret.error && !ret.isLoading) {
      console.log("触发匿名登录");
      anonymousSignIn();
    }
  }, [ret.data, ret.error, ret.isLoading, ret.mutate]);

  const value = useMemo(
    () => ({
      session: ret.data,
      sessionError: ret.error,
      sessionLoading: ret.isLoading,
      sessionValidating: ret.isValidating,
      mutateSession: ret.mutate,
    }),
    [ret],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
