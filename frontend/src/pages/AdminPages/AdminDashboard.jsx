import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useAuth } from '../../context/AuthContext.jsx';

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <>
      <AdminNavbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Greeting */}
        <div className="text-2xl font-semibold mb-4">
          Welcome, <span className="text-green-600">{user?.name || "Admin"}</span> 👋
        </div>

        {/* Dashboard summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
            <p className="text-gray-600 text-sm">View and control registered users.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Pickup Requests</h3>
            <p className="text-gray-600 text-sm">Assign staff to pickup requests.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Manage Zones</h3>
            <p className="text-gray-600 text-sm">Add or update pickup zones.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Staff Availability</h3>
            <p className="text-gray-600 text-sm">Check availability of staff and assign work.</p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Reports & Analytics</h3>
            <p className="text-gray-600 text-sm">Download activity reports and track metrics.</p>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Logout</h3>
            <p className="text-gray-600 text-sm">Safely logout from your admin session.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
