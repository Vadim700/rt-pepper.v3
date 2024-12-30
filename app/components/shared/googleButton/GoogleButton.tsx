'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '../../ui';

export default function GoogleButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  return (
    <button onClick={() => signIn('google', { callbackUrl })} className="">
      <img
        className="h-16"
        src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
        alt='google icon'
      />
    </button>
  );
}
