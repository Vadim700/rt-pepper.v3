import { PostsIcon } from '@/ui/icons/PostsIcon';
import { MyIcon } from '@/components/myIcon/MyIcon';
import Button from '@/ui/Button';
import { MyInput } from '@/ui/Input';

export default function Home() {
  return (
    <main className="grid place-items-center bg-bg text-2xl ">
      <div className="max-w-50">
        <MyInput  />
      </div>
    </main>
  );
}
