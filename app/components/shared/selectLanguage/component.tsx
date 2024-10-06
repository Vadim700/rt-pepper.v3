'use client';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { cn } from '@/lib/utils';
import styles from './style.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { usePageTopicStore } from '@/store/topic';

interface Props {
  className?: string;
  lang: string;
  dict: any;
}

export const SelectLanguage = ({ className, lang, dict }: Props) => {
  const router = useRouter();
  const path = usePathname();
  let { topic, updatePageTopic } = usePageTopicStore();

  const replacePath = (value: string) => {
    const languages: string[] = ['ru', 'en', 'es'];
    const segments = path.split('/').filter(Boolean);

    if (languages.includes(segments[0])) {
      segments.shift();
    }
    segments.unshift(value);

    return '/' + segments.join('/');
  };

  const handlerChange = (value: string) => {
    router.push(replacePath(value));
  };

  return (
    <div className={cn('', className)}>
      <Select onValueChange={handlerChange}>
        <SelectTrigger
          className={cn(`border-none ${styles.trigger} uppercase`)}
        >
          <SelectValue placeholder={lang}></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-white dark:bg-black">
            <SelectItem value="en">EN</SelectItem>
            <SelectItem value="ru">RU</SelectItem>
            <SelectItem value="es">ES</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
