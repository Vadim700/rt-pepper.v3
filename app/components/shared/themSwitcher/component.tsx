'use client';

import { Toggle } from '@/app/components/ui';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

interface LanguageSwitcherProps {
  className: string;
}

export const ThemeSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
}) => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlerClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.dataset.state === 'off'
      ? setTheme('light')
      : setTheme('dark');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className={cn('', className)}>
      <Toggle aria-label="Toggle bold" onClick={handlerClick}>
        {theme === 'dark' ? <Sun /> : <Moon />}
      </Toggle>
    </div>
  );
};
