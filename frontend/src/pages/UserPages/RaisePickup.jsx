import { useState } from 'react';
import axios from 'axios';
import UserNavbar from '../../components/UserNavbar';

const RaisePickup = () => {
  const [formData, setFormData] = useState({
    address: '',
    wasteType: '',
    image: null,
    notes: '',
  });
  const [preview, setPreview] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const BE_URL = import.meta.env.VITE_BE_URL;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    const data = new FormData();
    data.append('address', formData.address);
    data.append('wasteType', formData.wasteType);
    data.append('notes', formData.notes);
    if (formData.image) data.append('image', formData.image);

    try {
      await axios.post(`${BE_URL}/api/pickup/create`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setFormData({ address: '', wasteType: '', image: null, notes: '' });
      setPreview(null);
      setSuccessMsg('Pickup request submitted successfully.');
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <>
      <UserNavbar />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Raise a Pickup Request</h1>

        {successMsg && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMsg}</div>}
        {errorMsg && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Pickup Address"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <select
              name="wasteType"
              value={formData.wasteType}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select Waste Type</option>
              <option value="plastic">Plastic</option>
              <option value="organic">Organic</option>
              <option value="e-waste">E-Waste</option>
              <option value="metal">Metal</option>
            </select>
          </div>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional Notes (optional)"
            rows={3}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div>
            <label className="block mb-2 font-medium text-gray-700">Upload Waste Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-200"
          >
            Submit Pickup Request
          </button>
        </form>
      </div>
    </>
  );
};

export default RaisePickup;
