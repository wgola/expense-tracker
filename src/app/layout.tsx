import type { Metadata } from 'next';
import '../../public/styles/globals.css';
import SessionWrapper from './providers/SessionProvider';
import SessionGuard from '@/components/sessionGuard';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Expense Tracker',
  description: 'Track your expenses with ease.'
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionWrapper>
          <SessionGuard>{children}</SessionGuard>
        </SessionWrapper>
        <Toaster />
      </body>
    </html>
  );
}
