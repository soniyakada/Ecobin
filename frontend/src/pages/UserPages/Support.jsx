import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../../components/UserNavbar';
import { useAuth } from '../../context/AuthContext';

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
      await axios.post(`${BE_URL}/api/pickup/send-support`, formData,{withCredentials:true});

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
      <div className="max-w-2xl mx-auto mt-10 p-6 shadow-lg border rounded-lg bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Contact Support <span className="text-sm text-gray-500 block">by Soniya Kada</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              className="w-full border px-4 py-2 rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full border px-4 py-2 rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Support;
