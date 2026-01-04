import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaCarSide,
  FaSignOutAlt,
  FaHome,
  FaPlusCircle,
  FaListUl,
  FaSearch,
  FaSun,
  FaMoon,
  FaChartPie,
  FaInfoCircle,
  FaUserAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ logout }) => {
  const [user, setUser] = useState(null);
  const { theme, toggleTheme } = useTheme();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to exit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
        setDropdownOpen(false);
        handleScrollToTop(); 
      }
    });
  };

  const publicLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Browse Cars", path: "/browse-cars", icon: <FaSearch /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
  ];

  const protectedLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <FaChartPie /> },
    { name: "Add Car", path: "/dashboard/add-car", icon: <FaPlusCircle /> },
  ];

  const dropdownLinks = [
    { name: "My Profile", path: "/dashboard/profile", icon: <FaUserAlt /> },
    { name: "Browse Cars", path: "/browse-cars", icon: <FaSearch /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaChartPie /> },
    { name: "Add Car", path: "/dashboard/add-car", icon: <FaPlusCircle /> },
  ];

  const allLinks = user ? [...publicLinks, ...protectedLinks] : publicLinks;

  return (
    <nav
      className={`fixed w-full z-100 transition-all duration-500 border-b ${
        isScrolled
          ? "py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl border-amber-500/20"
          : "py-4 bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center">
          {/* Logo Link with Scroll To Top */}
          <Link 
            to="/" 
            className="flex items-center group shrink-0"
            onClick={handleScrollToTop}
          >
            <div className="bg-amber-500 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl group-hover:rotate-12 transition-transform duration-500 shadow-lg">
              <FaCarSide className="text-slate-900 text-xl sm:text-2xl" />
            </div>
            <span className="ml-2 sm:ml-3 text-lg sm:text-2xl font-black tracking-tighter dark:text-white text-slate-900 uppercase">
              Rent<span className="text-amber-500">Wheels</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 ml-4">
            {allLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
            
                onClick={handleScrollToTop}
                className={({ isActive }) => `
                  flex items-center px-3 py-2.5 rounded-xl text-[10px] xl:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                  ${
                    isActive
                      ? "bg-amber-500 text-slate-900 shadow-lg"
                      : "text-slate-600 dark:text-slate-300 hover:bg-amber-500/10 hover:text-amber-500"
                  }
                `}
              >
                <span className="mr-2 text-base xl:text-lg">{link.icon}</span>{" "}
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-amber-400 border border-transparent dark:border-slate-700 shadow-inner"
            >
              {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            {!user ? (
              <Link
                to="/login"
                onClick={handleScrollToTop}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-amber-500 text-slate-900 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center p-1 sm:p-1.5 pr-2 sm:pr-4 rounded-xl sm:rounded-2xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-amber-500 transition-all shadow-sm"
                >
                  <div className="relative">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl object-cover border-2 border-amber-500"
                        alt="Profile"
                      />
                    ) : (
                      <FaUserCircle className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" />
                    )}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                  </div>
                  <FaChevronDown
                    className={`ml-2 text-[10px] sm:text-xs text-amber-500 transition-transform duration-500 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-4 w-60 sm:w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl py-3 z-110 overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
                        <p className="text-[10px] font-black text-amber-500 tracking-[2px] mb-1">
                          USER PROFILE
                        </p>
                        <p className="text-xs sm:text-sm font-bold truncate dark:text-white text-slate-900">
                          {user?.displayName || user?.email}
                        </p>
                      </div>
                      <div className="p-2 space-y-1">
                        {dropdownLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.path}
                       
                            onClick={() => {
                              setDropdownOpen(false);
                              handleScrollToTop();
                            }}
                            className="flex items-center px-4 py-3 text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-amber-500/10 hover:text-amber-500 rounded-xl transition-all"
                          >
                            <span className="mr-3 text-lg">{link.icon}</span>{" "}
                            {link.name}
                          </Link>
                        ))}
                      </div>
                      <div className="p-2 mt-2 border-t dark:border-slate-800">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm font-black text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <FaSignOutAlt className="mr-3" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              className="lg:hidden p-2 sm:p-3 dark:text-white text-slate-900 bg-gray-100 dark:bg-slate-800 rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-8 space-y-6">
              {allLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
      
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleScrollToTop();
                  }}
                  className="flex items-center px-4 py-2 text-lg font-bold dark:text-white text-slate-900 hover:text-amber-500 transition-all border-l-4 border-transparent hover:border-amber-500"
                >
                  <span className="mr-4 text-xl text-amber-500">
                    {link.icon}
                  </span>{" "}
                  {link.name}
                </Link>
              ))}
              {user && (
                <Link
                  to="/dashboard/profile"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleScrollToTop();
                  }}
                  className="flex items-center px-4 py-2 text-lg font-bold dark:text-white text-slate-900 hover:text-amber-500 transition-all border-l-4 border-transparent hover:border-amber-500"
                >
                  <span className="mr-4 text-xl text-amber-500">
                    <FaUserAlt />
                  </span>{" "}
                  My Profile
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;