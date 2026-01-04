import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaPhoneAlt, FaCheckCircle, FaStar, FaShieldAlt } from "react-icons/fa";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 bg-[#050914] flex justify-center items-center relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Container */}
      <div className="max-w-7xl w-full relative z-10 flex flex-col items-center">
  
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-2">
              Ready to <span className="text-amber-500">Hit the Road?</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-bold tracking-[0.3em] uppercase">
              Join the elite community of drivers today
            </p>
        </motion.div>



        {/* The Card Container (Group) */}
        <div className="w-full relative group">
            
            {/* The Card */}
            <div className="relative rounded-[3rem] overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl">
            
            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1920&auto=format&fit=crop" 
                alt="Classic Luxury Car" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10 p-10 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Side: Content */}
                <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                    <FaStar /> Premium Collection
                </div>

                <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-6 leading-[0.9]">
                    Don't Just Drive <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    Make A Statement
                    </span>
                </h2>

                <p className="text-gray-300 text-lg font-medium max-w-md mb-10 leading-relaxed drop-shadow-md">
                    Experience the timeless elegance of our classic and luxury fleet. Unmatched style, delivered to your doorstep.
                </p>

                <div className="flex flex-col sm:flex-row gap-5">
                    <button 
                    onClick={() => navigate("/browse-cars")}
                    className="px-10 py-4 bg-amber-500 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center gap-3"
                    >
                    Book Now <FaArrowRight />
                    </button>
                    <button 
                    onClick={() => navigate("/contact")}
                    className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                    <FaPhoneAlt className="text-amber-500" /> Contact Us
                    </button>
                </div>
                </motion.div>

                {/* Right Side: CRYSTAL CLEAR GLASS BOX */}
                <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="hidden lg:flex justify-end"
                >
          
                <div className="
                    relative p-8 rounded-[2rem] max-w-xs w-full
                    bg-white/3 
                    backdrop-blur-sm 
                    border border-white/15 
                    shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]
                    hover:bg-white/10 transition-colors duration-500
                ">
                    {/* Subtle Shine/Gloss Effect */}
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/20 to-transparent pointer-events-none opacity-5"></div>

                    <h3 className="relative text-white text-xl font-bold mb-6 border-b border-white/20 pb-4 z-10 drop-shadow-md">
                    Why Choose Us?
                    </h3>
                    
                    <ul className="space-y-5 relative z-10">
                    {[
                        { text: "Vintage & Modern Fleet", icon: <FaCheckCircle className="text-green-400" /> },
                        { text: "No Hidden Charges", icon: <FaCheckCircle className="text-green-400" /> },
                        { text: "Premium Insurance", icon: <FaShieldAlt className="text-blue-400" /> },
                        { text: "24/7 Concierge Service", icon: <FaPhoneAlt className="text-amber-400" /> },
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-white font-medium text-sm drop-shadow-sm">
                        <span className="p-2 bg-black/20 rounded-full border border-white/10 text-white">
                            {item.icon}
                        </span>
                        {item.text}
                        </li>
                    ))}
                    </ul>
                    
                    <div className="mt-8 pt-6 border-t border-white/20 text-center relative z-10">
                    <p className="text-5xl font-black text-white drop-shadow-lg">
                        15K+
                    </p>
                    <p className="text-gray-200 text-[10px] uppercase tracking-[0.2em] mt-1 font-bold shadow-black">Happy Drivers</p>
                    </div>
                </div>
                </motion.div>

            </div>
            </div>

            {/* Decorative Glow Line at Bottom */}
            <div className="absolute -bottom-1 left-10 right-10 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50 blur-sm"></div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;