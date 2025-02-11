import { hash, compare } from 'bcrypt-ts';
import { z } from "zod"

// export  const get_user_by_usernameOrEmail = async (usernameOrEmail: string) => {
//   return await prisma.user.findFirst({
//     where: {
//       OR: [
//         { username: usernameOrEmail },
//         { email: usernameOrEmail },
//       ],
//     },
//   });
// }

// async function get_user_by_name_or_email(username: string, email: string) {
//   return await prisma.user.findFirst({
//     where: {
//       OR: [
//         { username },
//         { email },
//       ],
//     },
//   });
// }
// async function create_user(data: { username: string; email: string; password: string; avatar_url?: string }) {
//   console.log('create_user()')
//   const hashedPassword = await hash(data.password, 10);
//   return await prisma.user.create({
//     data: {
//       name: data.username,
//       username: data.username,
//       email: data.email,
//       password: hashedPassword,
//       avatar_url: data.avatar_url,
//     },
//   });
// }

export async function signUp(data: { username: string; email: string; password: string; avatar_url?: string }) {
  console.log('signUp()')
  const registerSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    avatar_url: z.string().url().optional(),
  });

  const parsedRegister = registerSchema.safeParse(data)

  if (!parsedRegister.success) {
    console.log('parsedRegister.error')
    throw new Error("Invalid registration data");
  }
  console.log('parsedRegister.success')

  // const existingUser = await get_user_by_name_or_email(data.username, data.email);
  const existingUser = null

  if (existingUser) {
    console.log('existingUser')
    throw new Error("Username or email already exists");
  }
  console.log('no existingUser')
  // const newUser = await create_user(data);
  const newUser = null
  console.log(`db newUser: ${newUser}`)
  return {
    id: newUser.id,
    name: newUser.name,
    image: newUser.avatar_url,
    username: newUser.username,
    email: newUser.email,
    avatar_url: newUser.avatar_url,
    role: newUser.role,
  };
}