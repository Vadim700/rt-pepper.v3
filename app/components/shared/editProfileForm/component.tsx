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
import { cn } from '@/lib/utils';

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
    files: z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: 'Файл должен быть не более 5 Mb',
      })
      .refine(
        (file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
        {
          message: 'Only PNG, JPG, and JPEG files are allowed',
        },
      ),
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
    console.log(values);
    const file = form.getValues('files') as File;
    try {
      await editProfile({
        ...JSON.parse(
          JSON.stringify({
            ...values,
            image: file ? file.name : null,
          }),
        ),
      });
    } catch (e) {
      console.log(e, '[EditProfileForm] Не получилось отправить данные');
    } finally {
      setIsSending(false);
    }
    form.reset();
  };

  return (
    <div className={cn(className, 'flex flex-col gap-7')}>
      <span className="text-2xl">Личная информация</span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6 grid-rows-4 grid-cols-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl className="space-y-0">
                  <Input
                    className=""
                    placeholder="Name"
                    type="text"
                    {...field}
                  />
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
          <div className="row-span-2 self-start">
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      placeholder="Image"
                      className="h-full block"
                      type="file"
                      onChange={(e) =>
                        field.onChange(e.target.files && e.target.files[0])
                      }
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
          <Button
            type="submit"
            className="block col-span-2 w-60 justify-self-end"
          >
            {isSending ? <Loader /> : 'Update'}
          </Button>
        </form>
      </Form>
      <span className="text-2xl">Информация для входа в личный кабинет</span>
      <div className="flex justify-between h-10 w-full rounded-md border border-dark-green px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text- focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-12 bg-white dark:text-black space-y-0">
        {userData.email || 'email'} <button className="underline">Edit</button>
      </div>
      <div className="flex justify-between h-10 w-full rounded-md border border-dark-green px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text- focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-12 bg-white dark:text-black space-y-0">
        XXXXXXXXX <button className="underline">Edit</button>
      </div>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="self-start">
          <Button
            type="submit"
            className="w-60 justify-self-end bg-red-500 dark:bg-red-500 dark:text-white"
          >
            Delete profile
          </Button>
        </form>
      </Form>
    </div>
  );
};
