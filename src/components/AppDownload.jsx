import React from "react";
import { FaApple, FaGooglePlay, FaMobileAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const AppDownload = () => {
  return (
    <section className="py-28 bg-[#050914] overflow-hidden relative">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/80 border border-gray-800 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <FaMobileAlt /> Mobile Experience
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white uppercase italic leading-tight"
          >
            Download The <br />
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 filter drop-shadow-lg">
              Super App
            </span>
          </motion.h2>
        </div>

        {/* Main Card */}
        <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl group">
          
          {/* Hover Effect Light */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text Content */}
            <div className="text-white space-y-8 relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                Unlock Premium Features <br />
                <span className="text-gray-400 font-medium text-2xl">Right from your pocket.</span>
              </h3>
              
              <ul className="space-y-4 text-gray-300 font-medium">
                {['Real-time GPS Tracking', 'Exclusive Mobile-Only Deals', 'Keyless Car Entry', '24/7 In-App Support'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center text-xs">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-6 pt-6">
                
                {/* Apple Store Button */}
                <a 
                  href="https://www.apple.com/app-store/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-black text-white px-8 py-4 rounded-2xl border border-gray-800 hover:border-gray-600 hover:scale-105 transition-all duration-300 shadow-xl shadow-black/50 group"
                >
                  <FaApple className="text-4xl text-gray-200 group-hover:text-white transition-colors" />
                  <div className="text-left leading-none">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Download on</p>
                    <p className="text-xl font-bold">App Store</p>
                  </div>
                </a>

                {/* Google Play Button (Updated Color) */}
                <a 
                  href="https://play.google.com/store" 
                  target="_blank" 
                  rel="noopener noreferrer"
               
                  className="flex items-center gap-4 bg-black text-white px-8 py-4 rounded-2xl border border-gray-800 hover:border-gray-600 hover:scale-105 transition-all duration-300 shadow-xl shadow-black/50 group"
                >
                  <FaGooglePlay className="text-3xl text-green-500 group-hover:scale-110 transition-transform" />
                  <div className="text-left leading-none">
             
                    <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Get it on</p>
                    <p className="text-xl font-bold">Google Play</p>
                  </div>
                </a>

              </div>
            </div>

            {/* Right: Phone Mockup */}

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:flex justify-center"
            >

               {/* Phone Frame */}

               <div className="relative z-10 border-gray-950 bg-black border-[12px] rounded-[3rem] h-[550px] w-[300px] shadow-2xl flex flex-col overflow-hidden rotate-[-6deg] group-hover:rotate-0 transition-transform duration-700 ease-out hover:scale-105">
                  <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[15px] top-[72px] rounded-l-lg"></div>
                  <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[15px] top-[124px] rounded-l-lg"></div>
                  <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[15px] top-[142px] rounded-r-lg"></div>
                  
                  {/* Screen Image (Updated to a Car Interior) */}

                  <div className="w-full h-full bg-slate-900 relative overflow-hidden">
                  
                      <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUr4T1HxkhfDA4fJCc2h0K32ZCFeVEDlQTog&s" 
                        alt="App Car UI" 
                        className="w-full h-full object-cover opacity-80" 
                      />
                      
                      {/* Floating UI Card inside Phone */}

                      <div className="absolute bottom-6 left-4 right-4 p-4 bg-gray-900/90 backdrop-blur-md rounded-2xl border border-gray-700 shadow-2xl">
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-xs">RW</div>
                                <div>
                                    <p className="text-white text-xs font-bold">Lamborghini Urus</p>
                                    <p className="text-gray-400 text-[10px]">● Arriving in 2 mins</p>
                                </div>
                            </div>
                            <span className="text-amber-400 text-xs font-bold">$120/hr</span>
                          </div>
                          
                          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden mb-3">
                            <div className="w-[85%] h-full bg-gradient-to-r from-amber-500 to-orange-600"></div>
                          </div>

                          <button className="w-full bg-white text-black font-bold py-2 rounded-lg text-xs hover:bg-gray-200 transition-colors">
                            Track Driver
                          </button>
                      </div>
                  </div>
               </div>

               {/* Shadow/Reflection beneath phone */}
               
               <div className="absolute -bottom-10 w-[200px] h-[40px] bg-black/50 blur-2xl rounded-full"></div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;