export const getAllPosts = async () => {
  const res = await fetch(process.env.NEXTAUTH_URL + '/api/posts');

  if (!res.ok) {
    throw new Error('Посты не найдены');
  }

  return res.json();
};

export const addNewPost = async (data: any) => {
  try {
    const res = await fetch(process.env.NEXTAUTH_URL + '/api/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Пост не найден');
    }

    return res.json();
  } catch (error) {
    throw new Error('Ошибка в addNewPost');
  }
};

export const deletePost = async (id: number) => {
  try {
    const res = await fetch(process.env.NEXTAUTH_URL + `/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Не получилось удалить пост');
    }

    return res.json();
  } catch (error) {
    throw new Error('Ошибка в PostActions');
  }
};
