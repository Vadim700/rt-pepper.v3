'use client';

import { usePageTopicStore } from '@/store/topic';

export const Topic: React.FC = () => {
  const { topic } = usePageTopicStore();

  return <h1 className='mr-auto'>{topic}</h1>;
};
