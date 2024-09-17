import * as React from 'react';

export default function Home({ params }: any) {
  const { lang } = params;
  console.log('page lang', lang);

  return (
    <main className="grid place-items-center bg-bg dark:bg-bg-dark text-2xl">
      main
    </main>
  );
}
