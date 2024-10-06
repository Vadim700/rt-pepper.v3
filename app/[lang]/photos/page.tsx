import { getDictionary } from '@/app/dictionaries';
import React from 'react';

const Photo = async ({ params }: any) => {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <main className="grid place-items-center  bg-bg dark:bg-bg-dark dark:text-light-yellow text-2xl">
			{dict.photo}
    </main>
  );
};

export default Photo;
