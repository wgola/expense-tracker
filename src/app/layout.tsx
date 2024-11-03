import type { Metadata } from 'next';
import '../../public/styles/globals.css';

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
