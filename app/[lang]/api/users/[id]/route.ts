import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const id = Number(params.id);
    const { name, fullName, address, phone } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' });
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        fullName,
        address,
        phone,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[POST_PATCH] Server error', error);
    return NextResponse.json(
      { message: 'Не удальсь обновить пользователя ' },
      { status: 500 },
    );
  }
}
