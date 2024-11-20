'use client';

import Logout from '@/components/logout';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  //   const session = await getServerSession(authOptions);
  if (status === 'loading') {
    return <p>Loading...</p>;
  } else if (status === 'unauthenticated') {
    return <p>Access denied. You are not authorized to view this page.</p>;
  } else {
    return (
      <div>
        <h1>Hello, {session?.user?.name || 'User'}!</h1>
        <Logout />
      </div>
    );
  }
}
