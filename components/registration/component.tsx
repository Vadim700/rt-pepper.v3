'use client';
import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function DisableElevation() {
  const session = useSession();

  return (
    <>
      {session.data ? (
        <p>Exit</p>
      ) : (
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled button group"
        >
          <Button>
            <Link href={'/'}>Sign in</Link>
          </Button>
          <Button>
            <Link href={'/'}>Sign up</Link>
          </Button>
        </ButtonGroup>
      )}
    </>
  );
}
