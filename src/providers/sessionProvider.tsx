'use client';

import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';

export default function SessionWrapper({ children }: Readonly<PropsWithChildren>) {
  return <SessionProvider refetchInterval={4 * 60}>{children}</SessionProvider>;
}
