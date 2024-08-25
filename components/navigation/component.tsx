'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';
import { useSession } from 'next-auth/react';

type navLink = {
  label: string;
  href: string;
};
type prop = {
  navLinks: navLink[];
};

export default function Navigation({ navLinks }: prop) {
  const pathname = usePathname();

  return (
    <nav className="">
      <ul className="flex gap-8 flex-col text-xl uppercase">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.label} className={isActive ? styles.active : ''}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
