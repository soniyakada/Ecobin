import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdLogout, MdMenu, MdClose } from 'react-icons/md';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const BE_URL = import.meta.env.VITE_BE_URL;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const onHandleLogout = async () => {
    try {
      // Build URL properly
      const baseUrl = BE_URL || 'http://localhost:5000/';
      const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const logoutUrl = `${normalizedBaseUrl}api/auth/logout`;
      
      await axios.post(logoutUrl, {}, { withCredentials: true });
      navigate("/signin");
      closeMenu(); // Close mobile menu after logout
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const navItems = [
    { to: "/admin/pickup-requests", label: "Pickup Requests" },
    { to: "/admin/create-staff", label: "Create Staff" },
    { to: "/admin/all-staff", label: "All Staff" },
    { to: "/admin/history", label: "History" },
    { to: "/admin/scheduled", label: "Scheduled" }
  ];

  return (
    <nav className="bg-gray-800 shadow-md text-white relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                    isActive
                      ? "text-yellow-400 bg-gray-700 border-b-2 border-yellow-400"
                      : "text-gray-300 hover:text-yellow-300 hover:bg-gray-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            
            <button
              onClick={onHandleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-gray-700 transition duration-200"
            >
              <MdLogout size={18} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition duration-200 z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <MdClose className="h-6 w-6" />
            ) : (
              <MdMenu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute top-16 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg z-40 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-md text-base font-medium transition duration-200 ${
                    isActive
                      ? "text-yellow-400 bg-gray-700 border-l-4 border-yellow-400"
                      : "text-gray-300 hover:text-yellow-300 hover:bg-gray-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            
            <button
              onClick={onHandleLogout}
              className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-md text-base font-medium text-gray-300 hover:text-red-400 hover:bg-gray-700 transition duration-200"
            >
              <MdLogout size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

export default AdminNavbar;