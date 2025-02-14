import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const id = Number(params.id);
    const { email, name, fullName, address, phone } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' });
    }

    if (!email) {
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
    } else {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          email,
        },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log('[USER_PATCH] Server error', error);
    return NextResponse.json(
      { message: 'Не удальсь обновить пользователя ' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(params.id),
      },
    });

    if (!user) {
      console.log('Пользователь не нейден');
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log('[USER_PATCH] Server error', error);
    return NextResponse.json(
      { message: 'Не удальсь удалить профиль' },
      { status: 500 },
    );
  }
}
