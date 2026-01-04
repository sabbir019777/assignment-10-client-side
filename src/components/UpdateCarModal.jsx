import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { getAuth } from "firebase/auth";
import { endpoint } from "../api";
import { FaTimes, FaAngleDown } from "react-icons/fa";

const UpdateCarModal = ({ car, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: car.name || "",
    category: car.category || "",
    price: car.price || "",
    status: car.status || "available",
    location: car.location || "",
    imageUrl: car.imageUrl || "",
  });
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error("User not logged in!");
        setLoading(false);
        return;
      }

      const accessToken = await currentUser.getIdToken();

      const response = await fetch(endpoint(`/api/cars/${car._id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");

      toast.success("Vehicle Updated Successfully!");
      

      if(onSubmit) {
        onSubmit({ ...formData, _id: car._id, providerEmail: car.providerEmail });
      }
      
      onClose();

      
      window.location.reload(); 

    } catch (err) {
      console.error(err);
      toast.error("Failed to update. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 md:p-4">
      <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-5 md:p-8 w-full max-w-[360px] md:max-w-lg relative max-h-[92vh] overflow-y-auto transform scale-95 md:scale-100 transition-all shadow-2xl custom-scrollbar">
        

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-2 z-10"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-xl md:text-2xl font-black text-cyan-400 mb-6 uppercase tracking-tighter border-b border-gray-800 pb-3">
          Update Vehicle
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase px-1">Car Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:border-cyan-500 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase px-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:border-cyan-500 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase px-1">Price/Day</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:border-cyan-500 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase px-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:border-cyan-500 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase px-1">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:border-cyan-500 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase px-1">Status</label>
            <div className="relative">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:border-cyan-500 outline-none appearance-none cursor-pointer pr-10"
              >
                <option className="bg-gray-900 text-white" value="available">Available</option>
                <option className="bg-gray-900 text-white" value="booked">Booked</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                <FaAngleDown />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black rounded-xl shadow-lg active:scale-95 transition-all text-sm uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Vehicle"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCarModal;