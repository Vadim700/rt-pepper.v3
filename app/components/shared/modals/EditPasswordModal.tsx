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
import { Eye, EyeOff, Loader } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/components/ui/form';
import { Button, Input } from '../../ui';
import { editUserPassword } from '@/services/usersActions';

interface Props {
  className?: string;
  editPassword: (newPassword: NewPassword) => Promise<void>;
  setSuccessChangePassword: () => void;
  setErrorChangePassword: () => void;
}

interface NewPassword {
  currentPassword: string;
  newPassword: any;
}

export const EditPasswordModal: React.FC<Props> = ({
  className,
  editPassword,
  setSuccessChangePassword,
  setErrorChangePassword,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const validateMessage = (chars: number): string => `Min ${chars} caraster`;

  const editPasswordSchema = z
    .object({
      currentPassword: z.string(),
      password: z.string().min(6, { message: validateMessage(6) }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Пароли должны совпадать',
      path: ['confirmPassword'],
    });

  type TPasswordForm = z.infer<typeof editPasswordSchema>;

  const form = useForm<TPasswordForm>({
    resolver: zodResolver(editPasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: TPasswordForm) => {
    setIsSending(true);
    const newPassword: NewPassword = {
      currentPassword: values.currentPassword,
      newPassword: values.confirmPassword,
    };
    try {
      await editPassword(newPassword);
      setSuccessChangePassword();
    } catch (e) {
      console.log('[AuthModal] Ничего не получилось!');
      setErrorChangePassword();
    } finally {
      setIsSending(false);
    }

    setOpen(false);
    form.reset();
  };

  const handlerEyeClick = () => {
    setShowPassword((show) => !show);
  };

  return (
    <div className={cn(className, '')}>
      <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
        <DialogTrigger className="underline hover:text-ginger">
          Edit
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-black">
          <DialogHeader>
            <DialogTitle className="text-4xl text-center mb-8">
              Update your password
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-9 mb-9"
            >
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input
                        placeholder="Current password"
                        type={!showPassword ? 'password' : 'text'}
                        {...field}
                        onChange={(e) =>
                          form.setValue('currentPassword', e.target.value)
                        }
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage className="absolute left-1 text-left text-sm" />
                    {field.value.length > 0 && (
                      <button
                        type="button"
                        className="absolute right-4 top-[50%] translate-y-[-50%] text-black !mt-0"
                        onClick={handlerEyeClick}
                      >
                        {!showPassword ? <Eye /> : <EyeOff />}
                      </button>
                    )}
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
                        placeholder="New password"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input
                        placeholder="Confirm new password"
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
