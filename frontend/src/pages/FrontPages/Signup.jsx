import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, MapPin, Leaf } from "lucide-react";
import Navbar from "../../components/Navbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Your axios call here
      // const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      // alert(res.data.msg);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Registration successful!");
    } catch (err) {
      alert("Error signing up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Google OAuth2 integration - redirect to your backend OAuth endpoint
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <>
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background decoration */}
    
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl mb-4 shadow-lg">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Join Ecobin
            </h1>
            <p className="text-gray-600 mt-2">Create your eco-friendly account</p>
          </div>

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 mb-6 shadow-sm group"
          >
            <svg className="w-5 h-5 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">or sign up with email</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white ${
                    errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
                  }`}
                  required
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm ml-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white ${
                    errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
                  }`}
                  required
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm ml-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white ${
                    errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm ml-1">{errors.password}</p>}
            </div>

            {/* Address Field */}
            <div className="space-y-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="address"
                  placeholder="Your Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white ${
                    errors.address ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
                  }`}
                  required
                />
              </div>
              {errors.address && <p className="text-red-500 text-sm ml-1">{errors.address}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/signin" className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors">
                Sign In
              </a>
            </p>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-emerald-600 hover:underline">Terms of Service</a> and{" "}
            <a href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
       </>
  );
};

export default Signup;