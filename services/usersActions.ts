import { User } from '@prisma/client';
import { hashSync } from 'bcrypt';

export const addNewUser = async (data: any) => {
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
    console.log(e, '[editUser]');
  }
};
