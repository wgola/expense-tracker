'use client';

import federatedLogout from '@/utils/federatedLogout';
import { useCallback, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

export default function LogOut() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = useCallback(() => setDropdownOpen(!dropdownOpen), []);

  const signOutFromKeycloak = useCallback(() => federatedLogout(), []);

  return (
    <>
      <button onClick={toggleDropdown}>
        <IoMdArrowDropdown size={20} />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 w-24">
          <button onClick={signOutFromKeycloak} className="btn btn-primary w-full">
            Sign out
          </button>
        </div>
      )}
    </>
  );
}
