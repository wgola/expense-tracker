import type { Metadata } from 'next';
import '../../public/styles/globals.css';
import SessionWrapper from '@/providers/sessionProvider';
import SessionGuard from '@/components/sessionGuard';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Expense Tracker',
  description: 'Track your expenses with ease.'
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionWrapper>
          <SessionGuard>{children}</SessionGuard>
        </SessionWrapper>
      </body>
    </html>
  );
}
