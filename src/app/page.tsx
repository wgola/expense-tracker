import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import LogIn from '@/components/logIn';

export default async function Main() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/home');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-4">
        <Image src={'/images/app-logo.svg'} alt="App Logo" width={100} height={100} />
      </div>
      <h1 className="text-3xl font-bold mb-2 text-center">Expense Tracker</h1>
      <p className="text-center text-gray-600 mb-6">
        Track your expenses effortlessly and save more!
      </p>
      <div className="flex flex-col space-y-2 w-full max-w-xs">
        <LogIn />
      </div>
    </div>
  );
}
