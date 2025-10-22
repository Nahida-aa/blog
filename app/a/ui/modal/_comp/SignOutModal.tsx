"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { signOut } from "@/lib/auth/client";
import { useSession } from "@/lib/auth/auth.provider";
import { AlertTriangle, Info, Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export function SignOutModal({ isOpen, onClose, userName }: SignOutModalProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [clearData, setClearData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      setError(null);

      // 如果选择清除数据，清理本地存储
      if (clearData) {
        localStorage.clear();
        sessionStorage.clear();
        // 清除所有 cookies（可选）
        document.cookie.split(";").forEach((c) => {
          const eqPos = c.indexOf("=");
          const name = eqPos > -1 ? c.substr(0, eqPos) : c;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
      }

      // 执行登出 - 使用 better-auth
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            update();
            router.push("/");
            // 关闭模态框
            onClose();
          },
          onError: (ctx) => {
            console.error("Sign out error:", ctx.error);
            throw new Error(ctx.error.message || "退出登录失败");
          },
        },
      });
    } catch (err) {
      console.error("Sign out error:", err);
      setError(
        err instanceof Error ? err.message : "退出登录时发生错误，请重试",
      );
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleCancel = () => {
    if (!isSigningOut) {
      setError(null);
      setClearData(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogOut className="w-5 h-5 text-destructive" />
            确认退出登录
          </DialogTitle>
          <DialogDescription>
            {userName ? (
              <>
                您确定要退出{" "}
                <span className="font-medium text-foreground">{userName}</span>{" "}
                的账户吗？
              </>
            ) : (
              "您确定要退出当前账户吗？"
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 警告提示 */}
          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">注意事项</p>
              <p className="text-muted-foreground mt-1">
                退出登录后，您需要重新输入凭据才能访问您的账户。
              </p>
            </div>
          </div>

          {/* 清除数据选项 */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <Label htmlFor="clear-data" className="text-sm font-medium">
                  同时清除本地缓存数据
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  包括浏览器缓存、本地存储等数据
                </p>
              </div>
            </div>
            <Switch
              id="clear-data"
              checked={clearData}
              onCheckedChange={setClearData}
              disabled={isSigningOut}
            />
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="flex items-start gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-destructive">操作失败</p>
                <p className="text-destructive/80 mt-1">{error}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSigningOut}
          >
            取消
          </Button>
          <Button
            variant="destructive"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="min-w-[100px]"
          >
            {isSigningOut ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                退出中...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 mr-2" />
                确认退出
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
