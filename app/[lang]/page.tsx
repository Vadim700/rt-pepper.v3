import { getDictionary } from '../dictionaries';

export default async function Home({ params }: any) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <main className="grid place-items-center bg-bg dark:bg-bg-dark text-2xl">
      {dict.sideBar.logo}
    </main>
  );
}
