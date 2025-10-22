"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface LoadingModalProps {
  isOpen: boolean;
  text?: string;
  progress?: number;
}

export function LoadingModal({
  isOpen,
  text = "加载中...",
  progress,
}: LoadingModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />

          <div className="text-center space-y-2">
            <p className="text-sm font-medium">{text}</p>

            {typeof progress === "number" && (
              <div className="space-y-2 w-full">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, Math.max(0, progress))}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round(progress)}%
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
