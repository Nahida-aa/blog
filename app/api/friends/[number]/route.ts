// src/app/api/friends/[number]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetch_friends } from '../lib';

export async function GET(req: NextRequest, props: { params: Promise<{ number: string }> }) {
  const params = await props.params;
  const { number } = params;
  const friend = await fetch_friends({ issueNumber: number });
  return NextResponse.json(friend)
}

export async function PATCH(req: NextRequest, props: { params: Promise<{ number: string }> }) {
  const params = await props.params;
  const { number } = params;
  const updateData = await req.json();
  const updatedFriend = await fetch_friends({ 
    method: 'PATCH', 
    body: JSON.stringify(updateData), 
    issueNumber: number 
  });
  return NextResponse.json(updatedFriend)
}