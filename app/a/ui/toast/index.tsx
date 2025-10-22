// https://sonner.emilkowal.ski/
import { toast as sonnerToast, type ExternalToast } from "sonner";
import { addToast } from "@heroui/toast";
import { User } from "../base/image/user";
import type { JSXElementConstructor, ReactElement } from "react";
const any2str = (value: any): string => {
  if (value == null) return "";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return "[Unserializable Object]";
    }
  }
  return String(value);
};

console.log("any2str", any2str({ id: "cdddc", cjkdvd: "cmnsibcs" })); // ""

export const toast = {
  success: (title?: string, description?: any) =>
    sonnerToast.success(title, { description: any2str(description) }),
  error: (error?: unknown, title?: string) => {
    let description: string | undefined;
    if (error instanceof Error) {
      description = error.message;
      title = title
        ? `${title} ${error.name} ${error.cause}`
        : `${error.name} ${error.cause}`;
    } else {
      description = String(error);
    }

    sonnerToast.error(title, { description });
  },
  warning: (title?: string, description?: any) =>
    sonnerToast.warning(title, {
      description: any2str(description),
    }),
  info: (title?: string, description?: any) =>
    sonnerToast.info(title, {
      description: any2str(description),
    }),
  msg: (avatar: string, name: string, description?: string) =>
    sonnerToast.custom(
      (t) => (
        <div className="bg-ctp-surface0/60 rounded-md p-2 w-80">
          <User src={avatar} name={name} size="sm" description={description} />
        </div>
      ),
      {
        position: "top-center",
      },
    ),
  custom: (
    jsx: (
      id: string | number,
    ) => ReactElement<unknown, string | JSXElementConstructor<any>>,
    data?: ExternalToast,
  ) => sonnerToast.custom(jsx, data),
};
