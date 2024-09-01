'use client';

import Button from '@/ui/Button/Button';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function GoogleButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  return (
    <Button onClick={() => signIn('google', { callbackUrl })}>
      Sign in with Google
    </Button>
  );
}
