import React from "react";
import { motion } from "framer-motion";
import { FaFileSignature, FaInfoCircle } from "react-icons/fa";

const Terms = () => {

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const policies = [
    {
      h: "01. User Eligibility",
      p: "Renters must be at least 21 years of age with a valid government-issued driving license held for a minimum of 2 years. International drivers are required to provide an International Driving Permit (IDP) alongside their original license for insurance verification.",
    },
    {
      h: "02. Payment & Security Deposit",
      p: "We accept all major credit cards and premium payment gateways. A mandatory security deposit is required for all luxury, sports, and exotic class vehicles to cover potential insurance deductibles and minor damages.",
    },
    {
      h: "03. Prohibited Vehicle Usage",
      p: "Vehicles must not be utilized for racing, off-roading, towing, or any commercial logistics activities. Smoking, pet transportation (without carrier), and any form of illegal activity inside the vehicle are strictly prohibited and subject to heavy fines.",
    },
    {
      h: "04. Maintenance & Vehicle Return",
      p: "We guarantee that all vehicles are in peak mechanical condition upon delivery. Renters are legally responsible for returning the vehicle in the same aesthetic and functional state as received, including fuel levels and cleanliness.",
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-white dark:bg-[#0B0F1A] min-h-screen transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 border-b border-gray-100 dark:border-gray-800 pb-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-amber-500 mb-6"
            >
              <FaFileSignature className="text-2xl" />
              <span className="font-black tracking-[0.4em] uppercase text-xs">
                Legal Documentation
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black dark:text-white text-slate-900 tracking-tighter uppercase leading-[0.85]"
            >
              Terms & <br />{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-400 to-gray-600 dark:from-gray-200 dark:to-gray-500">
                Conditions
              </span>
            </motion.h1>
          </div>
          <div className="text-left md:text-right">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Effective Date
            </p>
            {/* Dynamic Date Rendering */}
            <p className="text-slate-900 dark:text-white font-black uppercase">
              {currentMonth} {currentYear}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-32 p-10 rounded-[40px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
              <FaInfoCircle className="text-amber-500 text-3xl mb-6" />
              <h4 className="text-xl font-black dark:text-white text-slate-900 uppercase mb-4 italic">
                Important Notice
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                By accessing our platform and utilizing our premium rental
                services, you acknowledge that you have read, understood, and
                agreed to be bound by these corporate terms.
              </p>
              <div className="h-1 w-12 bg-amber-500 rounded-full"></div>
            </div>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2 space-y-16">
            {policies.map((section, idx) => (
              <motion.section
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <h3 className="text-amber-500 font-black uppercase text-sm mb-6 tracking-[5px] flex items-center gap-4">
                  <span className="h-0.5 w-8 bg-amber-500 block group-hover:w-16 transition-all duration-500"></span>
                  {section.h}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-[2.2] text-justify text-base md:text-lg font-medium pl-12">
                  {section.p}
                </p>
              </motion.section>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800"
            >
              <p className="text-[10px] dark:text-slate-500 text-slate-400 font-black uppercase tracking-[5px] text-center leading-loose">
                Thank you for choosing RentWheels. <br /> Your safety and
                satisfaction are our primary objectives.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
