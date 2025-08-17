//Pickup history if they are completed

import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar'
import { FaClipboardCheck } from "react-icons/fa";
import Swal from "sweetalert2";


const Scheduled = () => {
  const [requests, setRequests] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(true); // loader state
  const BE_URL = import.meta.env.VITE_BE_URL;

   useEffect(() => {
    fetchPickupRequests();
  }, []);

  const fetchPickupRequests = async () => {
    try {
        setLoading(true); // start loader
      const res = await axios.get(`${BE_URL}/api/pickup/all`, {
        withCredentials: true,
      });
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests:', err.message);
    }finally {
      setLoading(false); // stop loader
    }
  };

  const handleMarkCompleted = async (pickupId, staffId) => {
  try {
    await axios.put(`${BE_URL}/api/pickup/pickups/${pickupId}/complete`, {
      staffId: staffId
    });
    Swal.fire({
      icon: "success",
      title: "Pickup Completed!",
      text: "The pickup has been marked as completed successfully.",
      showConfirmButton: false,
      timer: 2000,
    });

    // Refresh list
    fetchPickupRequests();
  } catch (err) {
    console.error(err);
  }
};

  return (
    <>
    <AdminNavbar/>
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard - Pickup Requests</h1>

    
    <div className="overflow-x-auto rounded-lg shadow mx-auto max-w-6xl">
  <table className="min-w-full bg-white border border-gray-200">
    <thead className="bg-gray-100 text-gray-700 text-center">
      <tr>
        <th className="px-4 py-2 text-center">User</th>
        <th className="px-4 py-2 text-center">Waste Type</th>
        <th className="px-4 py-2 text-center">Date</th>
        <th className="px-4 py-2 text-center">Address</th>
        <th className="px-4 py-2 text-center">Status</th>
        <th className="px-4 py-2 text-center">Upload Image</th>
        <th className="px-4 py-2 text-center">Assigned Staff</th>
        <th className="px-4 py-2 text-center">Mark as Completed</th>
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <tr>
          <td colSpan="8" className="text-center py-6">
            <div className="flex justify-center items-center space-x-2">
              <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              <span className="text-gray-600">Loading...</span>
            </div>
          </td>
        </tr>
      ) : requests.filter((req) => req.status === "scheduled").length === 0 ? (
        <tr>
          <td colSpan="8" className="text-center py-6 text-gray-500">
            No scheduled pickup requests found.
          </td>
        </tr>
      ) : (
        requests
          .filter((req) => req.status === "scheduled")
          .map((req) => (
            <tr
              key={req._id}
              className="border-t border-gray-200 hover:bg-gray-50 text-center"
            >
              <td className="px-4 py-2">
                <span className="font-medium">{req.user?.name}</span> <br />
                <span className="text-sm text-gray-500">{req.user?.email}</span>
              </td>
              <td className="px-4 py-2">{req.wasteType}</td>
              <td className="px-4 py-2">
                {new Date(req.updatedAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{req.address}</td>
              <td className="px-4 py-2">
                <span className="px-2 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-600">
                  {req.status}
                </span>
              </td>
              <td className="px-4 py-2">
                {req.imageUrl && (
                  <img
                    src={
                      req.imageUrl.startsWith("http")
                        ? req.imageUrl
                        : `${BE_URL}${req.imageUrl}`
                    }
                    alt="Uploaded"
                    className="mt-2 w-28 h-28 object-cover rounded cursor-pointer mx-auto"
                    onClick={() =>
                      setPreviewImage(
                        req.imageUrl.startsWith("http")
                          ? req.imageUrl
                          : `${BE_URL}${req.imageUrl}`
                      )
                    }
                  />
                )}
              </td>
              <td className="px-4 py-2">
                {req.isAssigned ? (
                  <>
                    <span className="font-medium">{req.staff.name}</span> <br />
                    <span className="text-sm text-gray-500">
                      {req.staff.phone}
                    </span>
                  </>
                ) : (
                  <span className="text-red-500 font-medium">Not Assigned</span>
                )}
              </td>
              <td className="px-4 py-2">
                {req.status === "scheduled" && (
                  <button
                    onClick={() => handleMarkCompleted(req._id, req.staff._id)}
                    className="flex justify-center mx-auto"
                  >
                    <FaClipboardCheck color="green" size={28} />
                  </button>
                )}
              </td>
            </tr>
          ))
      )}
    </tbody>
  </table>
</div>

      

     
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
