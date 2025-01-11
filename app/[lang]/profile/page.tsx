import { authConfig } from '@/configs/auth';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

const Profile = async () => {
  const session = await getServerSession(authConfig);

  const findUser = await prisma.user.findFirst({
    where: {
      email: session?.user?.email || '',
    },
  });

  return (
    <main className="bg-bg dark:bg-bg-dark flex flex-col justify-center items-center">
      <h1 className="mb-12 text-3xl">
        Profile of{' '}
        <span className="text-ginger dark:text-light-green">
          {session?.user?.name}
        </span>
      </h1>
      {session?.user?.image && (
        <Image
          priority
          src={session.user.image}
          width={150}
          height={150}
          alt="Avatar"
          className="rounded-full mb-4 "
        />
      )}
      {session?.user?.email && (
        <Link
          href={`mailto:${session.user.email}`}
          className="text-lg text-dark-green dark:text-light-yellow"
        >
          {session.user.email}
        </Link>
      )}
    </main>
  );
};

export default Profile;
