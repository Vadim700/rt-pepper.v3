export const addNewUser = async (data: any) => {
  try {
    const res = await fetch(process.env.NEXTAUTH_URL + '/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Пост не найден');
    }

    return res.json();
  } catch (error) {
    throw new Error('Ошибка в addNewUser');
  }
};
