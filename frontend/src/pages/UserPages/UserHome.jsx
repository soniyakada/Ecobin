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
          <img src="/pickup.png" alt="Pickup" className="w-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-green-800">Easy Pickup Request</h2>
          <p className="text-gray-600 mt-2">Submit your pickup request for dry or wet waste in seconds.</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <img src="/track.png" alt="Track" className="w-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-green-800">Track Pickup Status</h2>
          <p className="text-gray-600 mt-2">Get real-time updates on your scheduled pickups.</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <img src="/ecopoints.png" alt="Eco Points" className="w-16 mx-auto mb-4" />
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
