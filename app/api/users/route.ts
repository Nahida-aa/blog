import { NextResponse } from 'next/server'
// import { prisma } from "@/lib/db"
import { auth } from "@/auth"

export async function GET(request: Request) {
  // const session = await auth()
  // if (!session || session.user.role !== 'ADMIN') {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }

  // const users = await prisma.user.findMany({
  //   // select: {
  //   //   id: true,
  //   //   name: true,
  //   //   username: true,
  //   //   email: true,
  //   //   role: true,
  //   //   created_at: true,
  //   //   last_login: true,
  //   //   is_active: true,
  //   // }
  // })
  const users =[]

  return NextResponse.json(users)
}

export async function POST(request: Request) {
  // const session = await auth()
  // if (!session || session.user.role !== 'ADMIN') {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }

  const body = await request.json()
  const { name, username, email, password, role } = body

  // const user = await prisma.user.create({
  //   data: {
  //     name,
  //     username,
  //     email,
  //     password, // Note: In a real application, you should hash the password before storing it
  //     role,
  //   }
  // })
  const user = null

  return NextResponse.json(user)
}