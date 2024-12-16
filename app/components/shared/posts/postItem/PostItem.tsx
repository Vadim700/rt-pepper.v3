import { cn } from '@/lib/utils';
import { Post } from '@/types';
import React from 'react';
import { DeleteButton } from '../../deleteButton/component';

interface Props {
  className?: string;
  post: Post;
  onClickDelete: (arg0: number) => void;
}

export const PostItem: React.FC<Props> = ({
  className,
  post,
  onClickDelete,
}) => {
  const createdAt = post.createdAt;

  const formattedDate = new Date(createdAt as string).toLocaleDateString(
    'ru-RU',
    {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    },
  );

  return (
    <div className={cn(className, 'border rounded-[6px] py-4 px-6 relative')}>
      <span>{post.id}</span>
      <h3 className="capitalize">{post.title}</h3>
      <div className="text-wrap">{post.body}</div>
      <DeleteButton
        className="absolute top-4 right-4"
        id={post.id}
        onClickDelete={onClickDelete}
      />
      <p className="text-sm text-end">{formattedDate}</p>
    </div>
  );
};
