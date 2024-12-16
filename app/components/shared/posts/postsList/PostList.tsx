'use client';
import React from 'react';
import { PostItem } from '../postItem/PostItem';
import { cn } from '@/lib/utils';
import { Post } from '@/types';
import { AddPostForm } from '../addPostForm/AddPostForm';

interface Props {
  className?: string;
  posts: Post[];
  dict: any;
  onClickDelete: (arg0: number) => void;
  onAddPost: (data: any) => any;
}

export const PostsList: React.FC<Props> = ({
  className,
  posts,
  dict,
  onClickDelete,
  onAddPost,
}) => {
  const [postList, setPostList] = React.useState(posts);

  const handleClickDeleteBtn = (id: number) => {
    onClickDelete(id);
    setPostList(postList.filter((i) => i.id !== id));
  };

  const addPostsAction = async (data: any) => {
    try {
      const newPost = await onAddPost(data);
      setPostList((posts) => [...posts, newPost]);
    } catch (error) {
      console.error('Ошибка при добавлении поста:', error);
    }
  };


  return (
    <div className={cn(className, 'w-full flex flex-col gap-10 p-10')}>
      <AddPostForm addPost={addPostsAction} />
      <div className="grid-auto-fill gap-4">
        {postList
          .sort((a,b) => a.id - b.id)
          .map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onClickDelete={handleClickDeleteBtn}
          />
        ))}
      </div>
    </div>
  );
};
