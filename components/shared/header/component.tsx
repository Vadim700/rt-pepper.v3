import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from '../container/component';
import { Profile } from '../profile/component';
import { Topic } from '../topic/component';
import { Switch } from '@/components/ui';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header
      className={cn(
        'flex py-8 justify-between items-center font-bold text-3xl',
        className,
      )}
    >
      <Container className={cn('flex items-center justify-between gap-4')}>
        <Topic />
        <Switch className={cn('ml-auto')} />
        <Profile />
      </Container>
    </header>
  );
};
