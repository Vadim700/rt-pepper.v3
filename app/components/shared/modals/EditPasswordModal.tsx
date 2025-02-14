'use client';
import React, { useRef, useState } from 'react';
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
import { editUser } from '@/services/usersActions';

interface Props {
  className?: string;
}

export const EditPasswordModal: React.FC<Props> = ({ className }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const validateMessage = (chars: number): string => `Min ${chars} caraster`;

  const editEmailSchema = z
    .object({
      currentPassword: z
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

  type TRegForm = z.infer<typeof editEmailSchema>;

  const form = useForm<TRegForm>({
    resolver: zodResolver(editEmailSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: any) => {
    setIsSending(true);
    try {
      // await editUser(values);
    } catch (e) {
      console.log('[AuthModal] Ничего не получилось!');
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
                        onChange={(e) => setPasswordValue(e.target.value)}
                        value={passwordValue}
                      />
                    </FormControl>
                    <FormMessage className="absolute left-1 text-left text-sm" />
                    {passwordValue.length > 0 && (
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
