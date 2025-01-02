'use client';

import { Session } from 'inspector/promises';
import { signIn, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

export default function SessionGuard({ children }: { children: ReactNode }) {
  const { data } = useSession();

  useEffect(() => {
    if ((data as unknown as Session & { error: string })?.error === 'RefreshAccessTokenError') {
      signIn('keycloak');
    }
  }, [data]);

  return children;
}
