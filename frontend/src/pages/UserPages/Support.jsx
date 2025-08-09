import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../../components/UserNavbar';
import { useAuth } from '../../context/AuthContext';
import { MessageCircle, Send, User, Mail, FileText, MessageSquare } from 'lucide-react';

const Support = () => {
  const { user } = useAuth(); // Get user from context

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const BE_URL = import.meta.env.VITE_BE_URL;

  // Prefill name and email when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post(`${BE_URL}/api/pickup/send-support`, formData, { withCredentials: true });

      alert("✅ Your message has been sent successfully. We'll get back to you soon!");
      setFormData({
        name: user.name || '',
        email: user.email || '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error("Error sending support message:", error);
      alert("❌ Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
              Contact Support
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're here to help! Send us a message and we'll respond as soon as possible.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Developed by <span className="font-semibold text-emerald-600">Soniya Kada</span>
            </div>
          </div>

          {/* Support Form Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-semibold text-sm">
                  <User className="w-4 h-4 mr-2 text-emerald-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  readOnly
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-semibold text-sm">
                  <Mail className="w-4 h-4 mr-2 text-emerald-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                />
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-semibold text-sm">
                  <FileText className="w-4 h-4 mr-2 text-emerald-600" />
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What can we help you with?"
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 hover:border-gray-300"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-semibold text-sm">
                  <MessageSquare className="w-4 h-4 mr-2 text-emerald-600" />
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your issue or question in detail..."
                  className="w-full border border-gray-200 px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 hover:border-gray-300 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

     
        </div>
      </div>
    </>
  );
};

export default Support;