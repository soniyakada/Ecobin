import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AssignPickup from './AssignPickup';
import AdminNavbar from '../../components/AdminNavbar'
import { MdOutlineAssignment } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const BE_URL = import.meta.env.VITE_BE_URL;

const AllPickup = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [showAssign, setShowAssign] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Debug: Check BE_URL value
    console.log('BE_URL from env:', BE_URL);
    console.log('All env vars:', import.meta.env);
    
    fetchPickupRequests();
  }, []);

  // Helper function to construct and validate URLs
  const buildApiUrl = (endpoint) => {
    // Provide fallback if BE_URL is not set
    const baseUrl = BE_URL || 'http://localhost:5000/';
    
    // Ensure baseUrl ends with a slash
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    
    // Remove leading slash from endpoint if present
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    
    const fullUrl = `${normalizedBaseUrl}${normalizedEndpoint}`;
    
    console.log('Built URL:', fullUrl);
    
    // Validate URL format
    try {
      new URL(fullUrl);
      return fullUrl;
    } catch (error) {
      console.error('Invalid URL constructed:', fullUrl);
      throw new Error(`Invalid URL: ${fullUrl}`);
    }
  };

  // Helper function to construct image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
    
    // Use the same base URL logic
    const baseUrl = BE_URL || 'http://localhost:5000/';
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    
    return `${normalizedBaseUrl}${imageUrl}`;
  };

  const fetchPickupRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = buildApiUrl('api/pickup/all');
      
      const res = await axios.get(apiUrl, {
        withCredentials: true,
      });
      
      console.log("Response:", res);
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
      setError(`Failed to fetch pickup requests: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignClick = (requestId) => {
    setSelectedRequestId(requestId);
    setShowAssign(true);
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pickup request?")) return;

    try {
      const apiUrl = buildApiUrl(`api/pickup/pickup/${id}`);
      
      await axios.delete(apiUrl, {
        withCredentials: true,
      });
      
      alert('Deleted successfully');
      fetchPickupRequests();
    } catch (error) {
      console.error("Delete failed", error);
      alert(`Something went wrong while deleting: ${error.message}`);
    }
  };

  const handleImageClick = (imageUrl) => {
    const fullImageUrl = getImageUrl(imageUrl);
    setPreviewImage(fullImageUrl);
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">Loading pickup requests...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminNavbar />
        <div className="p-6 max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600 mb-2">{error}</p>
            <div className="text-sm text-gray-600 mb-4">
              <p><strong>Debug Info:</strong></p>
              <p>BE_URL: {BE_URL || 'undefined'}</p>
              <p>Environment: {import.meta.env.MODE}</p>
            </div>
            <button 
              onClick={fetchPickupRequests}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Admin Dashboard - Pickup Requests</h1>

        {requests.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No pickup requests found.</p>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto rounded-lg shadow">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">User</th>
                    <th className="px-4 py-2 text-left">Waste Type</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Address</th>
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Assigned Staff</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.filter((req) => req.status === 'pending').map((req) => (
                    <tr key={req._id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2">
                        {req.user?.name || 'Unknown'} <br /> 
                        <span className="text-sm text-gray-500">{req.user?.email || 'N/A'}</span>
                      </td>
                      <td className="px-4 py-2">{req.wasteType}</td>
                      <td className="px-4 py-2">{new Date(req.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{req.address}</td>
                     
                      <td className="px-4 py-2">
                        {req.imageUrl ? (
                          <img
                            src={getImageUrl(req.imageUrl)}
                            alt="Waste pickup request"
                            className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleImageClick(req.imageUrl)}
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">No image</span>
                        )}
                      </td>
                      
                      <td className="px-4 py-2">
                        {req.isAssigned ? ( 
                          <>
                            {req.staff?.name || 'Unknown'} <br />
                            <span className="text-sm text-gray-500">{req.staff?.phone || 'N/A'}</span>
                          </>
                        ) : (
                          <span className="text-red-500">Not Assigned</span>
                        )}
                      </td>
                      
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAssignClick(req._id)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Assign staff"
                            aria-label="Assign staff to this request"
                          >
                            <MdOutlineAssignment color='green' size={24} />
                          </button>
                          <button 
                            onClick={() => handleDelete(req._id)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Delete request"
                            aria-label="Delete this pickup request"
                          >
                            <MdDelete color='red' size={24}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {requests.filter((req) => req.status === 'pending').map((req) => (
                <div key={req._id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                  {/* Header with User Info and Actions */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{req.user?.name || 'Unknown'}</h3>
                      <p className="text-sm text-gray-500">{req.user?.email || 'N/A'}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleAssignClick(req._id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="Assign staff"
                        aria-label="Assign staff to this request"
                      >
                        <MdOutlineAssignment color='green' size={24} />
                      </button>
                      <button 
                        onClick={() => handleDelete(req._id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="Delete request"
                        aria-label="Delete this pickup request"
                      >
                        <MdDelete color='red' size={24}/>
                      </button>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Left Column */}
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</span>
                        <p className="text-sm text-gray-900">{req.wasteType}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date</span>
                        <p className="text-sm text-gray-900">{new Date(req.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Address</span>
                        <p className="text-sm text-gray-900 break-words">{req.address}</p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Staff</span>
                        {req.isAssigned ? (
                          <div>
                            <p className="text-sm text-gray-900">{req.staff?.name || 'Unknown'}</p>
                            <p className="text-xs text-gray-500">{req.staff?.phone || 'N/A'}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-red-500">Not Assigned</p>
                        )}
                      </div>
                      
                      {/* Image */}
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Image</span>
                        {req.imageUrl ? (
                          <img
                            src={getImageUrl(req.imageUrl)}
                            alt="Waste pickup request"
                            className="mt-1 w-20 h-20 sm:w-24 sm:h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleImageClick(req.imageUrl)}
                          />
                        ) : (
                          <p className="text-sm text-gray-400">No image</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {showAssign && (
          <AssignPickup
            requestId={selectedRequestId}
            onClose={() => {
              setShowAssign(false);
              fetchPickupRequests();
            }}
          />
        )}
      </div>
      
      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative w-full max-w-4xl max-h-full">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-2 -right-2 sm:top-2 sm:right-2 text-white text-lg sm:text-xl bg-black bg-opacity-70 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-opacity-90 transition-colors"
              aria-label="Close preview"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AllPickup;