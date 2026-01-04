import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaCar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCreditCard,
  FaShieldAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const successMessage = document.getElementById("successMessage");
    const emailValue = e.target.email.value;
    
    if(emailValue) {
        e.target.email.value = "";
        successMessage.classList.remove("hidden");
        successMessage.classList.add("flex");
        setTimeout(() => {
          successMessage.classList.add("hidden");
          successMessage.classList.remove("flex");
        }, 3000);
    }
  };

  const footerLinks = {
    services: [
      { name: "Home", path: "/" },
      { name: "Browse Cars", path: "/browse-cars" },
      { name: "About Section", path: "/about" },
      { name: "Electric Rides", path: "/browse-cars" },
    ],
   
    explore: [
      { name: "About Our Story", path: "/about" },
      { name: "Contact Support", path: "/contact" },
      { name: "Common FAQs", path: "/faq" },
      { name: "Privacy & Terms", path: "/terms" },
    ]
  };

  return (
    <footer className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 py-16 overflow-hidden mt-20">
      
      {/* Background Decorative Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-amber-500/10 -top-24 -left-24 blur-[100px]"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full bg-pink-500/10 -bottom-24 -right-24 blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Company Identity */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                <FaCar className="text-slate-900 text-2xl" />
              </div>
              <span className="text-2xl font-black tracking-tighter dark:text-white text-slate-900 uppercase">
                Rent<span className="text-amber-500">Wheels</span>
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Experience the pinnacle of luxury travel. Drive your dream vehicle with 
              unmatched comfort and professional support.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: FaFacebookF, color: "hover:text-blue-600", url: "https://facebook.com" },
                { Icon: FaXTwitter, color: "hover:text-gray-400", url: "https://twitter.com" },
                { Icon: FaInstagram, color: "hover:text-pink-500", url: "https://instagram.com" },
                { Icon: FaLinkedinIn, color: "hover:text-blue-700", url: "https://linkedin.com" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 ${social.color} transition-all duration-300 border border-transparent hover:border-amber-500/50`}
                >
                  <social.Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm mb-6 border-l-4 border-amber-500 pl-3">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.services.map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Explore - Updated with 4 New Pages */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm mb-6 border-l-4 border-amber-500 pl-3">
              Quick Explore
            </h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.explore.map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm mb-6 border-l-4 border-amber-500 pl-3">
              Stay Updated
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Subscribe for exclusive luxury offers.
            </p>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <div className="flex bg-slate-200 dark:bg-slate-800 rounded-2xl p-1 border border-transparent focus-within:border-amber-500/50 transition-all">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  className="bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white px-4 py-2 w-full text-sm"
                />
                <button
                  type="submit"
                  className="bg-amber-500 text-slate-900 px-4 py-2 rounded-xl font-bold text-sm shadow-lg hover:bg-amber-400 transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
            <div id="successMessage" className="hidden mt-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs items-center">
              <FaShieldAlt className="mr-2" /> Subscription successful!
            </div>
          </div>
        </div>

        {/* Contact Info Row */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-amber-500" /> 123 Luxury Ave, CA</span>
              <span className="flex items-center gap-2"><FaPhone className="text-amber-500" /> +1 800 WHEELS</span>
              <span className="flex items-center gap-2"><FaEnvelope className="text-amber-500" /> hi@rentwheels.com</span>
            </div>
            <div className="flex gap-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className="flex items-center gap-2"><FaCreditCard className="text-amber-500" /> Secure Checkout</span>
              <span className="flex items-center gap-2"><FaShieldAlt className="text-amber-500" /> Verified Trust</span>
            </div>
          </div>
          <p className="text-center text-slate-400 dark:text-slate-600 mt-10 text-[10px] font-bold uppercase tracking-[4px]">
            © 2026 RentWheels. Redefining Motion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;