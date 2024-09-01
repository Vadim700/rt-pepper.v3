import GoogleButton from '@/components/googleButton/GoogleButton';
import SignInForm from '@/components/signinForm/component';

export default async function Singnin() {
  return (
    <main className="bg-bg grid place-content-center text-center">
      <h1 className="mb-8 text-4xl">Sign In</h1>
      <GoogleButton />
      <div className='mb-8 text-4xl'> or </div>
      <SignInForm />
    </main>
  );
}
