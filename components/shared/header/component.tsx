import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from '../container/component';
import { Profile } from '../profile/component';
import { Topic } from '../topic/component';
import { ThemeSwitcher } from '../themSwitcher/component';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header
      className={cn(
        'flex py-8 justify-between items-center font-bold text-3xl dark:text-light-yellow',
        className,
      )}
    >
      <Container className={cn('flex items-center justify-between gap-4')}>
        <Topic />
        <ThemeSwitcher className="ml-auto mr-5 flex items-center gap-3" />
        <Profile />
      </Container>
    </header>
  );
};
