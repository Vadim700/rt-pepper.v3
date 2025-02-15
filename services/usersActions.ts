import { User } from '@prisma/client';
import { hashSync } from 'bcrypt';

export const addNewUser = async (data: User) => {
  const hashData = {
    name: data.name,
    email: data.email,
    password: hashSync(data.password, 10),
  };

  try {
    const res = await fetch(process.env.NEXTAUTH_URL + '/api/users', {
      method: 'POST',
      body: JSON.stringify(hashData),
    });

    if (!res.ok) {
      throw new Error('[usersActions] Не получилось добавить пользователя');
    }

    return res.json();
  } catch (error) {
    throw new Error('Ошибка в addNewUser');
  }
};

export const editUser = async (data: User) => {
  const { id } = data;
  try {
    const res = await fetch(process.env.NEXTAUTH_URL + `/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Ошибка в editUser');
    }

    return res.json();
  } catch (e) {
    throw new Error('Не получилось обновить данные пользователя');
  }
};

export const deleteProfile = async (id: number) => {
  try {
    const res = await fetch(process.env.NEXTAUTH_URL + `/api/users/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('[deleteProfile] Не получилось удалить профиль');
    }

    return res.json();
  } catch (e) {
    throw new Error(`Не получилось удалить профиль`);
  }
};

export const editUserEmail = async (data: { id: any; email: string }) => {
  const { id, email } = data;
  try {
    const response = await fetch(
      process.env.NEXTAUTH_URL + `/api/users/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          email,
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Не удалось сделать запрос на измененеи эл. почты');
    }
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error('Не получилось изменить адрес эл. почты');
  }
};

export const editUserPassword = async (data: {
  id: any;
  newPassword: string;
}) => {
  const { id, newPassword } = data;

  try {
    const response = await fetch(process.env.NEXTAUTH_URL + `api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        password: hashSync(newPassword, 10),
      }),
    });

    if (!response.ok) {
      throw new Error('Не удалось сделать запрос к API для изменения пароля');
    }

    console.log('response in client >>> ', response);

    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error('Не получилось изменить пароль');
  }
};
