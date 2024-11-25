'use client';

import federatedLogout from '@/utils/federatedLogout';
import { useCallback } from 'react';

export default function Logout() {
  const signOutFromKeycloak = useCallback(() => federatedLogout(), []);

  return (
    <button onClick={signOutFromKeycloak} className="btn btn-primary w-full">
      Signout
    </button>
  );
}
