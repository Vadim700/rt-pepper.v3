'use client';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/components/ui/form';
import { Button, Input } from '../../ui';

interface Props {
  className?: string;
  regNewUser: (data: any) => Promise<void>;
}

export const AuthModal: React.FC<Props> = ({ className, regNewUser }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const validateMessage = (chars: number): string => `Min ${chars} caraster`;

  const regSchema = z
    .object({
      name: z.string().min(2, { message: validateMessage(2) }),
      email: z
        .string()
        .min(6, { message: validateMessage(6) })
        .email({ message: 'Invalid email' }),
      password: z.string().min(6, { message: validateMessage(6) }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Пароли должны совпадать',
      path: ['confirmPassword'],
    });

  type TRegForm = z.infer<typeof regSchema>;

  const form = useForm<TRegForm>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: TRegForm) => {
    setIsSending(true);
    const { confirmPassword, ...data } = values;
    try {
      await regNewUser(data);
    } catch (e) {
      console.log('[AuthModal] Ничего не получилось!');
    } finally {
      setIsSending(false);
    }

    setOpen(false);
    form.reset();
  };

  return (
    <div className={className}>
      <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
        <DialogTrigger className="w-full bg-dark-green text-white hover:opacity-95 uppercase dark:bg-light-yellow dark:text-dark-green inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-14">
          Sign UP
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-black">
          <DialogHeader>
            <DialogTitle className="text-4xl text-center mb-8">
              Form registration
            </DialogTitle>
            <DialogDescription> </DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-9 mb-9"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <Input placeholder="Name" type="text" {...field} />
                      </FormControl>
                      <FormMessage className="absolute left-1 text-left text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <Input placeholder="E-mail" type="text" {...field} />
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
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="absolute left-1 text-left text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <Input
                          placeholder="Confirm password"
                          type="password"
                          onPaste={(e) => e.preventDefault()}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="absolute left-1 text-left text-sm" />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {isSending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    'Registration'
                  )}
                </Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
