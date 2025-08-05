// src/pages/UserDashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [pickupRequests, setPickupRequests] = useState([]);
  const [formData, setFormData] = useState({
    address: '',
    wasteType: '',
    image: null,
    notes: '',
  });

  const BE_URL = import.meta.env.VITE_BE_URL;

  // Fetch user's pickup requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${BE_URL}/api/pickup/my-requests`, {
          withCredentials: true,
        });
        setPickupRequests(res.data);
      } catch (err) {
        console.error('Error fetching requests:', err);
      }
    };

    fetchRequests();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Submit pickup request
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('address', formData.address);
    data.append('wasteType', formData.wasteType);
    data.append('notes', formData.notes);
    if (formData.image) data.append('image', formData.image);

    try {
      const res = await axios.post(`${BE_URL}/api/pickup/create`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPickupRequests((prev) => [res.data.newRequest, ...prev]);
      setFormData({ address: '', wasteType: '', image: null, notes: '' });
    } catch (err) {
      console.error('Error creating pickup request:', err);
    }
  };

  const cancelRequest = async (id) => {
    // implement cancel API later if backend supports it
    setPickupRequests((prev) =>
      prev.map((r) =>
        r._id === id && r.status === 'pending' ? { ...r, status: 'cancelled' } : r
      )
    );
  };

  return (
    <>
    
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Raise a Pickup Request</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Pickup Address"
            className="border p-2 rounded"
            required
          />
          <select
            name="wasteType"
            value={formData.wasteType}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Waste Type</option>
            <option value="plastic">Plastic</option>
            <option value="organic">Organic</option>
            <option value="e-waste">E-Waste</option>
          </select>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="col-span-1"
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional Notes"
            className="border p-2 rounded col-span-1 md:col-span-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Pickup Request
        </button>
      </form>

      {/* List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-2">Your Pickup Requests</h2>
        {pickupRequests.length === 0 ? (
          <p className="text-gray-500">No pickup requests yet.</p>
        ) : (
          pickupRequests.map((req) => (
            <div key={req._id} className="bg-gray-100 p-4 rounded shadow flex justify-between">
              <div>
                <p><strong>Address:</strong> {req.address}</p>
                <p><strong>Type:</strong> {req.wasteType}</p>
                <p><strong>Status:</strong> <span className="capitalize">{req.status}</span></p>
                {req.notes && <p><strong>Notes:</strong> {req.notes}</p>}
                {req.imageUrl && (
                  <img
                    src={`${BE_URL}${req.imageUrl}`}
                    alt="Uploaded"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                )}
              </div>
              <div className="text-right">
                {req.status === 'pending' && (
                  <button
                    onClick={() => cancelRequest(req._id)}
                    className="text-red-600 hover:underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default UserDashboard;
