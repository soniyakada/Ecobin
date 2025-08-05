import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <ul className="flex gap-6 text-sm">
          <li>
            <NavLink
              to="/admin/pickup-requests"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400"
                  : "hover:text-yellow-300 transition duration-200"
              }
            >
              Pickup Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/create-staff"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400"
                  : "hover:text-yellow-300 transition duration-200"
              }
            >
              Create Staff
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/all-staff"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400"
                  : "hover:text-yellow-300 transition duration-200"
              }
            >
              All Staff
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/history"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400"
                  : "hover:text-yellow-300 transition duration-200"
              }
            >
              History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/scheduled"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400"
                  : "hover:text-yellow-300 transition duration-200"
              }
            >
              Scheduled
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
