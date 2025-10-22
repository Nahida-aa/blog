import * as React from "react"

import {
  Select as UiSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { SelectProps as RadixSelectProps } from "@radix-ui/react-select"
import { Field } from "@/components/ui/field"
import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
}

interface SelectProps extends Omit<RadixSelectProps, "onValueChange"> {
  onChange?: (value: string) => void  // 自定义 onChange，覆盖 Radix 的
  options?: Option[]
  invalid?: boolean
  placeholder?: string
  name?: string  // 可选，控制 Field 包装
}

export function Select({
  defaultValue,
  value,
  onChange,
  options = [],
  invalid,
  name,
  placeholder = "Please select",  // 首字母大写，更标准
  ...props  // 剩余 props 传给 UiSelect
}: SelectProps) {
  const handleValueChange = React.useCallback(
    (newValue: string) => {
      onChange?.(newValue)  // 调用自定义 onChange
    },
    [onChange]
  )

  // 核心 Select JSX，避免重复
  const selectContent = (
    <UiSelect
      defaultValue={defaultValue}
      value={value}
      onValueChange={handleValueChange}
      {...props}  // 传播剩余 props（如 disabled 等）
    >
      <SelectTrigger aria-invalid={invalid} className={cn('hover:bg-button/80', invalid && 'ring-1 ring-destructive')}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
      </SelectContent>
    </UiSelect>
  )

  // 条件渲染 Field（仅当 name 存在时）
  if (name) {
    return (
      <Field orientation="responsive" data-invalid={invalid}>
        {selectContent}
      </Field>
    )
  }

  return selectContent
}