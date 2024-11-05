'use client';
import React from 'react';
import { PostItem } from '../postItem/component';
import { cn } from '@/lib/utils';
import { Post } from '@/types';

interface Props {
  className?: string;
  posts: Post[];
  dict: any;
  onClickDelete: (arg0: number) => void;
}

export const PostsList: React.FC<Props> = ({
  className,
  posts,
  dict,
  onClickDelete,
}) => {
  const [postList, setPostList] = React.useState(posts);

  const handleClickDeleteBtn = (id: number) => {
    onClickDelete(id);
    setPostList(postList.filter((i) => i.id !== id));
  };

  return (
    <div className={cn(className, 'w-full flex flex-col g-10 gap-10 p-10')}>
      {postList.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onClickDelete={handleClickDeleteBtn}
        />
      ))}
    </div>
  );
};
