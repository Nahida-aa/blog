"use client";
import { toast as sonnerToast, type ExternalToast } from "sonner";
import React, { useState, useEffect } from "react";
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { Button } from "../base/button";
import { toast } from ".";
import { useSession } from "../../../../lib/auth/auth.provider";

export default function Page() {
  const router = useRouter();
  const params = useParams<{ tag: string; item: string }>(); // https://nextjs.org/docs/app/api-reference/functions/use-params
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = searchParams?.get("search");
  // const [state, setState] = useState<type>(initialValue);
  const { session } = useSession();
  useEffect(() => {
    // Side effects here
  }, []);

  return (
    <main className="p-3 flex flex-col gap-3">
      <Button
        onPress={() => {
          toast.msg(
            session!.user.image!,
            session!.user.name,
            `${session!.user.name}添加你为好友`,
          );
        }}
      >
        模拟收到好友请求通知
      </Button>
      <Button
        onPress={() => {
          toast.success("Success", {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        }}
      >
        success
      </Button>
      <Button
        onPress={() => {
          sonnerToast("Event has been created", {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        }}
      >
        sonner toast action
      </Button>
      <Button
        onPress={() => {
          const promise = () =>
            new Promise<{ name: string }>((resolve) =>
              setTimeout(() => resolve({ name: "Sonner" }), 2000),
            );

          sonnerToast.promise(promise, {
            loading: "Loading...",
            success: (data) => {
              return `${data.name} toast has been added`;
            },
            error: "Error",
          });
        }}
      >
        sonner toast promise success
      </Button>
      <Button
        onPress={() => {
          const promise = () =>
            new Promise<{ name: string }>((resolve, reject) =>
              setTimeout(() => reject(new Error("Error message")), 2000),
            );

          sonnerToast.promise(promise, {
            loading: "Loading...",
            success: (data) => {
              return `${data.name} toast has been added`;
            },
            error: (error) => {
              return `${error.message} toast has been added`;
            },
          });
        }}
      >
        sonner toast promise error
      </Button>
    </main>
  );
}
