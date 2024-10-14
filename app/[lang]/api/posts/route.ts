import { NextResponse } from 'next/server';
import { posts } from '../../../../data/posts';

export async function GET(req: Request) {
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

export async function POST(req: Response) {
  const body = await req.json();

  return NextResponse.json({ body });
}
