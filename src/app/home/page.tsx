'use client';

import Navbar from '@/components/navbar';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div>
      <Navbar />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'unauthenticated' && <></>}
      {status === 'authenticated' && (
        <h1 className="text-4xl font-bold text-gray-800 mt-8">Hello, {session?.user?.name}!</h1>
      )}
    </div>
  );
}
