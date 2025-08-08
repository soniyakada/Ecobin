import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useAuth } from '../../context/AuthContext.jsx';
import UserNavbar from '../../components/UserNavbar';

const Mypickups = () => {
  // const { user } = useAuth();
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  const BE_URL = import.meta.env.VITE_BE_URL;


    const fetchUserPickups = async () => {
      try {
        const res = await axios.get(`${BE_URL}/api/pickup/my-requests`, {
          withCredentials: true,
        });
        console.log("-0-=-",res.data);
        setPickups(res.data);
      } catch (error) {
        console.error('Error fetching pickups:', error);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
     fetchUserPickups();
  }, []);

  const getStatusBadge = (status) => {
    const base = 'px-3 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case 'pending':
        return `${base} bg-yellow-100 text-yellow-700`;
      case 'assigned':
        return `${base} bg-blue-100 text-blue-700`;
      case 'completed':
        return `${base} bg-green-100 text-green-700`;
      case 'cancelled':
        return `${base} bg-red-100 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold mb-6 text-center">My Pickup Requests</h2>

        {loading ? (
          <div className="text-center text-gray-600">Loading pickups...</div>
        ) : pickups.length === 0 ? (
          <div className="text-center text-gray-500">You haven’t made any pickup requests yet.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {pickups.map((pickup) => (
              <div
                key={pickup._id}
                className="border rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-200 bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">Pickup #{pickup._id.slice(-5)}</h3>
                  <span className={getStatusBadge(pickup.status)}>{pickup.status}</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Address:</strong> {pickup.address}</p>
                  <p><strong>Waste Type:</strong> {pickup.wasteType || 'N/A'}</p>
                  <p><strong>Notes:</strong> {pickup.notes || '—'}</p>
                  <p><strong>Requested On:</strong> {new Date(pickup.createdAt).toLocaleString()}</p>
                </div>

                {pickup.imageUrl && (
                  <img
                    src={`${BE_URL}${pickup.imageUrl}`}
                    alt="Pickup"
                    className="mt-4 w-full h-40 object-cover rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Mypickups;
