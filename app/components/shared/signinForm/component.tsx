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
} from '@/app/components/ui/form';
import React from 'react';
import { Loader } from 'lucide-react';

export default function SignInForm() {
  const router = useRouter();
  const [validAuth, setValidAuth] = React.useState<boolean | undefined>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
    setIsLoading(true);
    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res && res.ok) {
        router.push('/profile');
      } else {
        setValidAuth(true);
      }
    } catch (e) {
      console.log(e, '[SignInForm] Не получилось авторизоваться');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9 mb-9"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormMessage className="absolute left-1 text-left text-sm" />
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
                <FormMessage className="absolute left-1 text-left text-sm" />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isLoading ? <Loader className="animate-spin" /> : 'Sing In'}
          </Button>
        </form>
        {validAuth && (
          <div className="absolute bottom-[10px] left-0 text-red-500">
            Opps!.. unauthorized
          </div>
        )}
      </Form>
    </div>
  );
}
