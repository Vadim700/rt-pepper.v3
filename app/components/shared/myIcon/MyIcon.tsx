import { PhotosIcon } from '@/app/components/ui/icons/PhotosIcon';
import { PostsIcon } from '@/app/components/ui/icons/PostsIcon';
import { TodosIcon } from '@/app/components/ui/icons/Todos';
import { propIcon } from '@/types';
import { LogoutIcon } from '@/app/components/ui/icons/Logout';
import { ProfileIcon } from '@/app/components/ui/icons/ProfileIcon';
import { SignInIcon } from '@/app/components/ui/icons/SignInIcon';

export const MyIcon = ({ name, className, size }: propIcon) => {
  switch (name) {
    case 'posts':
      return <PostsIcon className={className} size={size} name={''} />;

    case 'photos':
      return <PhotosIcon name={''} className={''} size={size} />;

    case 'todos':
      return <TodosIcon name={''} className={''} size={size} />;

    case 'profile':
      return <ProfileIcon name={''} className={''} size={size} />;

    case 'logout':
      return <LogoutIcon name={''} className={''} size={size} />;
    case 'signIn':
      return <SignInIcon name={''} className={''} size={size} />;

    default:
      return null;
  }
};
