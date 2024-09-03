import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from '../container/component';
import { MyIcon } from '@/components/myIcon/MyIcon';
import { CircleUserRound } from 'lucide-react';
import { Select } from '@/components/ui/select';
import { Profile } from '../profile/component';

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
        Confident Pepper
        <Profile />
      </Container>
    </header>
  );
};
