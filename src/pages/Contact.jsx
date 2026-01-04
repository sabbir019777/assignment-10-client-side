import React from "react";
import Swal from "sweetalert2";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  const handleContact = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Processing...",
      didOpen: () => Swal.showLoading(),
      timer: 1500,
    }).then(() => {
      Swal.fire({ title: "Inquiry Sent!", text: "Our team will contact you within 24 hours.", icon: "success", confirmButtonColor: "#f59e0b" });
      e.target.reset();
    });
  };

  return (
    <div className="pt-24 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-20">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl font-black dark:text-white text-slate-900 uppercase tracking-tighter">Get In <span className="text-amber-500">Touch</span></motion.h1>
          <div className="h-1.5 w-24 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details */}
          <div className="space-y-6">
            {[
              { icon: <FaPhoneAlt />, label: "Support Hotlines", val: "+1 (800) WHEELS", color: "bg-blue-500" },
              { icon: <FaEnvelope />, label: "Official Email", val: "hi@rentwheels.com", color: "bg-amber-500" },
              { icon: <FaMapMarkerAlt />, label: "Headquarters", val: "123 Tech Avenue, Dhaka", color: "bg-pink-500" },
              { icon: <FaClock />, label: "Operational Hours", val: "24/7 Global Support", color: "bg-green-500" },
            ].map((item, i) => (
              <motion.div 
                whileHover={{ x: 10 }}
                key={i} 
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800 shadow-lg flex items-center gap-6"
              >
                <div className={`${item.color} p-4 rounded-2xl text-white shadow-lg shadow-inherit/20`}>{item.icon}</div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-1">{item.label}</p>
                  <p className="font-bold dark:text-white text-slate-900 text-sm">{item.val}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-2">
            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleContact} 
              className="bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[40px] shadow-2xl border dark:border-slate-800 space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black dark:text-white text-slate-900 uppercase ml-2 tracking-widest">Full Name</label>
                  <input type="text" required className="w-full p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 outline-none border-2 border-transparent focus:border-amber-500 transition-all dark:text-white" placeholder="John Doe" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black dark:text-white text-slate-900 uppercase ml-2 tracking-widest">Email Address</label>
                  <input type="email" required className="w-full p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 outline-none border-2 border-transparent focus:border-amber-500 transition-all dark:text-white" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-3">
                  <label className="text-xs font-black dark:text-white text-slate-900 uppercase ml-2 tracking-widest">Message</label>
                  <textarea rows="5" required className="w-full p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 outline-none border-2 border-transparent focus:border-amber-500 transition-all dark:text-white" placeholder="Tell us what you're looking for..."></textarea>
              </div>
              <button className="w-full py-5 bg-amber-500 text-slate-900 font-black rounded-2xl uppercase tracking-[5px] hover:shadow-2xl hover:shadow-amber-500/40 hover:-translate-y-1 transition-all">Send Inquiry</button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;