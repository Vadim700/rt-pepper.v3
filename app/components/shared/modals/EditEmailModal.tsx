'use client';
import React, { useState } from 'react';
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

import { cn } from '@/lib/utils';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/components/ui/form';
import { Button, Input } from '../../ui';
import { signOut, useSession } from 'next-auth/react';

interface Props {
  className?: string;
  editEmail: (email: string) => void;
}

export const EditEmailModal: React.FC<Props> = ({ className, editEmail }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const validateMessage = (chars: number): string => `Min ${chars} caraster`;
  const { data: session, update } = useSession();

  const editEmailSchema = z
    .object({
      email: z
        .string()
        .min(6, { message: validateMessage(6) })
        .email({ message: 'Invalid email' }),
      confirmEmail: z.string(),
    })
    .refine((data) => data.email === data.confirmEmail, {
      message: 'Пароли должны совпадать',
      path: ['confirmEmail'],
    });

  type TChangeEmailForm = z.infer<typeof editEmailSchema>;

  const form = useForm<TChangeEmailForm>({
    resolver: zodResolver(editEmailSchema),
    defaultValues: {
      email: '',
      confirmEmail: '',
    },
  });

  const onSubmit = async ({ email }: { email: string }) => {
    setIsSending(true);
    try {
      await editEmail(email);

      signOut({
        callbackUrl: '/signin',
      });
    } catch (e) {
      console.log('[AuthModal] Ничего не получилось!');
    } finally {
      setIsSending(false);
    }

    setOpen(false);
    form.reset();
  };

  return (
    <div className={cn(className, '')}>
      <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
        <DialogTrigger className="underline hover:text-ginger">
          Edit
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-black">
          <DialogHeader>
            <DialogTitle className="text-4xl text-center mb-4">
              Update your email
            </DialogTitle>
            <DialogDescription className='text-base mb-4'>
              After changing the email address, you need to log in again.
            </DialogDescription>
          </DialogHeader>
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
                      <Input placeholder="New e-mail" type="email" {...field} />
                    </FormControl>
                    <FormMessage className="absolute left-1 text-left text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmEmail"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input
                        placeholder="Confirm e-mail"
                        type="text"
                        onPaste={(e) => e.preventDefault()}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute left-1 text-left text-sm" />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isSending ? <Loader className="animate-spin" /> : 'Update'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
