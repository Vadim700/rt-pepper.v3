'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { usePageTopicStore } from '@/store/topic';

export const Logo: React.FC = () => {
  let { resetPageTopic } = usePageTopicStore();

  return (
    <Link href={'/'} className="flex flex-col gap-4 items-center mb-8">
      <Image
        src="/icons/logo.svg"
        alt="Picture of the author"
        width={100}
        height={100}
        className="text-2xl"
        priority
        onClick={() => resetPageTopic()}
      />
      <h2 className="text-xl uppercase">Confident pepper</h2>
    </Link>
  );
};
