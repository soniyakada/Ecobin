import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <ul className="flex gap-6 text-sm">
          <li>
            <Link
              to="/admin/pickup-requests"
              className="hover:text-yellow-300 transition duration-200"
            >
              View All Pickup Requests
            </Link>
          </li>
          <li>
            <Link
              to="/admin/create-staff"
              className="hover:text-yellow-300 transition duration-200"
            >
              Create Staff
            </Link>
          </li>
          <li>
            <Link
              to="/admin/all-staff"
              className="hover:text-yellow-300 transition duration-200"
            >
              All Staff
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
