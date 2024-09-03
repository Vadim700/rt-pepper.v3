import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('w-full max-w-[1280px] px-5', className)}>
      {children}
    </div>
  );
};
