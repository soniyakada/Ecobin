import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar';

const AllStaffPage = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const BE_URL = import.meta.env.VITE_BE_URL;

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`${BE_URL}/api/staff/allstaff`); // adjust URL if needed
        setStaffList(response.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <>
    <AdminNavbar/>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">All Pickup Staff</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : staffList.length === 0 ? (
        <p className="text-center">No staff found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-center">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Assigned Zone</th>
                <th className="py-2 px-4">Availability</th>
                
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff._id} className="border-t">
                  <td className="py-2 px-4 text-center">{staff.name}</td>
                  <td className="py-2 px-4  text-center">{staff.phone}</td>
                  <td className="py-2 px-4  text-center">{staff.assignedZone}</td>
                  <td className="py-2 px-4  text-center">
                    {staff.isAvailable ? (
                      <span className="text-green-600 font-medium">Available</span>
                    ) : (
                      <span className="text-red-600 font-medium">Unavailable</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default AllStaffPage;
