import LogOut from '@/components/logOut';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-secondary text-white">
      <div>
        <Link href="/home">Expense Tracker</Link>
      </div>
      <div className="relative">
        <LogOut />
      </div>
    </nav>
  );
}
