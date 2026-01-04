import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaShieldAlt, FaGem, FaGlobe } from "react-icons/fa";

const About = () => {
  const features = [
    { icon: <FaRocket />, title: "Fast Booking", desc: "Book your ride in less than 60 seconds with our instant process." },
    { icon: <FaShieldAlt />, title: "Safety First", desc: "Every vehicle undergoes a 50-point safety inspection before delivery." },
    { icon: <FaGem />, title: "Luxury Fleet", desc: "We own the most exclusive collection of high-end cars in the country." },
    { icon: <FaGlobe />, title: "24/7 Support", desc: "Our dedicated support team is available globally for your assistance." },
  ];

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Banner Section */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter"
          >
            We Drive <span className="text-amber-500">Dreams</span>
          </motion.h1>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto font-medium">
            RentWheels is not just a car rental; it's a commitment to luxury, safety, and unforgettable journeys.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-black dark:text-white text-slate-900 uppercase leading-tight mb-6">
              Redefining the <br /> <span className="text-amber-500">Rental Experience</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg text-justify">
              Founded in 2014, RentWheels has revolutionized how people travel. We bridge the gap between high-end luxury and accessible mobility. Our platform provides a seamless connection between premium vehicle providers and enthusiasts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="text-amber-500 text-3xl group-hover:scale-125 transition-transform">{f.icon}</div>
                  <div>
                    <h4 className="font-bold dark:text-white text-slate-900 text-sm uppercase tracking-wide">{f.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8 }}
            className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800"
          >
             <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80" alt="Luxury Car" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;