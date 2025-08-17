import { useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";
import Swal from "sweetalert2";

const CreateStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    assignedZone: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const BE_URL = import.meta.env.VITE_BE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await axios.post(`${BE_URL}/api/staff/createstaff`, formData);
    Swal.fire({
        title: "Success!",
        text: "Staff created successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      setFormData({ name: "", phone: "", assignedZone: "" });
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "❌ Failed to create staff. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create New Staff
          </h2>

          {/* Success & Error Messages */}
         
          {errorMsg && (
            <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Staff Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>

            {/* Assigned Zone */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Assigned Zone
              </label>
              <input
                type="text"
                name="assignedZone"
                value={formData.assignedZone}
                onChange={handleChange}
                placeholder="e.g. Zone A, Zone B"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Staff"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateStaff;
