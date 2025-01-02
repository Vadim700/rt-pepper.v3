import GithubButton from '@/app/components/shared/githubButton/GitHubButton';
import GoogleButton from '@/app/components/shared/googleButton/GoogleButton';
import { AuthModal } from '@/app/components/shared/modals/auth-modal';
import SignInForm from '@/app/components/shared/signinForm/component';
import { addNewUser } from '@/services/usersActions';
import { Suspense } from 'react';

export default async function Singnin() {
  const regNewUser = async (data: any) => {
    'use server';
    try {
      await addNewUser(data);
      console.log('success!!!');
    } catch (e) {
      console.log(e, 'Не удоалось добавить нового пользователя');
    }
  };
  return (
    <main className="bg-bg dark:bg-bg-dark dark:text-light-yellow grid place-content-center text-center">
      <h1 className="text-4xl mb-8">Sign In with</h1>
      <div className="flex items-center justify-between mb-4">
        <Suspense>
          <GoogleButton />
        </Suspense>
        <Suspense>
          <GithubButton />
        </Suspense>
      </div>
      <div className="mb-8 text-4xl"> or </div>
      <SignInForm />
      <AuthModal regNewUser={regNewUser} />
    </main>
  );
}
