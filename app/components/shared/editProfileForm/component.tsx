'use client';
import React, { useState } from 'react';

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
import type { User } from '@prisma/client';

type UserWithoutPassword = Omit<User, 'password'> | {};

interface Props {
  className?: string;
  editProfile: (data: any) => Promise<void>;
  userData: UserWithoutPassword;
}

export const EditProfileForm: React.FC<Props> = ({
  className,
  editProfile,
  userData,
}) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const validateMessage = (chars: number): string => `Min ${chars} caraster`;

  const regSchema = z.object({
    name: z.string().min(2, { message: validateMessage(2) }),
    fullName: z.string().min(2, { message: validateMessage(2) }),
    phone: z.string().min(2, { message: validateMessage(2) }),
    adress: z.string().min(2, { message: validateMessage(2) }),
    image: z.string(),
  });

  type TRegForm = z.infer<typeof regSchema>;

  const form = useForm<TRegForm>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      name: (userData as Omit<User, 'password'>).name,
      fullName: (userData as Omit<User, 'password'>).fullName || '',
      phone: (userData as Omit<User, 'password'>).phone || '',
      adress: (userData as Omit<User, 'password'>).address || '',
    },
  });

  const onSubmit = async (values: TRegForm) => {
    setIsSending(true);
    try {
      await editProfile(values);
    } catch (e) {
      console.log('[AuthModal] Ничего не получилось!');
    } finally {
      setIsSending(false);
    }

    form.reset();
  };
  return (
    <div className={className}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-5 grid-rows-4 grid-cols-2"
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
            name="fullName"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input placeholder="Full Name" type="text" {...field} />
                </FormControl>
                <FormMessage className="absolute left-1 text-left text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input placeholder="Phone" type="text" {...field} />
                </FormControl>
                <FormMessage className="absolute left-1 text-left text-sm" />
              </FormItem>
            )}
          />
          <div className="row-span-2">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      placeholder="Adress"
                      className="h-full block"
                      type="file"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute left-1 text-left text-sm" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="adress"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input placeholder="Adress" type="text" {...field} />
                </FormControl>
                <FormMessage className="absolute left-1 text-left text-sm" />
              </FormItem>
            )}
          />
          <Button type="submit" className="block col-span-2 w-60 justify-self-end">
            {isSending ? <Loader className="animate-spin" /> : 'Registration'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
