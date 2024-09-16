import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './style.module.scss';

interface Props {
  className?: string;
}

export const SelectLanguage= ({ className }: Props) => {
  return (
    <div className={cn('', className)}>
      <Select>
        <SelectTrigger className={cn(`border-none ${styles.trigger}`)}>
          <SelectValue placeholder={<Languages />}></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-white dark:bg-black">
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ru">Русский</SelectItem>
            <SelectItem value="es">Español</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
