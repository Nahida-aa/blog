import { signUp } from '@/lib/db/q/user';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    const newUser = await signUp({ username, email, password });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 400 }
    );
  }
}