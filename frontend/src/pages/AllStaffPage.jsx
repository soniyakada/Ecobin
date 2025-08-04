import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllStaffPage = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/staff/allstaff'); // adjust URL if needed
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
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Assigned Zone</th>
                <th className="py-2 px-4">Availability</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff._id} className="border-t">
                  <td className="py-2 px-4">{staff.name}</td>
                  <td className="py-2 px-4">{staff.phone}</td>
                  <td className="py-2 px-4">{staff.assignedZone}</td>
                  <td className="py-2 px-4">
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
  );
};

export default AllStaffPage;
