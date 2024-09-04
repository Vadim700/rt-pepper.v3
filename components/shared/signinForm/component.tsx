'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '../../ui';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import React from 'react';

export default function SignInForm() {
  const router = useRouter();
  const [validAuth, setValidAuth] = React.useState<boolean | undefined>(false);

  const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(5, { message: 'At least 5 characters long' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res && res.ok) {
      router.push('/profile'); // перенаправить на /profile
    } else {
      setValidAuth(true);
    }
  };

  return (
    <div className="relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormMessage className="absolute bottom-[-25px] left-1 text-left text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage className="absolute bottom-[-25px] left-1 text-left text-sm" />
              </FormItem>
            )}
          />
          <Button type="submit">Sign In</Button>
        </form>
        {validAuth && (
          <p className="absolute bottom-[-30px] left-0 text-red-500">
            Opps!.. unauthorized
          </p>
        )}
      </Form>
    </div>
  );
}
