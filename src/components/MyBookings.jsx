import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { endpoint } from "../api";
import { auth } from "../Firebase/Firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { FaCar, FaTrashAlt, FaCalendarCheck, FaTag } from "react-icons/fa"; 

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async (user) => {
    try {
      const token = await user.getIdToken();
      const response = await axios.get(endpoint("/api/my-bookings"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchBookings(user);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleCancel = async (bookingId, carName, carId) => {
    Swal.fire({
      title: `Cancel booking for ${carName}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#374151",
      confirmButtonText: "Yes, cancel it!",
      background: "#1F2937",
      color: "#fff"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await auth.currentUser.getIdToken();
          
          await axios.delete(endpoint(`/api/bookings/${bookingId}`), {
            headers: { Authorization: `Bearer ${token}` },
            data: { carId: carId }
          });

          setBookings((prev) => prev.filter((b) => b._id !== bookingId));
          
          Swal.fire({
            title: "Cancelled!",
            text: "Your booking has been removed.",
            icon: "success",
            background: "#1F2937",
            color: "#fff",
            confirmButtonColor: "#F59E0B"
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text: "Failed to cancel booking.",
            icon: "error",
            background: "#1F2937",
            color: "#fff"
          });
        }
      }
    });
  };

  useEffect(() => {
    document.title = "My Bookings - RentWheels";
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white px-4 md:px-10 pt-28 pb-20">
      
      {/* Header Section (Centered) */}
      <div className="max-w-7xl mx-auto mb-12 text-center border-b border-gray-800 pb-8">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-2">
          My <span className="text-amber-500">Bookings</span>
        </h1>
        <p className="text-gray-400 text-lg">Manage your upcoming trips and vehicle status.</p>
      </div>

      {/* Bookings Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {bookings.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-20 bg-gray-800/30 rounded-3xl border border-gray-800"
            >
              <div className="bg-gray-800 p-6 rounded-full mb-4">
                <FaCar className="text-6xl text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-300">No Active Bookings</h3>
              <p className="text-gray-500 mt-2">Browse our collection and book your first ride!</p>
            </motion.div>
          ) : (
            bookings.map((b) => (
              <motion.div
                key={b._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="group relative bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-80" />
                  <img 
                    src={b.image} 
                    alt={b.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider">
                      <FaCalendarCheck /> Confirmed
                    </span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="bg-amber-500 text-slate-900 px-4 py-2 rounded-xl font-bold shadow-lg flex items-center gap-1">
                      <span className="text-xs font-semibold uppercase opacity-80">Daily</span>
                      <span className="text-lg">${b.pricePerDay}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                      {b.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                      <FaTag className="text-amber-500" />
                      <span>{b.category || "Luxury Vehicle"}</span> 
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                    {b.description}
                  </p>

                  {/* Action Footer */}
                  <div className="pt-4 border-t border-slate-700 mt-auto">
                    <button
                      onClick={() => handleCancel(b._id, b.name, b.carId)}
                      className="w-full flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-red-500/10 text-gray-300 hover:text-red-500 border border-slate-600 hover:border-red-500/50 py-3 rounded-xl font-semibold transition-all duration-300 group/btn"
                    >
                      <FaTrashAlt className="group-hover/btn:scale-110 transition-transform" />
                      Cancel Reservation
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MyBookings;