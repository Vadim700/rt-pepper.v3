import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from '../container/component';
import { Profile } from '../profile/component';
import { Topic } from '../topic/component';
import { ThemeSwitcher } from '../themSwitcher/component';
import { SelectLanguage } from '../selectLanguage/component';
import { AuthModal } from '../modals/RegistrationModal';

interface Props {
  className?: string;
  lang: string;
  dict: any;
}

export const Header: React.FC<Props> = ({ className, lang, dict }) => {
  return (
    <header
      className={cn(
        'flex py-8 justify-between items-center font-bold text-3xl dark:text-light-yellow',
        className,
      )}
    >
      <Container className={cn('flex items-center justify-between gap-4')}>
        <Topic />
        <ThemeSwitcher className="flex items-center gap-3" />
        <SelectLanguage className="max-w-50" lang={lang} dict={dict} />
        <Profile />
      </Container>
    </header>
  );
};
