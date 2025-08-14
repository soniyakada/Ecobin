// src/components/AssignPickup.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const AssignPickup = ({ requestId, onClose }) => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState('');
  const BE_URL = import.meta.env.VITE_BE_URL;

  useEffect(() => {
    fetchAllStaff();
  }, []);

  const fetchAllStaff = async () => {
    try {
      const res = await axios.get(`${BE_URL}/api/staff/allstaff`, {
        withCredentials: true,
      });
      setStaffList(res.data);
    } catch (err) {
      console.error('Failed to fetch staff:', err.message);
    }
  };

  const handleAssign = async () => {
    try {
      await axios.put(
        `${BE_URL}/api/pickup/assign/${requestId}`,
        { staffId: selectedStaff },
        { withCredentials: true }
      );
      onClose();
    } catch (err) {
      console.error('Failed to assign staff:', err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
        <h2 className="text-xl font-bold mb-4">Assign Staff</h2>

        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
        >
          <option value="">Select Staff</option>
          {staffList.map((staff) => (
            <option key={staff._id} value={staff._id}>
              {staff.name} ({staff.phone})
            </option>
          ))}
        </select>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={!selectedStaff}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignPickup;
