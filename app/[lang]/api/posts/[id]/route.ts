import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const id = Number(params.id);
    const { title, body } = await req.json();

    const post = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Пост не найден' });
    }

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        body,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log('[POST_PATCH] Server error', error);
    return NextResponse.json(
      { message: 'Не удальсь обновить пост ' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const post = await prisma.post.delete({
      where: { id: Number(params.id) },
    });

    if (!post) {
      throw new Error('Пост не найден');
    } else {
      console.log(`[POST_DELETE] Пост ${params.id} успешно удален`);
    }

    return NextResponse.json(post);
  } catch (error) {
    console.log('[POST_DELETE] Ниче не получилось', error);
    return NextResponse.json({ error: 'ID не найден' }, { status: 400 });
  }
}
