import { SingUpForm } from '@/app/components/shared/signupForm/component';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

const SignUp: React.FC<Props> = ({ className }) => {
  return (
    <main
      className={cn(
        className,
        'bg-bg dark:bg-bg-dark dark:text-light-yellow grid place-content-center text-center',
      )}
    >
			<h1 className="mb-8 text-4xl">Sign Up Form</h1>
			<SingUpForm />
    </main>
  );
};

export default SignUp;
