import GithubButton from '@/app/components/shared/githubButton/GitHubButton';
import GoogleButton from '@/app/components/shared/googleButton/GoogleButton';
import SignInForm from '@/app/components/shared/signinForm/component';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Singnin() {
  return (
    <main className="bg-bg dark:bg-bg-dark dark:text-light-yellow grid place-content-center text-center">
      <h1 className="mb-8 text-4xl">Sign In</h1>
      <Suspense>
        <GoogleButton />
      </Suspense>
      <Suspense>
        <GithubButton />
      </Suspense>
      <div className="mb-8 text-4xl"> or </div>
      <SignInForm />
      <div className="mb-8 text-4xl"> or </div>
      <Link
        href="/signup"
        className="w-full bg-dark-green text-white hover:opacity-95 uppercase dark:bg-light-yellow dark:text-dark-green inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-14 "
      >
        Sign Up
      </Link>
    </main>
  );
}
