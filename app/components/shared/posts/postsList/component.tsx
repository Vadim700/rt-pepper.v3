import React from 'react';
import { PostItem } from '../postItem/component';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  posts: any[];
}

export const PostsList: React.FC<Props> = ({ className, posts }) => {
  return (
    <div className={className}>
      {posts.map((post) => (
        <div className={cn('flex items-center gap-2')}>
          <PostItem key={post.id} post={post} />
        </div>
      ))}
    </div>
  );
};
