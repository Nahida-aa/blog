import { NextRequest, NextResponse } from 'next/server';
// import { getFile } from '@/lib/mdx/get';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get('filePath');
  const { password } = await req.json();

  if (!filePath || !password) {
    return NextResponse.json({ message: 'Missing filePath or password' }, { status: 400 });
  }

  // const { metadata } = getFile(filePath);

  if ('2024' === password) {
    // const response = NextResponse.redirect(`/aa/${filePath}`);
    const response = NextResponse.json({ authenticated: true });
    response.cookies.set('authenticated', 'true', { path: '/' });
    return response;
  } else {
    return NextResponse.json({authenticated: false, message: 'Invalid password' }, { status: 401 });
  }
}