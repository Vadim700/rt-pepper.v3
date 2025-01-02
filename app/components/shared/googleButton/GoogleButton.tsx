'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '../../ui';
import Image from 'next/image';

export default function GoogleButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  return (
    <button onClick={() => signIn('google', { callbackUrl })} className="">
      <Image
        src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
        className="block w-16 h-16"
        alt="google icon"
        height={16}
        width={16}
      />
    </button>
  );
}
