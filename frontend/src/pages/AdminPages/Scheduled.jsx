//Pickup history if they are completed

import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar'
import { FaClipboardCheck } from "react-icons/fa";


const Scheduled = () => {
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
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests:', err.message);
    }
  };

  const handleMarkCompleted = async (pickupId, staffId) => {
  try {
    await axios.put(`${BE_URL}/api/pickup/pickups/${pickupId}/complete`, {
      staffId: staffId
    });
  } catch (err) {
    console.error(err);
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
     <div className="overflow-x-auto rounded-lg shadow mx-auto max-w-6xl">
          <table className="min-w-full bg-white border border-gray-200">
           <thead className="bg-gray-100 text-gray-700 text-center">
           <tr>
             <th className="px-4 py-2">User</th>
             <th className="px-4 py-2">Waste Type</th>
             <th className="px-4 py-2">Date</th>
             <th className="px-4 py-2">Address</th>
             <th className="px-4 py-2">Status</th>
             <th className="px-4 py-2">Upload Image</th>
             <th className="px-4 py-2">Assigned Staff</th>
             <th className="px-4 py-2">Mark as Completed</th>
             </tr>
           </thead>
            <tbody>
              {requests.filter((req) => req.status === 'scheduled').map((req) => (
                <tr key={req._id} className="border-t border-gray-200 hover:bg-gray-50">
                 <td className="px-4 py-2 text-center">
                    {req.user?.name} <br /> <span className="text-sm text-gray-500">{req.user?.email}</span>
                  </td>
                <td className="px-4 py-2 text-center">{req.wasteType}</td>
               <td className="px-4 py-2 text-center">{new Date(req.updatedAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-center">{req.address}</td>
                 <td className="px-4 py-2 text-center text-blue">{req.status}</td>
                 <td className="px-4 py-2 text-center">
                   {req.imageUrl && (
                     <img
                       src={
                         req.imageUrl.startsWith("http")
                           ? req.imageUrl
                           : `${BE_URL}${req.imageUrl}`
                       }
                       alt="Uploaded"
                       className="mt-2 w-32 h-32 object-cover rounded cursor-pointer"
                       onClick={() => setPreviewImage(req.imageUrl.startsWith("http") ? req.imageUrl : `${BE_URL}${req.imageUrl}`)}
                     />
                   )}
                   </td>
                 <td className="px-4 py-2 text-center">
                    {req.isAssigned ? (
                      <>
                        {req.staff.name} <br />
                        <span className="text-sm text-gray-500">{req.staff.phone}</span>
                      </>
                    ) : (
                      <span className="text-red-500">Not Assigned</span>
                    )}
                  </td>
                  <td>{req.status === 'scheduled' && (
                  <button
                    onClick={() => handleMarkCompleted(req._id, req.staff._id)}
                 
                  >
                   <FaClipboardCheck color='green' size={30}/>
                  </button>
                )}</td>
                
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

export default Scheduled;
