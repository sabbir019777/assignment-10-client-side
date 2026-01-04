import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoint } from "../api";
import { 
  FaCar, FaListUl, FaCalendarCheck, FaCheckCircle, FaArrowUp, 
  FaTrophy, FaStar, FaChartPie, FaAngleDown, FaUsers 
} from "react-icons/fa";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const DashboardHome = ({ user }) => {
  const [stats, setStats] = useState({
    myListings: 0,
    activeRentals: 0,
    availableCars: 0,
    myBookings: 0,
  });
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (user?.email) {
        try {
  
          const token = (await user.getIdToken()) || localStorage.getItem("token");
          
   
          const roleRes = await axios.get(endpoint(`/api/users/role/${user.email}`), {
            headers: { Authorization: `Bearer ${token}` }
          });
          setRole(roleRes.data.role);

    
          const statsRes = await axios.get(endpoint("/api/dashboard/stats"), {
            headers: { Authorization: `Bearer ${token}` }
          });
          setStats(statsRes.data);
          
        } catch (error) {
          console.error("Dashboard Fetch Error:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDashboardData();
  }, [user]);

  const statsData = [
    {
      label: role === "admin" ? "Global Listings" : "My Listings",
      value: stats.myListings || 0,
      icon: <FaListUl />,
      lightColor: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    },
    {
      label: role === "admin" ? "Active Rented" : "Active Rentals",
      value: stats.activeRentals || 0,
      icon: <FaCar />,
      lightColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    },
    {
      label: role === "admin" ? "Global Bookings" : "My Bookings",
      value: stats.myBookings || 0,
      icon: <FaCalendarCheck />,
      lightColor: "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
    },
    {
      label: role === "admin" ? "Fleet Available" : "Available Cars",
      value: stats.availableCars || 0,
      icon: <FaCheckCircle />,
      lightColor: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    },
  ];

  const chartData = [
    { name: 'Listings', count: stats.myListings || 0, color: '#3b82f6' },
    { name: 'Rentals', count: stats.activeRentals || 0, color: '#10b981' },
    { name: 'Bookings', count: stats.myBookings || 0, color: '#8b5cf6' },
    { name: 'Available', count: stats.availableCars || 0, color: '#f59e0b' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm text-white p-4 rounded-xl shadow-2xl border border-gray-700">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{label}</p>
          <p className="text-2xl font-black">{payload[0].value} <span className="text-sm font-medium text-gray-400">Units</span></p>
        </div>
      );
    }
    return null;
  };

  if (loading) return (
    <div className="flex h-[70vh] items-center justify-center">
       <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-slate-800 dark:to-slate-900 shadow-2xl p-8 md:p-12 text-white border border-white/10">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
             <p className="text-indigo-200 text-sm font-semibold uppercase tracking-widest mb-2">{today}</p>
             <h1 className="text-4xl md:text-5xl font-black leading-tight">
               {role === "admin" ? "Admin Oversight," : "Welcome back,"}<br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
                 {user?.displayName?.split(" ")[0] || "Partner"}!
               </span>
             </h1>
             <p className="mt-4 text-indigo-100 text-lg max-w-lg">
               System Status: <span className="font-bold text-white border-b-2 border-amber-400">{role === "admin" ? "Full Global Control" : "Active & Verified Account"}</span>
             </p>
          </div>
          
          <div className="hidden md:block bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
            <p className="text-xs text-indigo-200 uppercase font-bold">Role Access</p>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-3 h-3 rounded-full animate-pulse ${role === "admin" ? "bg-amber-400" : "bg-green-400"}`}></div>
              <span className="font-bold text-lg uppercase tracking-tighter">{role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((item, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${item.lightColor} text-2xl group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full uppercase">
                <FaArrowUp /> Live
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-black text-slate-800 dark:text-white">{item.value}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-semibold mt-1">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Overview */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-lg border border-slate-100 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                  <FaChartPie />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {role === "admin" ? "Fleet Performance" : "Personal Analytics"}
                </h3>
              </div>
              <p className="text-slate-500 text-sm font-medium mt-1">Real-time database insights</p>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={60}>
                <defs>
                  {chartData.map((entry, index) => (
                    <linearGradient key={`gradient-${index}`} id={`colorGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
                      <stop offset="100%" stopColor={entry.color} stopOpacity={0.6}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                <Bar dataKey="count" radius={[12, 12, 12, 12]} background={{ fill: '#f8fafc', radius: 12 }}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#colorGradient-${index})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Level/Reputation Card */}
        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between border border-white/5">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-amber-500/20 rounded-xl">
                 <FaTrophy className="text-amber-400 text-2xl" />
              </div>
              <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/10 uppercase">
                {role === "admin" ? "Master" : "Rising Star"}
              </div>
            </div>

            <h3 className="text-3xl font-bold mb-2">{role === "admin" ? "System Power" : "Driver Status"}</h3>
            <p className="text-slate-400 text-sm mb-8">
              {role === "admin" ? "Full access to platform control and management." : "Complete more trips to unlock premium badges."}
            </p>

            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold text-slate-300 uppercase tracking-widest">
                <span>Account Health</span>
                <span>100%</span>
              </div>
              <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full w-[100%] transition-all duration-1000 shadow-[0_0_10px_#f59e0b]"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="mt-8 flex items-center gap-2 text-sm font-black text-amber-400 bg-amber-400/10 p-4 rounded-xl border border-amber-400/20 uppercase tracking-widest">
              <FaStar /> Trusted {role}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;