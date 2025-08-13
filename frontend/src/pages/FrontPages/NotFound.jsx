import React from 'react';
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const handleGoHome = () => {
    // Navigate to home page
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text animate-pulse">
            404
          </div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-bounce opacity-80">
            <AlertTriangle className="w-8 h-8 text-white m-4" />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h1>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoHome}
              className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5 group-hover:animate-pulse" />
              <span>Go Home</span>
            </button>
            
            <button
              onClick={handleGoBack}
              className="group flex items-center justify-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5 group-hover:animate-bounce" />
              <span>Go Back</span>
            </button>
          </div>
        </div>

        {/* Fun Floating Elements */}
        <div className="relative">
          <div className="absolute -top-20 -left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-ping"></div>

          <div className="absolute -bottom-10 left-1/2 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-bounce"></div>
        </div>

        {/* Footer Message */}
        <p className="text-gray-500 text-sm mt-8">
          Lost? Don't worry, it happens to the best of us! 🌟
        </p>
      </div>
    </div>
  );
};

export default NotFound;