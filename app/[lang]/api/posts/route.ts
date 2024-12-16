import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const posts = await prisma.post.findMany();
  const { searchParams } = new URL(req.url);

  const query = searchParams.get('q');

  let currentPosts = posts;

  if (query) {
    currentPosts = posts.filter((post) => {
      return post.title.toLowerCase().includes(query.toLowerCase());
    });
  }

  return NextResponse.json(currentPosts);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const post = await prisma.post.create({
    data,
  });

  return NextResponse.json(post);
}