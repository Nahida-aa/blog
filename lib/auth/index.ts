import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db"; // your drizzle instance
// import { nextCookies } from "better-auth/next-js";
import * as schema from "@/lib/db/schema"; // Import the schema object
import {
  admin,
  anonymous,
  openAPI,
  organization,
  phoneNumber,
  twoFactor,
  emailOTP,
} from "better-auth/plugins";
import { username } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { serverBasePath } from "@/lib/config";

// # SERVER_ERROR:  [Error [BetterAuthError]: [# Drizzle Adapter]: The model "user" was not found in the schema object. Please pass the schema directly to the adapter options.] {
//   cause: undefined
// }
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    // schema: {
    //   // ...schema,
    //   user: schema.user,
    // },
    schema: schema,
  }),
  user: {
    additionalFields: {
      summary: {
        type: "string",
        required: false,
      },
      description: {
        type: "string",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: ["http://localhost:3000", "http://localhost:9999"],
  // appName: "auth",
  // baseURL: "http://localhost:3000",
  basePath: `/${serverBasePath}/auth`,
  plugins: [
    nextCookies(), // 适用于 Next.js 的 Cookie 处理
    twoFactor(), // 2FA: 即验证两次,且使用不同因素,开发初期不用考虑,
    // add: twoFactor: Table, user.twoFactorEnabled: boolean,
    username({
      minUsernameLength: 1, // 最小用户名长度, default 3
      // maxUsernameLength: 20, // 最大用户名长度, default 30
      usernameValidator: (username) => {
        // 允许中文
        const usernameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/; // 中文、字母、数字、下划线
        return usernameRegex.test(username);
      },
      usernameNormalization: false, // 是否规范化用户名（如转换为小写）, default true
    }),
    // add: user.username: unique; user.displayUsername: text
    anonymous(), // user.isAnonymous: boolean
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }, request) => {
        if (process.env.NODE_ENV === "development") {
          // 开发环境：控制台输出
          console.log(`🔥 开发模式 - 短信验证码`);
          console.log(`📱 手机号: ${phoneNumber}`);
          console.log(`🔢 验证码: ${code}`);
          console.log(`⏰ 有效期: 5分钟`);
          console.log(`----------------------------------------`);
          return;
        }

        // 生产环境：这里可以集成真实的短信服务
        // TODO: 集成阿里云、腾讯云或其他短信服务
        console.warn("生产环境短信服务未配置");
        throw new Error("短信服务暂不可用");
      },
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => {
          return `${phoneNumber}@temp-auth.com`;
        },
        getTempName: (phoneNumber) => {
          return `用户_${phoneNumber.slice(-4)}`;
        },
      },
    }), // add: user.phoneNumber: text,unique; user.phoneNumberVerified: boolean
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (process.env.NODE_ENV === "development") {
          // 开发环境：控制台输出
          console.log(`🔥 开发模式 - 邮箱验证码`);
          console.log(`📧 邮箱: ${email}`);
          console.log(`🔢 验证码: ${otp}`);
          console.log(`📋 类型: ${type}`);
          console.log(`⏰ 有效期: 5分钟`);
          console.log(`----------------------------------------`);
          return;
        }

        // 生产环境：实现真实的邮件发送
        // TODO: 集成邮件服务（如 Nodemailer、SendGrid 等）
        console.warn("生产环境邮件服务未配置");
        throw new Error("邮件服务暂不可用");
      },
    }),
    admin(),
    organization({
      schema: {
        organization: {
          additionalFields: {
            // better-auth 1.3, @latest
            summary: {
              type: "string",
              input: true,
              required: false,
            },
            description: {
              type: "string",
              input: true,
              required: false,
            },
          },
        },
      },
    }),
    openAPI(), // basePath/reference: open-api doc
  ],
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID as string,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  //   },
  // },
  // secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-here",
});

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
export type AuthSession = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
export type AuthTypeNotNull = {
  user: typeof auth.$Infer.Session.user;
  session: typeof auth.$Infer.Session.session;
};

export type SessionUser = typeof auth.$Infer.Session.user;
