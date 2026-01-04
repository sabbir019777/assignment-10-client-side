import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../api";
import {
  FaUser,
  FaCar,
  FaListUl,
  FaSignOutAlt,
  FaTachometerAlt,
  FaHome,
  FaSearch,
  FaPlusCircle,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaUsersCog,
  FaShieldAlt,
} from "react-icons/fa";

const DashboardLayout = ({ user, logout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [role, setRole] = useState("user");
  const [loadingRole, setLoadingRole] = useState(true);

  
  useEffect(() => {
    const checkRole = async () => {
      if (user?.email) {
        try {
        
          let token = null;
          if (typeof user.getIdToken === "function") {
            token = await user.getIdToken();
          } else {
            token = localStorage.getItem("token");
          }

          if (!token) {
            console.error("Token not available for role check");
            setLoadingRole(false);
            return;
          }

          const response = await axios.get(
            endpoint(`/api/users/role/${user.email}`),
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setRole(response.data.role);
        } catch (error) {
          console.error("Error fetching role:", error);
        } finally {
          setLoadingRole(false);
        }
      } else {
        setLoadingRole(false);
      }
    };
    checkRole();
  }, [user]);


  const commonMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "My Profile", path: "/dashboard/profile", icon: <FaUser /> },
  ];


  const userMenu = [
    { name: "Add A Car", path: "/dashboard/add-car", icon: <FaPlusCircle /> },
    { name: "My Listings", path: "/dashboard/my-listings", icon: <FaListUl /> },
    { name: "My Bookings", path: "/dashboard/my-bookings", icon: <FaCar /> },
    { name: "Browse Cars", path: "/browse-cars", icon: <FaSearch /> },
  ];

  
  const adminMenu = [
    {
      name: "Manage All Cars",
      path: "/dashboard/manage-cars",
      icon: <FaShieldAlt />,
    },
    { name: "All Bookings", path: "/dashboard/all-bookings", icon: <FaCar /> },
    {
      name: "Manage Users",
      path: "/dashboard/manage-users",
      icon: <FaUsersCog />,
    },
  ];


  const menuItems =
    role === "admin"
      ? [...commonMenu, ...adminMenu]
      : [...commonMenu, ...userMenu];

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate("/");
  };

  const handleProfileNavigation = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  if (loadingRole) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white font-sans overflow-hidden">
      {/* Sidebar Section */}
      <aside
        className={`w-72 bg-gray-800 border-r border-gray-700 flex flex-col fixed md:relative h-screen transition-transform duration-500 z-50 ${
          mobileMenuOpen
            ? "translate-x-0 shadow-2xl shadow-black"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-8 text-center border-b border-gray-700">
          <Link
            to="/"
            className="text-2xl font-black italic text-amber-500 tracking-tighter hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
          >
            <FaCar /> RENT WHEELS
          </Link>
          <div className="mt-3">
            <span
              className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border ${
                role === "admin"
                  ? "bg-amber-500 text-black border-amber-500"
                  : "bg-gray-700 text-gray-400 border-gray-600"
              }`}
            >
              {role === "admin" ? "Administrator" : "User Dashboard"}
            </span>
          </div>
        </div>

        <nav className="flex-1 p-5 space-y-2 overflow-y-auto custom-scrollbar">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-xl transition-all font-bold text-sm mb-6 border border-gray-700/50"
          >
            <FaHome className="text-amber-500" /> Back to Home
          </Link>

          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold ${
                  isActive
                    ? "bg-amber-500 text-black shadow-xl shadow-amber-500/10 scale-[1.03]"
                    : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
                }`}
              >
                <span
                  className={`text-xl ${
                    isActive ? "text-black" : "text-amber-500"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-sm tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-5 py-3.5 text-red-400 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all font-black text-xs uppercase tracking-widest border border-red-500/10"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-gray-800/80 backdrop-blur-xl border-b border-gray-700 px-8 py-4 flex justify-between items-center sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white text-2xl"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h1 className="text-xl font-black text-white uppercase tracking-tighter hidden md:block italic">
              {role === "admin" ? "Admin Control" : "Dashboard"}
            </h1>
          </div>

          {/* Profile Section */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-4 py-2 bg-gray-900 hover:bg-gray-700 rounded-2xl transition-all border border-gray-700"
            >
              <img
                src={user?.photoURL || "https://i.ibb.co/v36X0vD/avatar.png"}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover border-2 border-amber-500"
              />
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-[11px] font-black text-white uppercase">
                  {user?.displayName || "User"}
                </p>
                <p className="text-[9px] text-amber-500 font-bold uppercase">
                  {role}
                </p>
              </div>
              <FaChevronDown
                className={`text-xs text-gray-500 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-4 w-64 bg-gray-800 border border-gray-700 rounded-[1.5rem] shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-3 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 bg-gray-900/30">
                  <p className="text-xs font-black text-white truncate uppercase">
                    {user?.name || "User"}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate mt-1">
                    {user?.email}
                  </p>
                </div>
                <div className="p-3 space-y-1">
                  <button
                    onClick={() =>
                      handleProfileNavigation("/dashboard/profile")
                    }
                    className="w-full text-left px-4 py-3 hover:bg-gray-700 rounded-xl text-gray-300 flex items-center gap-3 text-xs font-bold transition-all"
                  >
                    <FaUser className="text-amber-400" /> My Profile
                  </button>
                  <button
                    onClick={() => handleProfileNavigation("/dashboard")}
                    className="w-full text-left px-4 py-3 hover:bg-gray-700 rounded-xl text-gray-300 flex items-center gap-3 text-xs font-bold transition-all"
                  >
                    <FaTachometerAlt className="text-amber-400" /> Home
                  </button>
                </div>
                <div className="border-t border-gray-700 my-1"></div>
                <div className="p-3">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-500/10 rounded-xl text-red-400 flex items-center gap-3 text-xs font-bold transition-all"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#0a0f1a] custom-scrollbar">
          <Outlet />
        </main>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm md:hidden z-40"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
