import { PostsList } from '@/app/components/shared/posts/postsList/PostList';
import { getDictionary } from '@/app/dictionaries';
import { addNewPost, deletePost, getAllPosts } from '@/services/postsActions';
import type { Post } from '@/types';

import React from 'react';

export default async function Posts({ params }: any) {
  const { lang } = params;

  const dict = await getDictionary(lang);
  const posts: Post[] = await getAllPosts();

  const onDelete = async (id: number) => {
    'use server';
    try {
      await deletePost(id);
    } catch (e) {
      console.log('Не получилось удалить пост. Ошибка из [Posts]');
    }
  };

  const onAddPost = async (data: any) => {
    'use server';
    try {
      const newPost = await addNewPost(data);
      return newPost;
    } catch (e) {
      console.log('Не получилось добавить пост. Ошибка из [Posts]');
    }
  };

  return (
    <main className="grid  text-2xl  bg-bg dark:bg-bg-dark dark:text-light-yellow overflow-y-auto">
      <PostsList
        posts={posts}
        dict={dict}
        onClickDelete={onDelete}
        onAddPost={onAddPost}
      />
    </main>
  );
}
