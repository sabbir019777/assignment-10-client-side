import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaSave,
  FaFingerprint,
  FaCameraRetro,
} from "react-icons/fa";

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [isFocused, setIsFocused] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Encrypting & Syncing Credentials...");
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      toast.success("Identity Verified & Updated!", { id: loadingToast });
      setTimeout(() => {
        navigate("/dashboard/profile");
        window.location.reload();
      }, 1200);
    } catch (error) {
      toast.error("Handshake Failed. Verify Connection.", { id: loadingToast });
    }
  };

  return (
    <div className="bg-[#f8fafc] dark:bg-[#020617] min-h-screen pt-32 pb-24 transition-colors duration-700 selection:bg-amber-500/30">
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Background Decorative Element */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 text-amber-500">
              <FaFingerprint className="text-2xl animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">
                System Core / Profile
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black dark:text-white text-slate-900 uppercase tracking-tighter leading-[0.85]">
              Update <br />{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600 italic">
                Identity
              </span>
            </h1>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="group flex items-center gap-4 px-8 py-4 rounded-full border border-slate-200 dark:border-slate-800 dark:text-white text-slate-900 font-bold text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 shadow-xl"
          >
            <FaArrowLeft className="group-hover:-translate-x-2 transition-transform" />
            Back to Base
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Smaller Sleek Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 relative flex justify-center"
          >
            <div className="relative z-10 p-1.5 bg-white dark:bg-slate-900 rounded-[45px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden group w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
              <div className="relative w-full h-full overflow-hidden rounded-[40px]">
                <img
                  src={photo || "https://i.ibb.co/v36X0vD/avatar.png"}
                  alt="Identity Preview"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                  <p className="text-white font-black text-[9px] uppercase tracking-[3px]">
                    Live Signature Preview
                  </p>
                </div>
              </div>
            </div>
            {/* Smaller Floating Icon */}
            <div className="absolute bottom-2 right-[10%] md:right-[5%] w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-950 shadow-2xl z-20 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <FaCameraRetro size={24} />
            </div>
          </motion.div>

          {/* Right Column: Form Section */}
          <div className="lg:col-span-8">
            <motion.form
              onSubmit={handleUpdate}
              className="space-y-12 bg-white/50 dark:bg-slate-900/30 p-8 md:p-12 rounded-[50px] backdrop-blur-sm border border-white/20 dark:border-slate-800/50 shadow-inner"
            >
              <div className="space-y-12">
                {/* Input Field: Full Name */}
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setIsFocused("name")}
                    onBlur={() => setIsFocused(null)}
                    required
                    className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-800 py-4 outline-none focus:border-amber-500 transition-all duration-500 dark:text-white text-xl font-bold peer placeholder-transparent"
                    placeholder="Full Legal Name"
                  />
                  <label
                    className={`absolute left-0 transition-all duration-500 uppercase font-black tracking-[3px] text-[10px] ${
                      isFocused === "name" || name
                        ? "-top-6 text-amber-500"
                        : "top-4 text-slate-400"
                    }`}
                  >
                    Full Legal Name
                  </label>
                  <div
                    className={`h-0.5 bg-amber-500 absolute bottom-0 left-0 transition-all duration-700 ${
                      isFocused === "name" ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>

                {/* Input Field: Photo URL */}
                <div className="relative">
                  <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    onFocus={() => setIsFocused("photo")}
                    onBlur={() => setIsFocused(null)}
                    required
                    className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-800 py-4 outline-none focus:border-amber-500 transition-all duration-500 dark:text-white text-base font-medium peer placeholder-transparent italic"
                    placeholder="Avatar Source Link"
                  />
                  <label
                    className={`absolute left-0 transition-all duration-500 uppercase font-black tracking-[3px] text-[10px] ${
                      isFocused === "photo" || photo
                        ? "-top-6 text-amber-500"
                        : "top-4 text-slate-400"
                    }`}
                  >
                    Cloud Avatar Endpoint (URL)
                  </label>
                  <div
                    className={`h-0.5 bg-amber-500 absolute bottom-0 left-0 transition-all duration-700 ${
                      isFocused === "photo" ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>
              </div>

              <motion.button
                whileHover={{
                  y: -3,
                  shadow: "0 15px 30px rgba(245, 158, 11, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden group w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-6 rounded-2xl transition-all duration-500 uppercase tracking-[4px] text-xs flex items-center justify-center gap-3 shadow-xl"
              >
                <span className="relative z-10">Commit Secure Changes</span>
                <FaSave className="relative z-10 text-base group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000"></div>
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
