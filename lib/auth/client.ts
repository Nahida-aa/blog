import { createAuthClient } from "better-auth/react";
import {
  adminClient,
  anonymousClient,
  emailOTPClient,
  organizationClient,
  phoneNumberClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  basePath: "/api/auth",

  plugins: [
    twoFactorClient(),
    usernameClient(),
    anonymousClient(),
    phoneNumberClient(),
    emailOTPClient(),
    adminClient(),
    organizationClient(),
  ],
});

// export const {
//   signIn,
//   signOut,
//   signUp,
//   useSession,
//   getSession,

//   twoFactor,

//   updateUser,

//   phoneNumber,
// } = authClient;
