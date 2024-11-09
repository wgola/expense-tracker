import type { Metadata } from 'next';
import '../../public/styles/globals.css';
import SessionWrapper from './providers/SessionProvider';

export const metadata: Metadata = {
  title: 'Expense Tracker',
  description: 'Track your expenses with ease.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
    </SessionWrapper>
  );
}
