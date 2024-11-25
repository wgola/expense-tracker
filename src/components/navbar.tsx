import React, { useState } from 'react';
import Logout from '@/components/logout';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="flex justify-between p-4 bg-secondary text-white">
      <div>Expense Tracker</div>
      <div className="relative">
        <button onClick={toggleDropdown}>☰</button>
        {dropdownOpen && (
          <div className="absolute right-0">
            <Logout />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
