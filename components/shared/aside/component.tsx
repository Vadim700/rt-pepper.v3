import Link from 'next/link';
import Navigation from '../navigation/component';
import { Registration } from '../../registration/component';
import Image from 'next/image';

const navItems = [
  { label: 'Posts', href: '/posts', icon: 'posts' },
  { label: 'Photos', href: '/photo', icon: 'photos' },
  { label: 'Todos', href: '/todos', icon: 'todos' },
];

export default function Aside() {
  return (
    <aside className="grid grid-rows-[auto_1fr_auto] row-span-2 p-12 bg-white-green text-white min-w-80">
      <Link href={'/'} className="flex flex-col gap-4 items-center mb-8">
        <Image
          src="/icons/logo.svg"
          alt="Picture of the author"
          width={100}
          height={100}
          className="text-2xl"
          priority
        />
        <h2 className="text-xl uppercase">Confident pepper</h2>
      </Link>
      <Navigation navLinks={navItems} />
      <Registration />
    </aside>
  );
}
