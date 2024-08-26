import { PhotosIcon } from '@/public/icons/photosIcon';
import { PostsIcon } from '@/public/icons/postsIcon';
import { TodosIcon } from '@/public/icons/todos';
import { propIcon } from '@/types';

export const MyIcon = ({ name, className, size }: propIcon) => {
  switch (name) {
    case 'posts':
      return <PostsIcon className={className} size={size} name={''} />;

    case 'photos':
      return <PhotosIcon name={''} className={''} size={size} />;

    case 'todos':
      return <TodosIcon name={''} className={''} size={size} />;

    default:
      return null;
  }
};
