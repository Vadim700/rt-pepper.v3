'use client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import React from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
};
