'use client';
import * as React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { MyIcon } from '../myIcon/MyIcon';
import { usePageTopicStore } from '@/store/topic';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import styles from './style.module.scss';

type Prop = {
  lang: string;
  dict: any;
};

export const Registration = ({ lang, dict }: Prop) => {
  const session = useSession();
  let { updatePageTopic } = usePageTopicStore();
  const pathname = usePathname();

  const isActive = pathname.split('/').pop() === 'profile';

  React.useEffect(() => {
    if (pathname.split('/').includes('profile')) {
      updatePageTopic(dict.sideBar.profile);
    }
  }, [lang, pathname, dict.sideBar.profile, updatePageTopic]);

  return (
    <div className="flex flex-col text-lg">
      {session?.data && (
        <Link
          href={`/${lang}/profile`}
          className={cn(
            'text-lx mb-6 flex items-center gap-4 pl-2',
            isActive ? `text-ginger` : '',
            'hover:text-ginger',
            'transition-duration-150',
          )}
          onClick={() => updatePageTopic(dict.sideBar.profile)}
        >
          <MyIcon name={'profile'} size={40} className="" />{' '}
          {dict.sideBar.profile}
        </Link>
      )}
      {session?.data ? (
        <Link
          href={'#'}
          onClick={() => signOut({ callbackUrl: '/' + lang })}
          className="flex items-center gap-6"
        >
          <MyIcon name={'logout'} size={40} />
          {dict.sideBar.signOut}
        </Link>
      ) : (
        <Link
          href={`/${lang}/signin`}
          className="flex items-center gap-6"
          onClick={() => updatePageTopic('Sign In')}
        >
          <MyIcon name="signIn" size={40} />
          {dict.sideBar.signIn}
        </Link>
      )}
    </div>
  );
};
