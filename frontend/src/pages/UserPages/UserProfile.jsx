import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-semibold text-white">
            {user?.name?.charAt(0)}
          </div>
          <h2 className="mt-4 text-2xl font-semibold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Details</h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p><span className="font-semibold">Email:</span> {user?.email}</p>
            <p><span className="font-semibold">Phone:</span> {user?.phone || 'N/A'}</p>
            <p><span className="font-semibold">Address:</span> {user?.address || 'N/A'}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate('/edit-profile')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
