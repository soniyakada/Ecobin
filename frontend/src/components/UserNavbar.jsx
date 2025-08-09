import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, User, LogOut } from 'lucide-react';
import axios from 'axios';

const UserNavbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const BE_URL = import.meta.env.VITE_BE_URL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onHandleLogout = async () => {
    try {
      await axios.post(`${BE_URL}/api/auth/logout`, {}, { withCredentials: true });
      // setUser(null);
      navigate("/signin");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const handleLogoClick = () => {
    navigate('/user/home');
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick}>
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              EcoBin
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link 
                to="/user/home" 
                className="text-gray-700 hover:text-emerald-600 font-semibold transition-all duration-200"
              >
                Home
              </Link>
              <Link 
                to="/user/request-pickup" 
                className="text-gray-700 hover:text-emerald-600 font-semibold transition-all duration-200"
              >
                Request Pickup
              </Link>
              <Link 
                to="/user/my-pickups" 
                className="text-gray-700 hover:text-emerald-600 font-semibold transition-all duration-200"
              >
                My Pickups
              </Link>
              <Link 
                to="/user/contactus" 
                className="text-gray-700 hover:text-emerald-600 font-semibold transition-all duration-200"
              >
                Contact us
              </Link>
            </div>

            {/* User & Logout Buttons */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-emerald-600 font-semibold px-4 py-2 rounded-lg bg-emerald-50">
                <User className="w-4 h-4" />
                <span>{user?.name || 'User'}</span>
              </div>
              <button
                onClick={onHandleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Log out
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {/* Mobile Navigation Links */}
              <Link 
                to="/user/home" 
                className="text-gray-700 hover:text-emerald-600 font-semibold py-2 px-4 rounded-lg hover:bg-emerald-50 transition-all duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/user/request-pickup" 
                className="text-gray-700 hover:text-emerald-600 font-semibold py-2 px-4 rounded-lg hover:bg-emerald-50 transition-all duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Request Pickup
              </Link>
              <Link 
                to="/user/my-pickups" 
                className="text-gray-700 hover:text-emerald-600 font-semibold py-2 px-4 rounded-lg hover:bg-emerald-50 transition-all duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                My Pickups
              </Link>
              <Link 
                to="/user/contactus" 
                className="text-gray-700 hover:text-emerald-600 font-semibold py-2 px-4 rounded-lg hover:bg-emerald-50 transition-all duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact us
              </Link>

              {/* Mobile User & Logout Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-emerald-600 hover:text-emerald-700 font-semibold py-2 px-4 rounded-lg hover:bg-emerald-50 transition-all duration-200">
                  <User className="w-4 h-4" />
                  <span>{user?.name || 'User'}</span>
                </div>
                <button
                  onClick={() => {
                    onHandleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg text-center"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;