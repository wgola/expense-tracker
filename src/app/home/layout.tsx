import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { PropsWithChildren } from 'react';
import Navbar from '@/components/navbar';
import { redirect } from 'next/navigation';

export default async function HomeLayout({ children }: Readonly<PropsWithChildren>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  if (session) {
    return (
      <>
        <Navbar />
        <div className="mb-3 max-w-xs mx-auto lg:max-w-lg">{children}</div>
      </>
    );
  }
}
