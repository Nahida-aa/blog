"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getBasePath } from "@/lib/utils/url.client";
import { zodResolver } from "@hookform/resolvers/zod"; // bun add @hookform/resolvers zod
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAlert, useLoading } from "../modal.provider";
import { FormModal } from "./FormModal";

// 表单验证 Schema
const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "项目名称不能为空")
    .max(100, "项目名称不能超过100个字符"),
  slug: z
    .string()
    .min(1, "项目标识符不能为空")
    .max(50, "标识符不能超过50个字符")
    .regex(/^[a-z0-9-]+$/, "标识符只能包含小写字母、数字和连字符"),
  summary: z
    .string()
    .min(10, "项目简介至少需要10个字符")
    .max(500, "项目简介不能超过500个字符"),
  visibility: z.enum(["public", "unlisted", "private"], {
    message: "请选择项目可见性",
  }),
});

type CreateProjectFormData = z.infer<typeof createProjectSchema>;

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectModal({
  open,
  onOpenChange,
}: CreateProjectModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showAlert = useAlert();
  const { showLoading, hideLoading } = useLoading();

  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      slug: "",
      summary: "",
      visibility: "public",
    },
  });

  const basePath = useMemo(() => getBasePath(), []);

  // 自动生成 slug 后续可能会修改
  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // 移除特殊字符
      .replace(/[\s_-]+/g, "-") // 替换空格、下划线为连字符
      .replace(/^-+|-+$/g, ""); // 移除开头和结尾的连字符

    form.setValue("slug", slug);
  };

  const handleSubmit = async (data: CreateProjectFormData) => {
    try {
      setIsSubmitting(true);
      await handleCreateProject(data);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("创建项目失败:", error);
      // 这里可以添加错误提示
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset();
      onOpenChange(false);
    }
  };
  // 创建项目的具体实现
  const handleCreateProject = async (data: CreateProjectFormData) => {
    showLoading("正在创建项目...");

    try {
      // 模拟 API 调用
      await new Promise((resolve) => setTimeout(resolve, 2000));

      hideLoading();
      showAlert("创建成功", `项目 "${data.name}" 已成功创建！`);

      // TODO: 这里应该调用实际的 API 来创建项目
      console.log("创建项目数据:", data);
      // 成功后可以重定向到新项目页面
      // router.push(`/project/${data.slug}`);
    } catch (error) {
      hideLoading();
      showAlert("创建失败", "项目创建过程中发生错误，请稍后重试。");
      throw error;
    }
  };
  return <FormModal
    open={open}
    onOpenChange={handleClose}
    title="创建项目"
    // description="填写下面的信息来创建您的新项目。带 * 的字段为必填项。"
    size="xl"
  >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        {/* 项目名称 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名称 *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="输入项目名"
                  onChange={(e) => {
                    field.onChange(e);
                    handleNameChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* URL */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL *</FormLabel>
              <FormControl>
                <div className="flex items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                  <span className="text-muted-foreground">
                    {basePath}/project/
                  </span>
                  <input
                    {...field}
                    placeholder="my-mod"
                    className="flex-1 bg-transparent outline-none text-foreground"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 可见性 */}
        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>项目可见性 *</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择可见性" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">公开</SelectItem>
                  <SelectItem value="unlisted">不列出</SelectItem>
                  <SelectItem value="private">私有</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>简介 *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="描述您的项目的一两句话"
                  rows={3}
                />
              </FormControl>
              <FormDescription>{field.value.length}/500 字符</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            创建项目
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            取消
          </Button>
        </div>
      </form>
    </Form>
  </FormModal>
}
