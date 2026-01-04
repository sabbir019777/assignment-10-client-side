import React from "react";
import { motion } from "framer-motion";
import { 
  FaSearch, FaCalendarCheck, FaCarSide, FaShieldAlt, 
  FaIdCard, FaCreditCard, FaCheckCircle, FaUndo 
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    { 
      id: 1,
      icon: <FaSearch />, 
      title: "Browse Fleet", 
      desc: "Explore our diverse collection of premium vehicles tailored to your journey." 
    },
    { 
      id: 2,
      icon: <FaCalendarCheck />, 
      title: "Pick Dates", 
      desc: "Select your preferred pickup and return dates with our smart calendar." 
    },
    { 
      id: 3,
      icon: <FaShieldAlt />, 
      title: "Insurance", 
      desc: "Choose from our comprehensive insurance plans for a worry-free trip." 
    },
    { 
      id: 4,
      icon: <FaIdCard />, 
      title: "Verify ID", 
      desc: "Upload your driving license and ID for a quick digital verification." 
    },
    { 
      id: 5,
      icon: <FaCreditCard />, 
      title: "Secure Pay", 
      desc: "Complete your booking using our encrypted and secure payment gateways." 
    },
    { 
      id: 6,
      icon: <FaCheckCircle />, 
      title: "Confirmation", 
      desc: "Receive instant booking confirmation and vehicle details via email." 
    },
    { 
      id: 7,
      icon: <FaCarSide />, 
      title: "Hit the Road", 
      desc: "Collect your car from our hub or request doorstep delivery. Drive instantly." 
    },
    { 
      id: 8,
      icon: <FaUndo />, 
      title: "Easy Return", 
      desc: "Drop off the vehicle at your convenience at any of our designated spots." 
    },
  ];

  return (
    <section className="py-24 bg-[#0b0f19] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs mb-3"
          >
            Seamless Process
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black uppercase italic"
          >
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Works</span>
          </motion.h2>
        </div>

        {/* Updated Grid: 1 on Mobile, 2 on Tablet, 4 on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-[30px] hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 h-full"
            >
              {/* Step Number */}
              <div className="absolute top-4 right-6 text-5xl font-black text-gray-800/50 group-hover:text-amber-500/10 transition-colors">
                0{step.id}
              </div>

              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-2xl text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-gray-900 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-black/50">
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold uppercase mb-3 group-hover:text-amber-500 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-400 text-xs leading-loose">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;