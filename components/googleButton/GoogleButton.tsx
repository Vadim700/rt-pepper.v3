'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '../ui';

export default function GoogleButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  return (
    <Button onClick={() => signIn('google', { callbackUrl })} className='mb-8'>
      Sign in with Google
    </Button>
  );
}
