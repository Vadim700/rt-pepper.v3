import Link from 'next/link';
import Navigation from '../navigation/component';
import Registration from '../registration/component';
import Image from 'next/image';

const navItems = [
  { label: 'Posts', href: '/posts' },
  { label: 'Photos', href: '/photo' },
  { label: 'Todos', href: '/todos' },
];

export default function Aside() {
  return (
    <aside className='grid grid-rows-[auto_1fr_auto] row-span-2 p-8 bg-white-green text-white'>
      <Link href={'/'} className='flex flex-col gap-4 items-center mb-8'>
        <Image
          src="/logo.svg"
          alt="Picture of the author"
          width={100}
          height={100}
          className="text-2xl"
          priority
        />
      <h2 className='text-xl uppercase'>Confident pepper</h2>
      </Link>
      <Navigation navLinks={navItems} />
      <Registration />
    </aside>
  );
}
