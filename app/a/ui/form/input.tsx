"use client";
import {
  Input as HeroInput,
  type InputProps,
  Textarea as HeroTextarea,
  type TextAreaProps,
} from "@heroui/input";
import {
  Select as HeroSelect,
  SelectSection as HeroSelectSection,
  SelectItem as HeroSelectItem,
  type SelectProps,
  type SelectItemProps,
} from "@heroui/select";
// import type { ListboxItemProps } from "@heroui/react";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { UploadIcon } from "lucide-react";
import { toast } from "@/app/a/ui/toast";
import { formatBytes } from "@/lib/utils/format";
import type { SharedSelection, Selection } from "@heroui/react";
import { Button } from "@/app/a/ui/base/button";

export const Input = ({
  size = "sm",
  label,
  labelPlacement,
  ...props
}: InputProps) => {
  return (
    <HeroInput
      {...props}
      label={label}
      size={size}
      labelPlacement={!labelPlacement && label ? "outside-top" : undefined}
      classNames={{
        ...props.classNames,
        label: cn(
          "text-base leading-none font-semibold",
          {
            "text-sm font-medium": size === "sm",
          },
          props.classNames?.label,
        ),
        description: cn(
          "text-sm text-muted-foreground",
          props.classNames?.description,
        ),
        errorMessage: cn("text-sm ", props.classNames?.errorMessage),
        inputWrapper: cn(
          `bg-input rounded-md  data-[hover=true]:bg-input/80 group-data-[focus=true]:bg-input group-data-[focus-visible=true]:ring-offset-0 max-w-120 ${props.variant === "underlined" ? "shadow-[0_1px_0px_0_rgba(0,0,0,0.30)]" : ""}`,
          size === "sm" && "h-9",
          props.classNames?.inputWrapper,
        ),
        input: cn("text-base leading-[1.15]", props.classNames?.input),
      }}
    />
  );
};

export const FileSelectButton = ({
  ref,
  value,
  startContent = <UploadIcon />,
  name = "file",
  // onFilesSelect,
  onChange,
  accept = "image/*",
  maxSize = 1024 * 1024,
  children,
  ...props
}: Omit<InputProps, "type" | "onChange" | "value"> & {
  onChange: (file: File | null) => void;
  value?: File | null;
  maxSize?: number;
}) => {
  // const internalRef = useRef<HTMLInputElement>(null)
  // const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      {/* 隐藏的 input */}
      <Input
        ref={inputRef}
        type="file"
        name={name}
        // value={undefined}
        className="hidden " // 🔥 直接隐藏
        onChange={(e) => {
          console.log("e", e);
          const files = e.target.files;
          if (!files) return;
          for (const file of files) {
            if (file.size > maxSize) {
              toast.error(
                `文件 ${file.name} 超过 ${formatBytes(maxSize)} 限制`,
              );
              return;
            }
          }
          console.log("files", files);
          console.log("value", value);
          onChange?.(files[0]);
        }}
        accept={accept}
        {...props}
      />

      {/* 点击按钮触发 input */}
      <Button
        startContent={startContent}
        onPress={() => inputRef.current?.click()}
      >
        {children ? children : "选择文件"}
      </Button>
    </>
  );
};

export const Textarea = ({
  label,
  labelPlacement,
  ...props
}: TextAreaProps) => {
  return (
    <HeroTextarea
      {...props}
      label={label}
      labelPlacement={!labelPlacement && label ? "outside-top" : undefined}
      classNames={{
        label: cn(
          "text-base leading-none font-semibold",
          props.classNames?.label,
        ),
        description: cn(
          "text-sm text-muted-foreground",
          props.classNames?.description,
        ),
        errorMessage: cn("text-sm ", props.classNames?.errorMessage),
        inputWrapper: cn(
          `bg-input py-2 data-[hover=true]:bg-input/80 group-data-[focus=true]:bg-input group-data-[focus-visible=true]:ring-offset-0 max-w-120 ${props.variant === "underlined" ? "shadow-[0_1px_0px_0_rgba(0,0,0,0.30)]" : ""}`,
          props.classNames?.inputWrapper,
        ),
        input: cn("text-base leading-[1.15] ", props.classNames?.input),
        ...props.classNames,
      }}
    />
  );
};

export const Select = ({
  options,
  label,
  labelPlacement = "outside",
  placeholder = "请选择",
  value,
  onChange,
  selectedKeys,
  onSelectionChange,
  defaultSelectedKeys,
  ...props
}: Omit<SelectProps, "children" | "onChange"> & {
  options: { key: string; label: React.ReactNode }[];
  onChange: (value?: string | number | (string | number)[] | null) => void;
}) => {
  const isMultiple = Array.isArray(value);
  const _selectedKeys: (string | number)[] = value
    ? isMultiple
      ? value
      : [value]
    : [];
  const _onSelectionChange = (keys: Selection) => {
    console.log("onSelectionChange", keys);
    const value = keys instanceof Set ? Array.from(keys) : [];
    console.log("value", value);
    if (isMultiple) {
      onChange?.(value);
    } else {
      onChange?.(value[0]);
    }
  };
  return (
    <HeroSelect
      {...props}
      label={label}
      labelPlacement={labelPlacement}
      placeholder={placeholder}
      defaultSelectedKeys={defaultSelectedKeys}
      selectedKeys={selectedKeys || _selectedKeys}
      onSelectionChange={onSelectionChange || _onSelectionChange}
      // onChange={onChange}
      classNames={{
        label: cn(
          "text-base leading-none font-semibold",
          props.classNames?.label,
        ),
        description: cn(
          "text-sm text-muted-foreground",
          props.classNames?.description,
        ),
        errorMessage: cn("text-sm ", props.classNames?.errorMessage),
        trigger: cn(
          `bg-button rounded-md py-2 data-[hover=true]:bg-input/80 group-data-[focus=true]:bg-input group-data-[focus-visible=true]:ring-offset-0 max-w-110 ${props.variant === "underlined" ? "shadow-[0_1px_0px_0_rgba(0,0,0,0.30)]" : ""}`,
          props.classNames?.trigger,
        ),
        // input: cn('text-base leading-[1.15] ', props.classNames?.input),
        popoverContent: cn("bg-popover", props.classNames?.popoverContent),
        ...props.classNames,
      }}
    >
      {options.map((option) => (
        <HeroSelectItem
          key={option.key}
          // className=''
          classNames={{
            base: "",
            selectedIcon: "text-primary",
          }}
        >
          {option.label}
        </HeroSelectItem>
      ))}
    </HeroSelect>
  );
};
