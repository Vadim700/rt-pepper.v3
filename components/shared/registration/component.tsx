'use client';
import * as React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { MyIcon } from '../myIcon/MyIcon';
import { usePageTopicStore } from '@/store/topic';

interface Props {}

export const Registration: React.FC<Props> = () => {
  const session = useSession();
  let { updatePageTopic } = usePageTopicStore();

  return (
    <div className="flex flex-col text-lg">
      {session?.data && (
        <Link
          href={'/profile'}
          className="text-lx mb-6 flex items-center gap-4 pl-2"
          onClick={() => updatePageTopic('Profile')}
        >
          <MyIcon name={'profile'} size={40} className="" /> Profile
        </Link>
      )}
      {session?.data ? (
        <Link
          href={'#'}
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-6"
        >
          <MyIcon name={'logout'} size={40} />
          Sign Out
        </Link>
      ) : (
        <Link
          href={'/signin'}
          className="flex items-center gap-6"
          onClick={() => updatePageTopic('Sign In')}
        >
          <MyIcon name="signIn" size={40} />
          Sign In
        </Link>
      )}
    </div>
  );
};
