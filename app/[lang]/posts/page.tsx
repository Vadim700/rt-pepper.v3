import { PostsList } from '@/app/components/shared/posts/postsList/component';
import { getDictionary } from '@/app/dictionaries';
import { getAllPosts } from '@/services/getPosts';

import React from 'react';

export default async function Posts({ params }: any) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  const posts = await getAllPosts();

  return (
    <main className="grid place-items-center text-2xl  bg-bg dark:bg-bg-dark dark:text-light-yellow">
      <PostsList posts={posts} />
    </main>
  );
}
