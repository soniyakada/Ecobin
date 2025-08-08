import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserNavbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const BE_URL = import.meta.env.VITE_BE_URL;

    const onHandleLogout = async () => {
    try {
      await axios.post(`${BE_URL}/api/auth/logout`, {}, { withCredentials: true });
      // setUser(null);
      navigate("/signin");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };


  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold">
          EcoBin
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/user/home" className="hover:underline">Home</Link>
          <Link to="/user/request-pickup" className="hover:underline">Request Pickup</Link>
          <Link to="/user/my-pickups" className="hover:underline">My Pickups</Link>
          <Link to="/user/contactus" className="hover:underline">Contact us</Link>
        </div>

        {/* User & Logout */}
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1">
            👤 {user?.name || 'User'}
          </span>

          <button
            onClick={onHandleLogout}
            className="hover:text-red-300 text-white transition duration-200"
            title="Logout"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
