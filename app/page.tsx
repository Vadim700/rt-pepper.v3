import { PostsIcon } from '@/public/icons/postsIcon';
import { MyIcon } from '@/components/myIcon/MyIcon';

export default function Home() {
  return (
    <main className="grid place-items-center bg-bg">
      <MyIcon name={'todos'} className={''} size={50} />
      <MyIcon name={'posts'} className={''} size={50} />
      <MyIcon name={'photos'} className={''} size={50} />
    </main>
  );
}
