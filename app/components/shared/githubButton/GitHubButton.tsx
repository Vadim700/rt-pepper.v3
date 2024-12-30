'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '../../ui';

export default function GithubButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  return (
    <button onClick={() => signIn('github', { callbackUrl })} className="">
      <img
        className="h-16"
        src="https://github.githubassets.com/favicons/favicon.svg"
        alt="github icon"
      />
    </button>
  );
}
