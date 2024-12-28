'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '../../ui';

export default function GithubButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  return (
    <Button onClick={() => signIn('github', { callbackUrl })} className="mb-8">
      Sign in with Github
    </Button>
  );
}
