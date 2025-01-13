import { EditProfileForm } from '@/app/components/shared/editProfileForm/component';
import { getDictionary } from '@/app/dictionaries';
import { authConfig } from '@/configs/auth';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth';

const Profile = async ({ params }: any) => {
  const { lang } = params;
  const session = await getServerSession(authConfig);
  const dict = await getDictionary(lang);

  const findUser = await prisma.user.findFirst({
    where: {
      email: session?.user?.email || '',
    },
  });

  const { password, ...userWithoutPassword } = findUser ?? {};

  const editProfileAction = async (data: any) => {
    'use server';

    console.log(data, '>>> Profile');
  };

  return (
    <main className="bg-bg dark:bg-bg-dark flex flex-col justify-center items-center">
      <h1 className="mb-12 text-3xl">
        Profile of <span className="text-ginger">{session?.user?.name}</span>
      </h1>
      <EditProfileForm
        className={''}
        editProfile={editProfileAction}
        userData={userWithoutPassword}
      />
    </main>
  );
};

export default Profile;
