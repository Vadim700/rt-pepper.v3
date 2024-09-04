import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from '../container/component';
import { Profile } from '../profile/component';
import { Topic } from '../topic/component';

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
      <Container className="flex items-center justify-between">
        <Topic />
        <Profile />
      </Container>
    </header>
  );
};
