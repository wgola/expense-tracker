import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-4">
        <Image src={'/images/app-logo.svg'} alt="App Logo" width={100} height={100} />
      </div>
      <h1 className="text-3xl font-bold mb-2">Expense Tracker</h1>
      <p className="text-center text-gray-600 mb-6">
        Track your expenses effortlessly and save more!
      </p>
      <div className="flex flex-col space-y-2 w-full max-w-xs">
        <button className="btn btn-primary w-full">Login</button>
        <div className="divider divider-accent">OR</div>
        <button className="btn btn-secondary w-full">Sign Up</button>
      </div>
    </div>
  );
}
