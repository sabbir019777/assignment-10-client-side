import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaStar,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaSortAmountDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../api";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = endpoint("/api/cars/top-browse");


const SkeletonCard = () => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-[30px] p-4 animate-pulse h-[350px]">
    <div className="bg-gray-700 h-32 rounded-2xl mb-4"></div>
    <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-700 rounded w-full mb-4"></div>
    <div className="flex justify-between items-center mt-auto">
      <div className="h-5 bg-gray-700 rounded w-16"></div>
      <div className="h-9 bg-gray-700 rounded-xl w-24"></div>
    </div>
  </div>
);

const BrowseCarsPage = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        const processedCars = response.data.map((car) => ({
          id: car._id,
          name: car.name || "Unnamed Car",
          model: car.model || "Unknown Model",
          price: car.price || 0,
          imageUrl: car.imageUrl || "https://via.placeholder.com/400x250",
          category: car.category || "Uncategorized",
          location: car.location || "USA",
          rating: car.rating || "4.8",
          status: car.status || "Available",
          dateValue: car.createdAt ? new Date(car.createdAt) : new Date(),
          date: car.createdAt
            ? new Date(car.createdAt).toLocaleDateString()
            : "Jan 2026",
        }));
        setCars(processedCars);
      } catch (err) {
        console.error("❌ API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredAndSortedCars = cars
    .filter((car) => {
      const matchesSearch = car.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = category === "All" || car.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "priceLow") return a.price - b.price;
      if (sortOption === "priceHigh") return b.price - a.price;
      if (sortOption === "newest") return b.dateValue - a.dateValue;
      return 0;
    });

  const viewDetails = (car) => {
    const user = localStorage.getItem("userLoggedIn") === "true";
    if (!user) {
      navigate("/login", { state: { from: `/car/${car.id}` } });
    } else {
      navigate(`/car/${car.id}`, { state: { car } });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070a] text-white overflow-hidden pb-20">
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-pink-500 to-pink-700">
            Browse Our Fleet
          </h1>
          <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Search, Filter & Sort Bar */}
        <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-900/50 p-5 rounded-[30px] border border-gray-800 backdrop-blur-xl shadow-2xl">
          <div className="md:col-span-2 relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search car model..."
              className="w-full bg-gray-800 border-none rounded-2xl py-3.5 pl-14 outline-none focus:ring-2 ring-amber-500 text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="bg-gray-800 border-none rounded-2xl py-3.5 px-6 outline-none font-bold text-gray-300 text-sm"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electric">Electric</option>
            <option value="Luxury">Luxury</option>
            <option value="SUV">SUV</option>
          </select>

          <div className="relative">
            <FaSortAmountDown className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-500" />
            <select
              className="w-full bg-gray-800 border-none rounded-2xl py-3.5 pl-12 outline-none font-bold text-gray-300 text-sm appearance-none"
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            [...Array(12)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            <AnimatePresence>
              {filteredAndSortedCars.map((car) => (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-900/40 backdrop-blur-md rounded-3xl border border-gray-700 flex flex-col h-[370px] group hover:border-amber-500/50 transition-all overflow-hidden"
                >
    
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={car.imageUrl}
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-2.5 left-3 bg-amber-500 text-slate-900 text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest shadow-lg">
                      {car.status}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 className="text-sm font-bold text-white uppercase tracking-tighter truncate w-[75%]">
                        {car.name}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-500 text-[9px] font-bold">
                        <FaStar /> {car.rating}
                      </div>
                    </div>
                    <p className="text-gray-500 text-[9px] leading-relaxed line-clamp-1 mb-2.5">
                      {car.model} | {car.category}
                    </p>

                    {/* Meta Info Section (price, date, location) */}
                    <div className="space-y-1 mb-3.5 bg-gray-950/50 p-2.5 rounded-xl border border-gray-800/50">
                      <div className="flex items-center gap-2 text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                        <FaMapMarkerAlt className="text-amber-500" />{" "}
                        {car.location}
                      </div>
                      <div className="flex items-center gap-2 text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                        <FaRegCalendarAlt className="text-amber-500" />{" "}
                        {car.date}
                      </div>
                    </div>

                    {/* Footer Utility */}
                    <div className="mt-auto flex justify-between items-center pt-2.5 border-t border-gray-800">
                      <div>
                        <p className="text-[7px] text-gray-600 font-black uppercase tracking-widest">
                          Daily Rate
                        </p>
                        <p className="text-sm font-black text-white italic">
                          ${car.price}
                        </p>
                      </div>
                      <button
                        onClick={() => viewDetails(car)}
                        className="bg-linear-to-r from-amber-400 to-rose-500 text-gray-900 px-3.5 py-1.5 rounded-lg font-black uppercase tracking-widest text-[8px] shadow-lg active:scale-95 transition-all"
                      >
                        View Details
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

export default BrowseCarsPage;
