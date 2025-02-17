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

// import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { AvatarUploader } from '@/app/components/shared/avatarUploader/component';
import { UploadImageResponse } from '../api/upload/route';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

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

  const {
    YANDEX_ACCESS_KEY_ID,
    YANDEX_SEKRET_ACCESS_KEY,
    YANDEX_DEFAULT_REGION,
    YANDEX_BACKET_NAME,
  } = process.env;

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

  const handleFile = async (formData: any) => {
    'use server';

    try {
      const file = formData.get('image');
      if (!file) {
        throw new Error('Файл не найден в formData');
      }

      const fileName = `${uuidv4()}-${formData.name}`;
      const fileBuffer = await file.arrayBuffer();
      const fileBytes = Buffer.from(new Uint8Array(fileBuffer));

      const s3Client = new S3Client({
        endpoint: 'https://storage.yandexcloud.net',
        credentials: {
          accessKeyId: YANDEX_ACCESS_KEY_ID || '',
          secretAccessKey: YANDEX_SEKRET_ACCESS_KEY || '',
        },
        region: YANDEX_DEFAULT_REGION,
      });

      await s3Client.send(
        new PutObjectCommand({
          Bucket: YANDEX_BACKET_NAME,
          Key: fileName + file.name,
          Body: fileBytes,
          ContentType: formData.type,
        }),
      );
    } catch (e) {
      throw new Error('Ошибка при получении изображения: ' + e);
    }
  };

  return (
    <main className="bg-bg dark:bg-bg-dark flex flex-col justify-center items-center px-4">
      <AvatarUploader putFile={handleFile} />
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
