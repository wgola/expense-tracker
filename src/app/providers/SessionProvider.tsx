'use client';

import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';

const SessionWrapper = ({ children }: PropsWithChildren) => {
  return <SessionProvider refetchInterval={4 * 60}>{children}</SessionProvider>;
};

export default SessionWrapper;
