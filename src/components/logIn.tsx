'use client';

import { signIn } from 'next-auth/react';
import { useCallback } from 'react';

export default function LogIn() {
  const signInToKeycloak = useCallback(() => signIn('keycloak'), []);

  return (
    <button className="btn btn-primary w-full" onClick={signInToKeycloak}>
      Login or Signup
    </button>
  );
}
