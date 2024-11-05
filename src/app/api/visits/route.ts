import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis
const redis = Redis.fromEnv();

export const GET = async () => {
  try{
    // Fetch data from Redis
    const visits = await redis.lrange('visits', 0, -1)
    console.log('visits:', visits)
    
    // Return the result in the response
    return new NextResponse(JSON.stringify({ visits }), { status: 200 });
  }catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
};