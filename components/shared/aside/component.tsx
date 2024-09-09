import Navigation from '../navigation/component';
import { Registration } from '../registration/component';
import { Logo } from '../logo/component';

const navItems = [
  { label: 'Posts', href: '/posts', icon: 'posts' },
  { label: 'Photos', href: '/photo', icon: 'photos' },
  { label: 'Todos', href: '/todos', icon: 'todos' },
];

export default function Aside() {
  return (
    <aside className="grid grid-rows-[auto_1fr_auto] row-span-2 p-12 bg-white-green text-white min-w-80 dark:bg-dark-green dark:text-light-yellow">
      <Logo />
      <Navigation navLinks={navItems} />
      <Registration />
    </aside>
  );
}
