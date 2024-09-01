'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.scss';
import { MyIcon } from '../myIcon/MyIcon';

type navLink = {
  label: string;
  href: string;
  icon: string;
};
type prop = {
  navLinks: navLink[];
};

export default function Navigation({ navLinks }: prop) {
  const pathname = usePathname();

  return (
    <nav className="">
      <ul className="flex gap-8 flex-col text-xl">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.label} className={isActive ? `${styles.active} flex items-center gap-4` : `flex items-center gap-4 group`}>
              <MyIcon name={link.icon} size={30} className="group-hover:text-ginger" />
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
