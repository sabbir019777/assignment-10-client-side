import React from "react";
import { FaArrowRight, FaClock, FaTag, FaChevronRight, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BlogSection = () => {
  const navigate = useNavigate();


  const handleViewAll = () => {
    navigate("/browse-cars");
  };


  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }


    toast.success("Welcome to the Car Club! 🚀", {
      style: {
        border: '1px solid #f59e0b',
        padding: '16px',
        color: '#fff',
        background: '#1f2937',
      },
      iconTheme: {
        primary: '#f59e0b',
        secondary: '#FFFAEE',
      },
    });
    
    e.target.reset(); 
  };

  const featuredBlog = {
    id: 1,
    img: "https://klassen.de/media/images/vehicles/i/bpic/6739189475001018/202106141633125621.jpg",
    title: "The Ultimate Guide to Luxury Weekend Getaways",
    date: "Oct 24, 2025",
    category: "Lifestyle",
    desc: "Discover how to choose the perfect supercar for your next road trip. From comfort to performance, we break down the top choices for 2026."
  };

  const recentBlogs = [
    {
      id: 2,
      img: "https://hips.hearstapps.com/hmg-prod/images/2022-chevrolet-corvette-z06-1607016574.jpg?crop=0.670xw:1.00xh;0.221xw,0&resize=640:*",
      title: "5 Maintenance Hacks Before Long Drives",
      date: "Nov 02, 2025",
      category: "Tips",
    },
    {
      id: 3,
      img: "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&height=900&width=1600&fit=bounds",
      title: "Buying vs Renting: The Financial Truth",
      date: "Dec 10, 2025",
      category: "Finance",
    },
    {
      id: 4,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQKSgs36JUgiW6og8llCJR1AF0gCf6uaI4XQ&s",
      title: "Experience the Thrill: New Ferrari Added",
      date: "Jan 05, 2026",
      category: "News",
    },
  ];

  return (
    <section className="py-24 bg-[#050914] text-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-16 border-b border-gray-800 pb-6">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs mb-3"
            >
              From The Journal
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black uppercase italic"
            >
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Insights</span>
            </motion.h2>
          </div>
          
          {/* Functional View All Button */}
          <button 
            onClick={handleViewAll}
            className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-amber-500 transition-colors group"
          >
            View All Articles
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Content Layout: Featured (Left) + List (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* FEATURED POST (Takes 7 Cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 relative group rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px] lg:h-[600px] border border-gray-800"
          >
            <img 
              src={featuredBlog.img} 
              alt={featuredBlog.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
            
            {/* Featured Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <span className="inline-block px-4 py-1.5 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                {featuredBlog.category}
              </span>
              
       
              <h3 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-amber-400 drop-shadow-md">
                {featuredBlog.title}
              </h3>
              
              <p className="text-gray-300 text-sm md:text-base max-w-lg mb-6 line-clamp-2 leading-relaxed">
                {featuredBlog.desc}
              </p>
              <div className="flex items-center gap-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span className="flex items-center gap-2"><FaClock className="text-amber-500" /> {featuredBlog.date}</span>
                <span className="flex items-center gap-2 border-b border-amber-500 pb-0.5 text-white cursor-pointer hover:text-amber-500 transition-colors">Read Article <FaArrowRight /></span>
              </div>
            </div>
          </motion.div>

          {/* SIDEBAR LIST (Takes 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:space-y-0">
            {recentBlogs.map((blog, index) => (
              <motion.div 
                key={blog.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-5 group cursor-pointer bg-gray-900/40 border border-gray-800 p-4 rounded-3xl hover:bg-gray-800 hover:border-amber-500/30 transition-all duration-300 shadow-lg"
              >
                <div className="w-32 h-24 rounded-2xl overflow-hidden shrink-0">
                  <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <FaTag /> {blog.category}
                    </span>
                    <span className="text-gray-600 text-[10px]">•</span>
                    <span className="text-gray-500 text-[10px] font-bold uppercase">{blog.date}</span>
                  </div>
                  <h4 className="text-lg font-bold leading-snug text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h4>
                  <div className="mt-2 flex items-center text-[10px] text-gray-500 font-bold uppercase gap-1 group-hover:translate-x-2 transition-transform duration-300">
                    Read More <FaChevronRight className="text-amber-500" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* ৪. Newsletter Box (Fixed Design & Toast Added) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-auto bg-gradient-to-br from-amber-500 to-orange-700 p-8 rounded-[2rem] text-center relative overflow-hidden shadow-2xl"
            >
              <div className="relative z-10">
                <div className="inline-block p-3 rounded-full bg-white/20 mb-3 backdrop-blur-sm">
                   <FaPaperPlane className="text-xl text-white" />
                </div>
                <h4 className="text-2xl font-black text-white uppercase italic mb-1 text-shadow-sm">Join the Club</h4>
                <p className="text-white/80 text-xs font-bold mb-6 tracking-wide">Get exclusive offers & news directly to your inbox.</p>
                
                <form onSubmit={handleSubscribe} className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-lg">
                   <input 
                     name="email"
                     type="email" 
                     placeholder="Enter your email..." 
                     className="w-full bg-transparent text-gray-900 px-4 py-2 text-xs font-bold outline-none placeholder-gray-400" 
                   />
                   <button 
                     type="submit"
                     className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase hover:bg-black transition-colors shadow-md"
                   >
                     Join
                   </button>
                </form>
              </div>
              
              {/* Pattern Overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
              {/* Glow Effect */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl"></div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogSection;