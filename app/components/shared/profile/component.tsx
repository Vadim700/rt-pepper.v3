import { cn } from '@/lib/utils';
import { UserRound } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import Image from 'next/image';

interface Props {
  className?: string;
}

export const Profile: React.FC<Props> = async ({ className }) => {
  const session = await getServerSession(authConfig);

  return (
    <div className={cn('grid place-content-center', className)}>
      {session?.user?.image ? (
        <Link href="/profile" className="">
          <Image
            src={session.user.image}
            width={40}
            height={40}
            alt="Avatar"
            className="rounded-full"
          />
        </Link>
      ) : (
        <Link
          href={session?.user ? '/profile' : '/signin'}
          className="rounded-[50%] bg-brik inline-block p-1 "
        >
          <UserRound size={35} color="#000000" strokeWidth={2} />
        </Link>
      )}
    </div>
  );
};
