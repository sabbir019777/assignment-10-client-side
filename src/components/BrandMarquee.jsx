import React from "react";
import { motion } from "framer-motion";
import { SiTesla, SiBmw, SiMercedes, SiAudi, SiFerrari, SiPorsche, SiLamborghini, SiFord, SiToyota } from "react-icons/si";

const BrandMarquee = () => {
  const brands = [
    { icon: <SiTesla />, name: "Tesla" },
    { icon: <SiFerrari />, name: "Ferrari" },
    { icon: <SiBmw />, name: "BMW" },
    { icon: <SiMercedes />, name: "Mercedes" },
    { icon: <SiLamborghini />, name: "Lamborghini" },
    { icon: <SiAudi />, name: "Audi" },
    { icon: <SiPorsche />, name: "Porsche" },
    { icon: <SiFord />, name: "Ford" },
    { icon: <SiToyota />, name: "Toyota" },
  ];

  return (
    <section className="py-24 bg-[#0b0f19] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-3">Our Garage Includes</p>
          <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic">
            Top Global <span className="text-amber-500">Brands</span>
          </h3>
        </div>

        {/* Marquee Container with Gradient Edges */}
        <div className="relative overflow-hidden w-full">

          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#0b0f19] to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#0b0f19] to-transparent z-10"></div>

          <motion.div 
            className="flex gap-6 min-w-full"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div 
                key={index} 
                className="w-48 h-32 shrink-0 bg-gray-900 border border-gray-800 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-amber-500/50 hover:bg-gray-800 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-4xl text-gray-500 group-hover:text-white transition-colors duration-300">
                  {brand.icon}
                </div>
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                  {brand.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;