'use client';

import { Button } from '@/app/components/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Не менее 2 символов',
  }),
  body: z.string().min(10, {
    message: 'Не менее 10 символов',
  }),
  avatar: z.string(),
  autor: z.string().optional(),
});

export type PostForm = z.infer<typeof formSchema>;

export type NewPost = {
  title: string;
  body: string;
  avatar: string;
  autor: string;
};

export function AddPostForm({ addPost, className }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
      avatar: '',
      autor: session.data?.user?.name || 'Unknown autor',
    },
  });

  useEffect(() => {
    if (session.data?.user) {
      form.setValue('autor', session.data.user.name as string);
    }
  }, [session.data, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await addPost(values);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-2 w-full max-w-[60%] mx-auto', className)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="" placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Body" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex justify-center mx-auto min-w-[100px]">
          {isLoading ? <Loader className='animate-spin'/> : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
