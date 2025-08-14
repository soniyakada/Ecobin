import React from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from '../../components/UserNavbar';

const UserHome = () => {
  return (
    <>
    <UserNavbar/>
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <section className="text-center py-20 bg-green-100 shadow-inner">
        <h1 className="text-4xl font-bold text-green-800">Welcome to Ecobin ♻️</h1>
        <p className="text-lg mt-4 text-green-700">Recycle smart. Live green. Track your waste pickups with ease.</p>
        <Link to="/user/request-pickup">
          <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
            Create Pickup Request
          </button>
        </Link>
      </section>

      {/* Features Section */}
     <section className="grid md:grid-cols-3 gap-8 p-10 text-center">
  <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
    {/* Pickup Icon */}
    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
      </svg>
    </div>
    <h2 className="text-xl font-semibold text-green-800">Easy Pickup Request</h2>
    <p className="text-gray-600 mt-2">Submit your pickup request for dry or wet waste in seconds.</p>
  </div>

  <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
    {/* Track Icon */}
    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>
    <h2 className="text-xl font-semibold text-green-800">Track Pickup Status</h2>
    <p className="text-gray-600 mt-2">Get real-time updates on your scheduled pickups.</p>
  </div>

  <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
    {/* Eco Points Icon */}
    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>
    <h2 className="text-xl font-semibold text-green-800">Earn Eco Points</h2>
    <p className="text-gray-600 mt-2">Earn rewards for every successful pickup. Contribute to a greener planet.</p>
  </div>
</section>

      {/* CTA Section */}
      <section className="text-center bg-green-200 py-12">
        <h2 className="text-2xl font-bold text-green-900">Let’s make Earth cleaner together 🌍</h2>
        <p className="text-green-700 mt-2">Your contribution matters. Schedule your next pickup now!</p>
        <Link to="/user/request-pickup">
          <button className="mt-6 px-5 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
            Schedule Pickup
          </button>
        </Link>
      </section>
    </div>
    </>
  );
};

export default UserHome;
