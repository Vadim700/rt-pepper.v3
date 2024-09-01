'use client';

import Button from '@/ui/Button/Button';
import { Input } from '@/ui/Input/Input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { FormEventHandler } from 'react';

export default function SignInForm() {
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (res && !res.error) {
      router.push('/profile');
    } else {
      console.log(res);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <Input placeholder='email' className='min-h-10'/>
      <Input placeholder='password' type='password'/>
      <Button>Sign In</Button>
    </form>
  );
}
