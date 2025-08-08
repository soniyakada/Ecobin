//Pickup history if they are completed

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar'
import { MdDelete } from "react-icons/md";

const History = () => {
  const [requests, setRequests] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const BE_URL = import.meta.env.VITE_BE_URL;

  useEffect(() => {
    fetchPickupRequests();
  }, []);

  const fetchPickupRequests = async () => {
    try {
      const res = await axios.get(`${BE_URL}/api/pickup/all`, {
        withCredentials: true,
      });
      console.log("res", res);
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests:', err.message);
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this pickup request?")) return;

  try {
    await axios.delete(`${BE_URL}/api/pickup/pickup/${id}`);
    alert('Deleted successfully');
    fetchPickupRequests(); // Refresh the list
  } catch (error) {
    console.error("Delete failed", error);
    alert('Something went wrong while deleting');
  }
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
                <th className="px-4 py-2 text-left">Upload Image</th>
                <th className="px-4 py-2 text-left">Assigned Staff</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.filter((req) => req.status === 'completed').map((req) => (
                <tr key={req._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {req.user?.name} <br /> <span className="text-sm text-gray-500">{req.user?.email}</span>
                  </td>
                  <td className="px-4 py-2">{req.wasteType}</td>
                  <td className="px-4 py-2">{new Date(req.updatedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{req.address}</td>
                  <td className="px-4 py-2 text-blue-600">{req.status}</td>
                   <td>
                   {req.imageUrl && (
                     <img
                       src={
                         req.imageUrl.startsWith("http")
                           ? req.imageUrl
                           : `http://localhost:5000${req.imageUrl}`
                       }
                       alt="Uploaded"
                       className="mt-2 w-32 h-32 object-cover rounded cursor-pointer"
                       onClick={() => setPreviewImage(req.imageUrl.startsWith("http") ? req.imageUrl : `http://localhost:5000${req.imageUrl}`)}
                     />
                   )}
                   </td>
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
                  <td><button onClick={() => handleDelete(req._id)}><MdDelete color='red' size={30}/></button></td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

     
    </div>
     {previewImage && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="relative">
      <img
        src={previewImage}
        alt="Preview"
        className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
      />
      <button
        onClick={() => setPreviewImage(null)}
        className="absolute top-2 right-2 text-white text-xl bg-black rounded-full w-8 h-8 flex items-center justify-center"
      >
        ✕
      </button>
    </div>
  </div>
)}
    </>
  );
};

export default History;
