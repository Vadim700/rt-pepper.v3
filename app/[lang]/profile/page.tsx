import { EditProfileForm } from '@/app/components/shared/editProfileForm/component';
import { Toaster } from '@/app/components/ui';
import { getDictionary } from '@/app/dictionaries';
import { authConfig } from '@/configs/auth';
import { prisma } from '@/prisma/prisma-client';
import {
  deleteProfile,
  editUser,
  editUserEmail,
  editUserPassword,
} from '@/services/usersActions';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

type UserWithoutPassword = Omit<User, 'password'>;
type UserWithoutEmail = Omit<User, 'id'>;
interface SliceData {
  password: string;
  id: string;
  userWithoutPassword: UserWithoutPassword;
}

interface NewPassword {
  currentPassword: string;
  newPassword: string;
}

const Profile = async ({ params }: any) => {
  const { lang } = params;
  const session = await getServerSession(authConfig);
  const dict = await getDictionary(lang);

  if (!session) {
    redirect('/signin');
  }

  const findUser = await prisma.user.findFirst({
    where: {
      email: session?.user?.email || '',
    },
  });

  const { password, id, ...userWithoutPassword }: SliceData & any =
    findUser ?? {};

  async function editProfileAction(data: UserWithoutEmail) {
    'use server';

    const userData = { id, ...data };
    await editUser(userData);
  }

  async function deleteProfileAction() {
    'use server';
    await deleteProfile(id);
  }

  const editEmail = async (email: string) => {
    'use server';
    const userData = { id, email };

    await editUserEmail(userData);
  };

  const editPassword = async (passwordData: NewPassword) => {
    'use server';

    const { currentPassword, newPassword } = passwordData;

    const isPasswordValid = await compare(currentPassword, password);
    if (isPasswordValid) {
      const userData = { id, newPassword };
      await editUserPassword(userData);
    } else {
      throw new Error('Пароли не совпадают');
    }
  };

  return (
    <main className="bg-bg dark:bg-bg-dark flex flex-col justify-center items-center px-4">
      <h1 className="mb-12 text-3xl">
        Profile of <span className="text-ginger">{session?.user?.name}</span>
      </h1>
      <EditProfileForm
        className={''}
        editProfile={editProfileAction}
        deleteProfile={deleteProfileAction}
        editEmail={editEmail}
        editPassword={editPassword}
        userData={userWithoutPassword}
        lang={lang}
      />
    </main>
  );
};

export default Profile;
