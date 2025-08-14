import { useState } from "react";
import axios from "axios";
import AdminNavbar from '../../components/AdminNavbar'

const CreateStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    assignedZone: ""
  });
  const [successMsg, setSuccessMsg] = useState("");
  const BE_URL = import.meta.env.VITE_BE_URL;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    try {
       await axios.post(`${BE_URL}/api/staff/createstaff`, formData);
      setSuccessMsg("Staff Created Successfully!");
      setFormData({ name: "", phone: "", assignedZone: "" });
    } catch (err) {
      console.error(" Failed to create staff: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <>
   < AdminNavbar/>
    <div className="max-w-md mx-auto mt-10 p-4 shadow-md rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Create Staff</h2>
      {successMsg && <div className="mb-2 text-green-600">{successMsg}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Staff Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="assignedZone"
          placeholder="Assigned Zone"
          value={formData.assignedZone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Staff
        </button>
      </form>
    </div>
    </>
  );
};

export default CreateStaff;
