import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx'

const Signin = () => {
  const navigate = useNavigate();
   const { setUser } = useAuth();
     const BE_URL = import.meta.env.VITE_BE_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BE_URL}/api/auth/login`,
        formData,
        { withCredentials: true }
      );
      setUser(res.data.user);
      console.log(res.data.user.role);
      const role = res.data.user.role;
      if(role === "user"){
       navigate('/user/home')
      }else if (role === 'admin'){
        navigate('/adminDashboard')
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Login to Ecobin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border-b border-gray-300 outline-none py-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border-b border-gray-300 outline-none py-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signin;
