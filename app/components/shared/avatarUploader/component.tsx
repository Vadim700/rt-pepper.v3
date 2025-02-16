'use client';
import React, { useEffect, useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader, UserRound, X } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/components/ui/form';
import type { User } from '@prisma/client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Button, Input, Label, Toaster } from '../../ui';

interface Props {
  className?: string;
}

export const AvatarUploader: React.FC<Props> = ({ className }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const imageRef = useRef(null);

  const regSchema = z.object({
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
    defaultValues: {},
  });

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const uploadAvatar = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(uploadAvatar)}
        className="relative mb-5"
      >
        <div className="relative self-center">
          {selectedFile && (
            <span
              className="absolute top-[10px] right-[10px] cursor-pointer rounded-full bg-bg dark:bg-bg-dark hover:rotate-90 transition-all hover:text-red-500"
              onClick={() => setSelectedFile(null)}
            >
              <X size={25} />
            </span>
          )}
          <Label
            id="imageLabel"
            className="group w-48 aspect-square border rounded-full shrink-0 grid place-items-center overflow-hidden cursor-pointer hover:border-ginger"
            htmlFor="fileInput"
          >
            {selectedFile ? (
              <Image
                src={URL.createObjectURL(selectedFile)}
                ref={imageRef}
                width={170}
                height={170}
                alt="Avatar"
                className="object-cover aspect-square"
              />
            ) : (
              <UserRound
                size={100}
                className="text-ginger group-hover:text-white"
              />
            )}
          </Label>
        </div>
        <input
          className="h-0 opacity-0 hidden"
          type="file"
          name="files"
          onChange={handleFileChange}
          id="fileInput"
          tabIndex={5}
        />
        {selectedFile && (
          <button
            type="submit"
            onClick={onSaveAvatar}
            className="absolute bottom-[10px] right-0 rounded-full bg-bg dark:bg-bg-dark transition-all hover:text-green-600 hover:scale-150"
          >
            <Check size={32} />
          </button>
        )}
      </form>
    </Form>
  );
};
