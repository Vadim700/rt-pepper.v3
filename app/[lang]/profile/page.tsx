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

import { readFileSync } from 'fs';
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { AvatarUploader } from '@/app/components/shared/avatarUploader/component';

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

  const config = {
    api: {
      bodyParser: false,
    },
  };

  const uploadAvatar = async () => {
    'use server';

    const BUCKET_NAME = process.env.AWS_BACKET_NAME || '';
    const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID || '';
    const SECRET_KEY = process.env.AWS_SEKRET_ACCESS_KEY || '';

    const s3Client = new S3Client({});
    const bucketName = 'rt-pepper';

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: 'bucket-text',
        Body: 'Hello bucket!',
      }),
    );
  };

  return (
    <main className="bg-bg dark:bg-bg-dark flex flex-col justify-center items-center px-4">
      <AvatarUploader />
      <EditProfileForm
        className={''}
        editProfile={editProfileAction}
        deleteProfile={deleteProfileAction}
        editEmail={editEmail}
        editPassword={editPassword}
        onUpload={uploadAvatar}
        userData={userWithoutPassword}
        lang={lang}
      />
    </main>
  );
};

export default Profile;
