"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { GlobalModalRenderer } from "./GlobalModalRenderer";

// 模态框类型定义
export type ModalType =
  | "signOut"
  | "confirm"
  | "alert"
  | "prompt"
  | "loading"
  | "custom"
  | "createProject";

// 模态框数据接口
export interface ModalData {
  // 通用属性
  title?: string;
  description?: string;
  content?: ReactNode;

  // 确认模态框
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "warning";

  // 提示模态框
  onSubmit?: (value: string) => void | Promise<void>;
  placeholder?: string;
  defaultValue?: string;
  inputType?: "text" | "email" | "password" | "number";

  // 加载模态框
  loadingText?: string;
  progress?: number;

  // 退出登录模态框
  userName?: string;

  // 自定义模态框
  component?: ReactNode;
  props?: Record<string, any>;

  // 创建项目模态框
  // CreateProjectModal 内部处理具体的创建逻辑，不需要外部 onSubmit

  // 样式配置
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closable?: boolean;
  overlay?: boolean;
}

// Context 类型定义
interface ModalContextType {
  // 当前模态框状态
  isOpen: boolean;
  type: ModalType | null;
  data: ModalData | null;

  // 控制方法
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
  updateModal: (data: Partial<ModalData>) => void;

  // 便捷方法
  showAlert: (title: string, description?: string) => void;
  showConfirm: (
    title: string,
    description?: string,
    onConfirm?: () => void | Promise<void>,
    variant?: "default" | "destructive" | "warning",
  ) => void;
  showPrompt: (
    title: string,
    placeholder?: string,
    onSubmit?: (value: string) => void | Promise<void>,
    defaultValue?: string,
  ) => void;
  showLoading: (text?: string, progress?: number) => void;
  showSignOut: (userName?: string) => void;
  showCreateProject: () => void;
}

// 创建 Context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider 组件
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<ModalType | null>(null);
  const [data, setData] = useState<ModalData | null>(null);

  // 打开模态框
  const openModal = useCallback(
    (modalType: ModalType, modalData?: ModalData) => {
      setType(modalType);
      setData(modalData || {});
      setIsOpen(true);
    },
    [],
  );

  // 关闭模态框
  const closeModal = useCallback(() => {
    setIsOpen(false);
    // 延迟重置状态，等待动画完成
    setTimeout(() => {
      setType(null);
      setData(null);
    }, 200);
  }, []);

  // 更新模态框数据
  const updateModal = useCallback((newData: Partial<ModalData>) => {
    setData((prev) => (prev ? { ...prev, ...newData } : newData));
  }, []);

  // 显示警告模态框
  const showAlert = useCallback(
    (title: string, description?: string) => {
      openModal("alert", {
        title,
        description,
        confirmText: "确定",
        closable: true,
      });
    },
    [openModal],
  );

  // 显示确认模态框
  const showConfirm = useCallback(
    (
      title: string,
      description?: string,
      onConfirm?: () => void | Promise<void>,
      variant: "default" | "destructive" | "warning" = "default",
    ) => {
      openModal("confirm", {
        title,
        description,
        onConfirm,
        variant,
        confirmText: variant === "destructive" ? "删除" : "确定",
        cancelText: "取消",
        closable: true,
      });
    },
    [openModal],
  );

  // 显示输入提示模态框
  const showPrompt = useCallback(
    (
      title: string,
      placeholder?: string,
      onSubmit?: (value: string) => void | Promise<void>,
      defaultValue?: string,
    ) => {
      openModal("prompt", {
        title,
        placeholder,
        onSubmit,
        defaultValue,
        confirmText: "确定",
        cancelText: "取消",
        closable: true,
      });
    },
    [openModal],
  );

  // 显示加载模态框
  const showLoading = useCallback(
    (text?: string, progress?: number) => {
      openModal("loading", {
        loadingText: text || "加载中...",
        progress,
        closable: false,
        overlay: true,
      });
    },
    [openModal],
  );

  // 显示退出登录模态框
  const showSignOut = useCallback(
    (userName?: string) => {
      openModal("signOut", {
        userName,
        closable: true,
      });
    },
    [openModal],
  );

  // 显示创建项目模态框
  const showCreateProject = useCallback(() => {
    openModal("createProject", {
      closable: true,
    });
  }, [openModal]);

  const value: ModalContextType = {
    isOpen,
    type,
    data,
    openModal,
    closeModal,
    updateModal,
    showAlert,
    showConfirm,
    showPrompt,
    showLoading,
    showSignOut,
    showCreateProject,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <GlobalModalRenderer />
    </ModalContext.Provider>
  );
};

// Hook for using modal context
export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

// 便捷 hooks
export function useAlert() {
  const { showAlert } = useModal();
  return showAlert;
}

export function useConfirm() {
  const { showConfirm } = useModal();
  return showConfirm;
}

export function usePrompt() {
  const { showPrompt } = useModal();
  return showPrompt;
}

export function useLoading() {
  const { showLoading, closeModal, updateModal } = useModal();

  return {
    showLoading,
    hideLoading: closeModal,
    updateProgress: (progress: number) => updateModal({ progress }),
  };
}

export function useSignOut() {
  const { showSignOut } = useModal();
  return showSignOut;
}

export function useCreateProject() {
  const { showCreateProject } = useModal();
  return showCreateProject;
}
