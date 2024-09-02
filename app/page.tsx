import { PostsIcon } from '@/components/ui/icons/PostsIcon';
import { MyIcon } from '@/components/myIcon/MyIcon';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="grid place-items-center bg-bg text-2xl ">
      <div className="max-w-50">
        Main Page <br />
        <Button variant={'default'}>Button from shadUI</Button>
      </div>
    </main>
  );
}
