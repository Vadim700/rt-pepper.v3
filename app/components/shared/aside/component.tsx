import Navigation from '../navigation/component';
import { Registration } from '../registration/component';
import { Logo } from '../logo/component';

type Props = {
  dict: any;
  lang: string;
};

export default function Aside({ dict, lang }: Props) {
  const navItems = [
    { label: dict.sideBar.menu.posts, href: `/${lang}/posts`, icon: 'posts' },
    { label: dict.sideBar.menu.photos, href: `/${lang}/photo`, icon: 'photos' },
    { label: dict.sideBar.menu.todos, href: `/${lang}/todos`, icon: 'todos' },
  ];

  return (
    <aside className="grid grid-rows-[auto_1fr_auto] row-span-2 p-12 bg-white-green text-white min-w-80 dark:bg-dark-green dark:text-light-yellow">
      <Logo dict={dict} lang={lang} />
      <Navigation navLinks={navItems} lang={lang} />
      <Registration dict={dict} lang={lang} />
    </aside>
  );
}
