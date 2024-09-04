import GoogleButton from '@/components/shared/googleButton/GoogleButton';
import SignInForm from '@/components/shared/signinForm/component';
import { Suspense } from 'react';

export default async function Singnin() {
  return (
    <main className="bg-bg grid place-content-center text-center">
      <h1 className="mb-8 text-4xl">Sign In</h1>
      <Suspense>
        <GoogleButton />
      </Suspense>
      <div className="mb-8 text-4xl"> or </div>
      <SignInForm />
    </main>
  );
}
