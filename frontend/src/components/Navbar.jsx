import React, { useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    // Navigate to home
    window.location.href = '/';
  };

  const handleSignIn = () => {
    window.location.href = '/signin';
  };

  const handleSignUp = () => {
    window.location.href = '/signup';
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
            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSignIn}
                className="text-emerald-600 hover:text-emerald-700 font-semibold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all duration-200"
              >
                Sign In
              </button>
              <button
                onClick={handleSignUp}
                className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Sign Up
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
              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleSignIn();
                    setIsMenuOpen(false);
                  }}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold py-2 px-4 rounded-lg hover:bg-emerald-50 transition-all duration-200 text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    handleSignUp();
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg text-center"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;