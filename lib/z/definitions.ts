import { z } from 'zod'
 
export const SignupFormSchema = z
.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters long.' })
    .trim().optional(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim().optional(),
  password: z
    .string()
    .min(6, { message: 'Be at least 6 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: 'Contain at least one special character.',
    // })
    .trim(),
})
.refine((data) => data.username || data.email, {
  message: 'Either username or email must be provided.',
  path: ['username'], // This will show the error message on both fields
})

export type FormState =
  | {
      errors?: {
        username?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined