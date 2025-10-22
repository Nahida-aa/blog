import { z } from "zod";

// 手机号验证 (中国手机号)
const phoneSchema = z.string().regex(/^1[3-9]\d{9}$/, "请输入有效的手机号");

// 邮箱验证
const emailSchema = z.string().email("请输入有效的邮箱地址");
export const usernameSchema = z
  .string()
  .min(1, "用户名不能为空")
  .max(50, "用户名不能超过50个字符");

// 密码验证
const passwordSchema = z
  .string()
  .min(8, "密码至少需要8个字符")
  .regex(/^(?=.*[A-Za-z])(?=.*\d)/, "密码必须包含字母和数字");

// 手机号或邮箱的联合验证
const phoneOrEmailSchema = z
  .union([phoneSchema, emailSchema])
  .refine(
    (value) =>
      phoneSchema.safeParse(value).success ||
      emailSchema.safeParse(value).success,
    {
      message: "请输入有效的手机号或邮箱地址",
    },
  );

// 登录表单验证
export const loginSchema = z.object({
  phoneNumberOrEmail: phoneOrEmailSchema,
  password: passwordSchema,
});
export const PhoneNumberOTPSignInSchema = z.object({
  phoneNumber: phoneSchema,
  code: z.string().min(1, "验证码不能为空"),
});

// 注册表单验证
export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  image?: File;
}

export const signUpSchema = z
  .object({
    name: z.string().min(1, "用户名不能为空"),
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: z.string().min(1, "请确认密码"),
    image: z.instanceof(File).optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "两次输入的密码不一致",
    path: ["passwordConfirmation"], // 将错误指向 passwordConfirmation 字段
  });

// 从 schema 推断类型，确保类型一致性
export type SignUpSchemaType = z.infer<typeof signUpSchema>;

// 验证单个字段
export const validateEmail = (value: string) => {
  const result = emailSchema.safeParse(value);
  return result.success ? null : result.error.issues[0].message;
};

export const validatePhoneOrEmail = (value: string) => {
  const result = phoneOrEmailSchema.safeParse(value);
  return result.success ? null : result.error.issues[0].message;
};

export const validatePassword = (value: string) => {
  const result = passwordSchema.safeParse(value);
  return result.success ? null : result.error.issues[0].message;
};

export const validateUsername = (value: string) => {
  const result = usernameSchema.safeParse(value);
  return result.success ? null : result.error.issues[0].message;
};

// 基于 Zod 验证结果检测输入类型
export const getInputType = (value: string): "email" | "phone" | "invalid" => {
  const phoneResult = phoneSchema.safeParse(value);
  const emailResult = emailSchema.safeParse(value);

  if (emailResult.success) {
    return "email";
  } else if (phoneResult.success) {
    return "phone";
  } else {
    return "invalid";
  }
};

// 扩展验证函数，返回类型信息
export const validateLoginFormWithType = (data: {
  phoneNumberOrEmail: string;
  password: string;
}) => {
  const result = loginSchema.safeParse(data);
  if (result.success) {
    const inputType = getInputType(data.phoneNumberOrEmail);
    return {
      success: true as const,
      data: result.data,
      inputType,
    };
  } else {
    return {
      success: false as const,
      errors: result.error.issues,
    };
  }
};

// 验证整个表单
export const validateLoginForm = (data: {
  phoneNumberOrEmail: string;
  password: string;
}) => {
  const result = loginSchema.safeParse(data);
  if (result.success) {
    return { success: true as const, data: result.data };
  } else {
    return { success: false as const, errors: result.error.issues };
  }
};

export type LoginFormData = z.infer<typeof loginSchema>;

// 测试函数 - 可以删除
export const testValidation = () => {
  console.log("测试无效输入:", validatePhoneOrEmail("invalid"));
  console.log("测试有效邮箱:", validatePhoneOrEmail("test@example.com"));
  console.log("测试有效手机号:", validatePhoneOrEmail("13812345678"));
};
