import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const post = await prisma.user.create({
    data,
  });

  return NextResponse.json(post);
}
