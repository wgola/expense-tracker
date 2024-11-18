import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { PropsWithChildren } from 'react';

export default async function HomeLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (session) {
    return <div>{children}</div>;
  }
}
