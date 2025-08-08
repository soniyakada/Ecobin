import React from 'react';
import { Leaf, MapPin, Bell, Recycle } from 'lucide-react';
import Navbar from '../../components/Navbar';

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl mb-8 shadow-lg">
            <Leaf className="w-12 h-12 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Welcome to EcoBin
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            EcoBin helps you request garbage pickup easily, track the status, and keep your area clean. 
            Join us in making the world greener, one pickup at a time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a 
              href="/signup" 
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started
            </a>
            <a 
              href="/signin" 
              className="bg-white border-2 border-emerald-600 text-emerald-600 font-semibold py-3 px-8 rounded-xl hover:bg-emerald-50 transition-all duration-200 shadow-md"
            >
              Already a User?
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Simple & Effective
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Request</h3>
              <p className="text-gray-600">Request garbage pickup with just a few clicks</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl mb-4">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Status</h3>
              <p className="text-gray-600">Monitor your pickup request in real-time</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl mb-4">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Stay Green</h3>
              <p className="text-gray-600">Contribute to a cleaner environment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Join Our Community</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  10K+
                </div>
                <div className="text-gray-600">Happy Users</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-gray-600">Pickups Done</div>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  25+
                </div>
                <div className="text-gray-600">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-700">EcoBin</span>
          </div>
          <p className="text-gray-600 mb-6">Making waste management simple and sustainable</p>
          
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="/about" className="hover:text-emerald-600 transition-colors">About</a>
            <a href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</a>
            <a href="/contact" className="hover:text-emerald-600 transition-colors">Contact</a>
          </div>
          
          <div className="mt-8 text-gray-500 text-sm">
            © 2024 EcoBin. Making the world cleaner, one pickup at a time.
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Home;