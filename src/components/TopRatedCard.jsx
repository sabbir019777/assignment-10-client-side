import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaStar,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaLock,
  FaGasPump,
  FaCogs,
} from "react-icons/fa";
import { auth } from "../Firebase/Firebase.config";
import axios from "axios";
import { endpoint } from "../api";
import { toast } from "react-hot-toast";

const API_URL = endpoint("/api/cars/top-rated");

const SkeletonCard = () => (
  <div className="bg-gray-800/40 border border-gray-700 rounded-3xl p-4 animate-pulse h-[400px]">
    <div className="bg-gray-700 h-44 rounded-2xl mb-4"></div>
    <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-700 rounded w-full mb-6"></div>
    <div className="flex justify-between mt-auto">
      <div className="h-8 bg-gray-700 rounded w-20"></div>
      <div className="h-10 bg-gray-700 rounded-xl w-28"></div>
    </div>
  </div>
);

const TopRatedCard = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const fetchCars = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = Array.isArray(response.data) ? response.data : [];

      const processedCars = data.map((car) => ({
        id: car._id,
        name: car.name || "Unnamed Machine",
        pricePerDay: car.price || 0,
        image: car.imageUrl || "https://via.placeholder.com/400x250",
        description:
          car.description || `${car.model || "Performance"} | High Octane`,
        category: car.category || "General",
        location: car.location || "Dhaka, BD",
        rating: car.rating || "4.9",
        date: car.createdAt
          ? new Date(car.createdAt).toLocaleDateString()
          : "Jan 2026",
        status: car.status || "available",
      }));

      setCars(processedCars);
      setLoading(false);
    } catch (err) {
      console.error("❌ Axios Error:", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAction = async (car) => {
    if (!auth.currentUser) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }
    const loadingToast = toast.loading("Processing booking...");
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.post(
        endpoint(`/api/cars/${car.id}/book`),
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.message) {
        toast.success("Booking Confirmed! 🚗", { id: loadingToast });
        setCars((prevCars) =>
          prevCars.map((c) =>
            c.id === car.id ? { ...c, status: "booked" } : c
          )
        );
        setTimeout(() => navigate("/dashboard/my-bookings"), 1000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed!", {
        id: loadingToast,
      });
    }
  };

  const filteredCars = cars.filter((car) => {
    const matchesCategory =
      category === "All" ||
      car.category?.toLowerCase() === category.toLowerCase();
    const matchesSearch = car.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative bg-[#0b0f1a] min-h-screen text-white overflow-hidden pb-24">
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 pt-24">
        <div className="text-center mb-20 space-y-4">
          <p className="text-amber-500 font-black tracking-[0.4em] uppercase text-xs">
            Curated Selection
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">
            Top Rated{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-rose-600">
              Car
            </span>
          </h1>
          <div className="w-24 h-1.5 bg-linear-to-r from-amber-400 to-rose-500 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            <AnimatePresence>
              {filteredCars.map((car) => (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ y: -10 }}
                  className={`relative bg-gray-900/50 backdrop-blur-md rounded-[2.5rem] overflow-hidden border ${
                    car.status === "booked"
                      ? "border-red-500/30"
                      : "border-white/5"
                  } flex flex-col h-[420px] group transition-all duration-700`}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className={`w-full h-full object-cover transition-transform duration-1000 ${
                        car.status === "booked"
                          ? "grayscale opacity-50"
                          : "group-hover:scale-110"
                      }`}
                    />
                    <div
                      className={`absolute top-5 left-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/20 ${
                        car.status === "booked"
                          ? "bg-red-500 text-white"
                          : "bg-amber-500 text-black"
                      }`}
                    >
                      {car.status === "booked" ? "Reserved" : "Available"}
                    </div>
                  </div>

                  <div className="p-7 flex flex-col flex-1">
                    <h3
                      className={`text-xl font-black uppercase truncate ${
                        car.status === "booked" ? "text-gray-600" : "text-white"
                      }`}
                    >
                      {car.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-amber-500 text-xs font-black mt-1">
                      <FaStar /> {car.rating}
                    </div>
                    <p className="text-gray-500 text-[11px] mt-4 line-clamp-1 italic">
                      {car.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                      <div>
                        <p className="text-[9px] text-gray-500 uppercase">
                          Daily
                        </p>
                        <p
                          className={`text-2xl font-black italic ${
                            car.status === "booked"
                              ? "text-gray-700"
                              : "text-white"
                          }`}
                        >
                          ${car.pricePerDay}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAction(car)}
                        disabled={car.status === "booked"}
                        className={`px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                          car.status === "booked"
                            ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                            : "bg-linear-to-br from-amber-400 to-rose-600 text-black active:scale-95 shadow-lg"
                        }`}
                      >
                        {car.status === "booked" ? "Booked" : "Book Now"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};


export default TopRatedCard;
