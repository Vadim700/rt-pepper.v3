'use client';
import React, { useEffect, useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import { unknown, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader, UserRound, X } from 'lucide-react';

import { Form, FormMessage } from '@/app/components/ui/form';
import type { User } from '@prisma/client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Button, Input, Label, Toaster } from '../../ui';
// import { getImage } from '@/services/imagesAction';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  className?: string;
  putFile: (file: any) => void;
}

export const AvatarUploader: React.FC<Props> = ({ className, putFile }) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      setUploading(true);
      setError(null);
      setSelectedFile(event.target.files[0]);

      const formData = new FormData();
      formData.append('image', event.target.files[0]);

      try {
        putFile(formData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="relative self-center mb-5">
      {selectedFile && (
        <span
          className="absolute top-[10px] right-[10px] cursor-pointer rounded-full bg-bg dark:bg-bg-dark hover:rotate-90 transition-all hover:text-red-500"
          onClick={() => setSelectedFile(undefined)}
        >
          <X size={25} />
        </span>
      )}
      <Label
        id="imageLabel"
        className="group w-48 aspect-square border rounded-full shrink-0 grid place-items-center overflow-hidden cursor-pointer"
        htmlFor="fileInput"
      >
        {selectedFile ? (
          <Image
            src={URL.createObjectURL(selectedFile)}
            ref={imageRef}
            width={190}
            height={190}
            alt="Avatar"
            className="object-cover aspect-square"
          />
        ) : (
          <UserRound
            size={100}
            className="text-ginger group-hover:text-white transition-colors"
          />
        )}
      </Label>
      <input
        className="h-0 opacity-0 hidden"
        type="file"
        name="image"
        onChange={handleFileChange}
        id="fileInput"
        tabIndex={5}
      />
      {uploading && <p>Загрузка...</p>}
      {error && <p className="absolute -bottom-5 left-0">{error}</p>}
    </div>
  );
};
