'use client';
import React, { useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, UserRound, X } from 'lucide-react';
import InputMask from 'react-input-mask';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/components/ui/form';
import { Button, Input, Label } from '../../ui';
import type { User } from '@prisma/client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';

type UserWithoutPassword = Omit<User, 'password'>;

interface Props {
  className?: string;
  editProfile: (data: any) => Promise<void>;
  deleteProfile: () => Promise<void>;
  userData: UserWithoutPassword;
  lang: string;
}

export const EditProfileForm: React.FC<Props> = ({
  className,
  editProfile,
  deleteProfile,
  userData,
  lang,
}) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const imageRef = useRef(null);
  const validateMessage = (chars: number): string => `Min ${chars} caraster`;

  const regSchema = z.object({
    name: z.string().min(2, { message: validateMessage(2) }),
    fullName: z.string().min(2, { message: validateMessage(2) }),
    address: z.string().min(2, { message: validateMessage(2) }),
    phone: z.string().min(2, { message: validateMessage(2) }),
    // files: z
    //   .instanceof(File)
    //   .refine((file) => file.size <= 5 * 1024 * 1024, {
    //     message: 'Файл должен быть не более 5 Mb',
    //   })
    //   .refine(
    //     (file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
    //     {
    //       message: 'Only PNG, JPG, and JPEG files are allowed',
    //     },
    //   ),
  });

  type TRegForm = z.infer<typeof regSchema>;

  const form = useForm<TRegForm>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      name: userData.name || '',
      fullName: userData.fullName || '',
      phone: userData.phone || '',
      address: userData.address || '',
    },
  });

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onSubmitMainInfo = async (values: TRegForm) => {
    setIsSending(true);
    setSuccessUpdate(false);
    // const file = form.getValues('files') as File;
    try {
      // await editProfile({
      //   ...JSON.parse(
      //     JSON.stringify({
      //       ...values,
      //       image: file ? file.name : null,
      //     }),
      //   ),
      // });
      await editProfile({
        ...values,
      });
      setSuccessUpdate(true);
    } catch (e) {
      console.log(e, '[EditProfileForm] Не получилось отправить данные');
    } finally {
      setIsSending(false);
      form.reset(values);
    }
  };

  const onClickDeleteProfile = async () => {
    setIsDeleting(true);
    setSuccessDelete(false);
    try {
      await deleteProfile();
      setSuccessDelete(true);
      signOut({ callbackUrl: '/' + lang + '/posts' });
    } catch (e) {
      console.log('[onClickDeleteProfile] Не получилось удалить профиль');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={cn(className, 'flex flex-col gap-7 max-w-[900px]')}>
      <span className="text-2xl">Личная информация</span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitMainInfo)}
          className="grid gap-6 grid-rows-4 grid-cols-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                Name
                <FormControl className="space-y-0">
                  <Input
                    className=""
                    placeholder="Name"
                    type="text"
                    tabIndex={1}
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
                Full Name
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    type="text"
                    tabIndex={2}
                    {...field}
                  />
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
                Phone Number
                <FormControl>
                  <InputMask
                    {...field}
                    mask="+7 (999) 999-99-99"
                    className="flex h-10 w-full rounded-md border border-dark-green px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text- focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-12 bg-white dark:text-black space-y-0"
                    placeholder="+7 (___) ___-____"
                    type="text"
                    tabIndex={3}
                  />
                </FormControl>
                <FormMessage className="absolute left-1 text-left text-sm" />
              </FormItem>
            )}
          />
          <div className="row-span-2 self-end max-h-[140px] flex border h-full items-start px-3 py-2 gap-4">
            <div className="relative self-center">
              {selectedFile && (
                <span
                  className="absolute top-[3px] right-[3px] cursor-pointer rounded-full bg-bg dark:bg-bg-dark hover:rotate-90 transition-all hover:text-red-500"
                  onClick={() => setSelectedFile(null)}
                >
                  <X size={16} />
                </span>
              )}
              <Label
                id="imageLabel"
                className=" w-24 aspect-square border rounded-full shrink-0 grid place-items-center overflow-hidden cursor-pointer "
                htmlFor="fileInput"
              >
                {selectedFile ? (
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    ref={imageRef}
                    width={100}
                    height={100}
                    alt="Avatar"
                    className="object-cover aspect-square"
                  />
                ) : (
                  <UserRound size={55} className="text-ginger" />
                )}
              </Label>
            </div>
            <div className="h-full justify-evenly self-center flex flex-col pl-5">
              {/* <FormField
                control={form.control}
                name="files"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl className="">
                      <Input
                        placeholder="Image"
                        className=""
                        id="fileInput"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage className="absolute left-1 text-left text-sm" />
                  </FormItem>
                )}
              /> */}
              <label
                htmlFor="fileInput"
                className="h-6 cursor-pointer hover:underline uppercase"
              >
                Загрузить фото
                <input
                  className="h-0 opacity-0"
                  type="file"
                  name="files"
                  onChange={handleFileChange}
                  id="fileInput"
                  tabIndex={5}
                />
              </label>
              <p className="text-sm ">
                Формат: PNG, JPG, JPEG <br />
                Размер файла: не более 10 МБ <br />
                Размеры: не менее 400x400 px
              </p>
            </div>
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="relative">
                Adress
                <FormControl>
                  <Input
                    placeholder="Adress"
                    type="text"
                    tabIndex={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute left-1 text-left text-sm" />
              </FormItem>
            )}
          />
          <div className="flex col-span-2 justify-self-end items-center gap-10">
            {successUpdate && (
              <p className="text-2xl text-dark-green dark:text-green-400">
                Личная информация успешно обновлена
              </p>
            )}
            <Button type="submit" className=" w-60">
              {isSending ? <Loader className="animate-spin" /> : 'Update'}
            </Button>
          </div>
        </form>
      </Form>
      <span className="text-2xl">Информация для входа в личный кабинет</span>
      <div className="flex justify-between h-10 w-full border border-dark-green px-3 py-2 text-lg min-h-12 bg-white dark:text-black space-y-0">
        {userData.email || 'email'} <button className="underline">Edit</button>
      </div>
      <div className="flex justify-between h-10 w-full border border-dark-green px-3 py-2 text-lg min-h-12 bg-white dark:text-black space-y-0">
        XXXXXXXXX <button className="underline">Edit</button>
      </div>
      <Form {...form}>
        <form onSubmit={onClickDeleteProfile} className="self-start">
          <Button
            type="submit"
            className="w-60 justify-self-end bg-red-500 dark:bg-red-500 dark:text-white"
          >
            {isDeleting ? (
              <Loader className="animate-spin" />
            ) : (
              'Delete profile'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
