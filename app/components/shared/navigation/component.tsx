'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.scss';
import { MyIcon } from '../myIcon/MyIcon';
import { usePageTopicStore } from '@/store/topic';
import { useEffect } from 'react';
import React from 'react';

type navLink = {
  label: string;
  href: string;
  icon: string;
};
type prop = {
  navLinks: navLink[];
  lang: string;
};

export default function Navigation({ navLinks, lang }: prop) {
  const pathname = usePathname();
  const { topic, updatePageTopic } = usePageTopicStore();
  const [currentLabel, setCurrentLabel] = React.useState<string>(topic);

  const handleUpdateTopic = (label: string) => {
    setCurrentLabel(label);
    updatePageTopic(label);
  };

  React.useEffect(() => {
    const simple = navLinks.filter((i) => i.icon === pathname.split('/').pop());
    updatePageTopic(simple[0]?.label);
  }, [lang, navLinks, pathname, updatePageTopic]);

  return (
    <nav className="">
      <ul className="flex gap-8 flex-col text-xl">
        {navLinks.map((link) => {
          const isActive =
            pathname.split('/').pop() === link.href.split('/').pop();
          return (
            <li
              key={link.label}
              className={
                isActive
                  ? `${styles.active} flex items-center gap-4`
                  : `${styles.navItem} flex items-center gap-4`
              }
            >
              <MyIcon
                name={link.icon}
                size={30}
                className="transition-all transition-duration: 150ms"
              />
              <Link
                href={link.href}
                className="transition-all transition-duration: 150ms"
                onClick={() => handleUpdateTopic(link.label)}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
