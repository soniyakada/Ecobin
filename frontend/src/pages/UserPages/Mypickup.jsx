import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar';
import { Package, MapPin, Calendar, Image, Truck, Clock, CheckCircle, XCircle } from 'lucide-react';

const Mypickups = () => {
  
  const navigate = useNavigate();
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  const BE_URL = import.meta.env.VITE_BE_URL;
      
  const fetchUserPickups = async () => {
      try {
        const res = await axios.get(`${BE_URL}/api/pickup/my-requests`, {
          withCredentials: true,
        });
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
    const base = 'px-2 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1';
    switch (status) {
      case 'pending':
        return `${base} bg-amber-50 text-amber-700 border border-amber-200`;
      case 'assigned':
        return `${base} bg-blue-50 text-blue-700 border border-blue-200`;
      case 'completed':
        return `${base} bg-emerald-50 text-emerald-700 border border-emerald-200`;
      case 'cancelled':
        return `${base} bg-red-50 text-red-700 border border-red-200`;
      default:
        return `${base} bg-gray-50 text-gray-700 border border-gray-200`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'assigned':
        return <Truck className="w-3 h-3" />;
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      case 'cancelled':
        return <XCircle className="w-3 h-3" />;
      default:
        return <Package className="w-3 h-3" />;
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg mb-6">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
              My Pickup Requests
            </h1>
            <p className="text-gray-600 text-lg">
              Track and manage all your waste pickup requests
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 text-lg">Loading your pickup requests...</p>
            </div>
          ) : pickups.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Pickup Requests Yet</h3>
              <p className="text-gray-600 mb-6">You haven't made any pickup requests yet. Start by creating your first request!</p>
              <button className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg" onClick={()=>{
                 navigate("/user/request-pickup")
              }}>
                Request Pickup
              </button>
            </div>
          ) : (
            <>
              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Requests</p>
                      <p className="text-2xl font-bold text-gray-800">{pickups.length}</p>
                    </div>
                    <Package className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Pending</p>
                      <p className="text-2xl font-bold text-amber-600">{pickups.filter(p => p.status === 'pending').length}</p>
                    </div>
                    <Clock className="w-8 h-8 text-amber-600" />
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Assigned</p>
                      <p className="text-2xl font-bold text-blue-600">{pickups.filter(p => p.status === 'assigned').length}</p>
                    </div>
                    <Truck className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Completed</p>
                      <p className="text-2xl font-bold text-emerald-600">{pickups.filter(p => p.status === 'completed').length}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Pickup Cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {pickups.map((pickup) => (
                  <div
                    key={pickup._id}
                    className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        Pickup #{pickup._id.slice(-5)}
                      </h3>
                      <div className={getStatusBadge(pickup.status)}>
                        {getStatusIcon(pickup.status)}
                        <span className="capitalize">{pickup.status}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-800 text-xs">Address</p>
                          <p className="text-gray-600 text-sm truncate" title={pickup.address}>{pickup.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Package className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-800 text-xs">Waste Type</p>
                          <p className="text-gray-600 text-sm">{pickup.wasteType || 'N/A'}</p>
                        </div>
                      </div>

                      

                      <div className="flex items-start space-x-2">
                        <Calendar className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-800 text-xs">Requested On</p>
                          <p className="text-gray-600 text-sm">{new Date(pickup.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Image */}
                    {pickup.imageUrl && (
                      <div className="mt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Image className="w-4 h-4 text-emerald-600" />
                          <p className="font-semibold text-gray-800 text-xs">Attached Image</p>
                        </div>
                        <img
                          src={`${BE_URL}${pickup.imageUrl}`}
                          alt="Pickup"
                          className="w-full h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Mypickups;