import { useState } from 'react';
import axios from 'axios';
import Swal  from 'sweetalert2';

const CreatePickupRequest = () => {
  const [form, setForm] = useState({
    requestedDate: '',
    address: '',
    wasteType: '',
    image: null,
  });
  const BE_URL = import.meta.env.VITE_BE_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('requestedDate', form.requestedDate);
    data.append('address', form.address);
    data.append('wasteType', form.wasteType);
    if (form.image) data.append('image', form.image);

    try {
      await axios.post(`${BE_URL}/api/pickups`, data);
        Swal.fire({
     title: "Pickup request raised successfully!",
     icon: "success",
     timer: 2000,
     showConfirmButton: false,
      });
      setForm({ requestedDate: '', address: '', wasteType: '', image: null });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Failed to raise request",
        icon: "error",
        confirmButtonText: "OK",
      });    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">➕ Raise a Pickup Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Pickup Date</label>
          <input
            type="date"
            name="requestedDate"
            value={form.requestedDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Pickup Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Type of Waste</label>
          <select
            name="wasteType"
            value={form.wasteType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select</option>
            <option value="plastic">Plastic</option>
            <option value="organic">Organic</option>
            <option value="metal">Metal</option>
            <option value="e-waste">E-Waste</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Upload Image (optional)</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          🚀 Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreatePickupRequest;
