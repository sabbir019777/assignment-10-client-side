import React from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus, FaLifeRing } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      q: "What documents are required for car rental?",
      a: "To ensure a seamless experience, we require a valid driving license, a national ID or passport, and a credit card for the security deposit. International renters should provide an International Driving Permit (IDP).",
    },
    {
      q: "Is insurance included in the rental price?",
      a: "Yes, all our luxury vehicles come with comprehensive insurance coverage. However, we offer additional premium protection plans for complete peace of mind during your journey.",
    },
    {
      q: "Can I pick up the car in one city and return in another?",
      a: "Absolutely. Our 'One-Way Premium' service allows you to return the vehicle at any of our authorized hubs across the country, subject to a nominal relocation fee.",
    },
    {
      q: "What is your policy on fuel?",
      a: "We operate on a 'Fair Fuel' policy. You receive the car with a full tank and should return it full. If not, we will handle the refueling at standard market rates.",
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-[#F9FAFB] dark:bg-[#0B0F1A] min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-gray-200 dark:border-gray-800 pb-12">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-amber-500 font-black tracking-[0.3em] uppercase text-xs mb-4"
            >
              Support Center
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black dark:text-white text-slate-900 tracking-tighter uppercase"
            >
              Common <br />{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">
                Queries
              </span>
            </motion.h1>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs">
              Can't find what you're looking for? Our executive team is just a
              call away.
            </p>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="sticky top-32 p-10 rounded-[40px] bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none">
              <FaLifeRing className="text-5xl text-amber-500 mb-6" />
              <h3 className="text-2xl font-black dark:text-white text-slate-900 mb-4 uppercase italic">
                Need Instant Help?
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                Connect with our 24/7 VIP concierge for immediate assistance
                regarding your bookings.
              </p>

      
              <button
                onClick={() => navigate("/contact")}
                className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 font-black uppercase tracking-widest text-xs hover:scale-105 transition-all active:scale-95"
              >
                Chat With Us
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {faqs.map((f, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-[30px] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <span className="text-lg font-bold dark:text-white text-slate-900 pr-8">
                    {f.q}
                  </span>
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <FaPlus className="absolute group-open:opacity-0 transition-all text-amber-500" />
                    <FaMinus className="absolute opacity-0 group-open:opacity-100 transition-all text-amber-500" />
                  </div>
                </summary>
                <div className="px-8 pb-8 text-slate-500 dark:text-slate-400 leading-loose text-base border-t border-gray-50 dark:border-gray-800 pt-6">
                  {f.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
