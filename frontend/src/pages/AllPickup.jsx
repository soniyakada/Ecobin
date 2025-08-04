import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AssignPickup from './AssignPickup';
import AdminNavbar from '../components/AdminNavbar'

const AllPickup = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [showAssign, setShowAssign] = useState(false);

  useEffect(() => {
    fetchPickupRequests();
  }, []);

  const fetchPickupRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/pickup/all', {
        withCredentials: true,
      });
      console.log("res", res);
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests:', err.message);
    }
  };

  const handleAssignClick = (requestId) => {
    setSelectedRequestId(requestId);
    setShowAssign(true);
  };
  
  return (
    <>
    <AdminNavbar/>
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard - Pickup Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-600">No pickup requests found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Waste Type</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Assigned Staff</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {req.user?.name} <br /> <span className="text-sm text-gray-500">{req.user?.email}</span>
                  </td>
                  <td className="px-4 py-2">{req.wasteType}</td>
                  <td className="px-4 py-2">{new Date(req.requestedDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{req.address}</td>
                  <td className="px-4 py-2 text-blue-600">{req.status}</td>
                  <td className="px-4 py-2">
                    {req.isAssigned ? (
                      <>
                        {req.staff.name} <br />
                        <span className="text-sm text-gray-500">{req.staff.phone}</span>
                      </>
                    ) : (
                      <span className="text-red-500">Not Assigned</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => handleAssignClick(req._id)}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Uncomment and use when AssignPickup component is ready */}
      {showAssign && (
        <AssignPickup
          requestId={selectedRequestId}
          onClose={() => {
            setShowAssign(false);
            fetchPickupRequests(); // Refresh after assignment
          }}
        />
      )}
    </div>
    </>
  );
};

export default AllPickup;
