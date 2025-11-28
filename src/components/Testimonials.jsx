import React, { useEffect, useRef } from "react";
import { FaStar, FaStarHalfAlt, FaQuoteRight, FaHeart } from "react-icons/fa";


const testimonialsData = [
  { id: 1, name: "Sara Ahmed", role: "Frequent Renter", image: "https://i.pravatar.cc/150?img=32", rating: 5, date: "March 15, 2023", message: "RentWheels made my trip hassle-free! The cars are top-notch and booking is super easy. The luxury collection is unmatched." },

  { id: 2, name: "Sabbir Ahmad", role: "Car Owner & Partner", image: "https://i.postimg.cc/qMLFJTXv/7b0bbeea-c9de-4447-a609-0207ecc08ac0.jpg", rating: 4.8, date: "February 28, 2023", message: "As a car provider, managing my listings is seamless. I love how intuitive the dashboard is. Excellent revenue stream!" },

  { id: 3, name: "Alex Morgan", role: "Traveler", image: "https://i.pravatar.cc/150?img=45", rating: 4.9, date: "January 10, 2023", message: "Amazing service! I booked a luxury SUV and the experience was beyond my expectations. Five stars for service and reliability." },

  { id: 4, name: "Tamim Iqbal", role: "Business Traveler", image: "https://i.postimg.cc/Xq29PQd8/IMG-E3400.jpg", rating: 5, date: "December 5, 2022", message: "Perfect for quick trips. The app shows all available cars clearly and booking is instant. Customer support is always responsive." },

  { id: 5, name: "Michael Brown", role: "Weekend Renter", image: "https://i.pravatar.cc/150?img=15", rating: 4.7, date: "November 18, 2022", message: "The car selection is amazing and the booking process is fast. Highly recommended for anyone needing a premium vehicle!" },
  
  { id: 6, name: "Emily Clark", role: "Frequent Traveler", image: "https://i.pravatar.cc/150?img=25", rating: 5, date: "October 3, 2022", message: "RentWheels made long trips effortless. Excellent customer support and reliable cars. I won't use anyone else." }
];


const row1Data = testimonialsData.slice(0, 3);
const row2Data = testimonialsData.slice(3, 6);

const marqueeRow1 = [...row1Data, ...row1Data];
const marqueeRow2 = [...row2Data, ...row2Data];


const Testimonials = () => {
  const mouseGradientRef = useRef(null);
  const marqueeRef1 = useRef(null);
  const marqueeRef2 = useRef(null); 

  useEffect(() => {

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      if (mouseGradientRef.current) {
        mouseGradientRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 215, 0, 0.3), transparent 70%)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Marquee Hover Pause Effect

    const currentMarquee1 = marqueeRef1.current;
    const currentMarquee2 = marqueeRef2.current;

    const addPauseListeners = (element) => {
      if (element) {
        element.addEventListener('mouseenter', () => element.classList.add('paused'));
        element.addEventListener('mouseleave', () => element.classList.remove('paused'));
      }
    };

    addPauseListeners(currentMarquee1);
    addPauseListeners(currentMarquee2);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      
      const removePauseListeners = (element) => {
        if (element) {
          element.removeEventListener('mouseenter', () => element.classList.add('paused'));
          element.removeEventListener('mouseleave', () => element.classList.remove('paused'));
        }
      };

      removePauseListeners(currentMarquee1);
      removePauseListeners(currentMarquee2);
    };
  }, []);


  const TestimonialCard = ({ testi, idx }) => (
    <div
      key={testi.id + "-" + idx}
     
      className="relative bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group flex-shrink-0 w-[350px] mx-4"
    >
      {/* Top Accent */}

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-pink-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>


      <FaQuoteRight className="absolute top-6 right-6 text-amber-500 opacity-20 w-6 h-6" />

      <div className="flex items-start mb-4">
        <img
          src={testi.image}
          alt={testi.name}
          className="w-14 h-14 rounded-full border-2 border-gray-600 group-hover:border-amber-400 mr-4 shadow-lg transition-all duration-300"
        />
        <div>
          <h3 className="text-lg font-bold text-white">{testi.name}</h3>
          <p className="text-sm text-gray-400">{testi.role}</p>
          <p className="text-xs text-gray-500">{testi.date}</p>
        </div>
      </div>

      {/* Rating */}

      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < Math.floor(testi.rating)) {
            return <FaStar key={i} className="text-amber-400 w-4 h-4" />;
          } else if (i < testi.rating) {
            return <FaStarHalfAlt key={i} className="text-amber-400 w-4 h-4" />;
          } else {
            return <FaStar key={i} className="text-gray-600 w-4 h-4" />;
          }
        })}
        <span className="text-xs text-gray-500 ml-1">({testi.rating})</span>
      </div>


      <div className="bg-gray-900/20 p-4 rounded-xl">
        <p className="italic text-gray-300">
          <span className="text-amber-400 mr-1">"</span>
          {testi.message}
          <span className="text-amber-400 ml-1">"</span>
        </p>
      </div>

      {/* Heart Badge */}

      <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center shadow-lg">
        <FaHeart className="text-black w-4 h-4" />
      </div>
    </div>
  );


  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 overflow-hidden">


      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          ref={mouseGradientRef}
          className="absolute inset-0 opacity-10 transition-all duration-300"
        ></div>
        <div className="absolute w-[400px] h-[400px] -top-52 -left-24 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 opacity-20 animate-[float_25s_infinite_ease-in-out]"></div>
        <div className="absolute w-[500px] h-[500px] -bottom-64 -right-48 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 opacity-20 animate-[float_25s_infinite_ease-in-out] animation-delay-5000"></div>
      </div>

      
      <div className="relative z-10 container mx-auto px-5 max-w-6xl">

        <div className="text-center mb-16"> 
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 uppercase tracking-wide">
            What Our Customers Say
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-pink-500 mx-auto my-4 rounded-full"></div>
          <p className="text-gray-300 mt-4 max-w-3xl mx-auto text-base sm:text-lg font-light">
            Hear from our satisfied clients who experience excellence with every rides.
          </p>
        </div>

      
        <div className="space-y-8">
        
            <div className="relative overflow-hidden py-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                <div 
                    className="flex w-fit marquee-content-left" 
                    ref={marqueeRef1}
                >
                    {marqueeRow1.map((testi, idx) => (
                        <TestimonialCard testi={testi} idx={idx} key={`r1-${testi.id}-${idx}`} />
                    ))}
                </div>
            </div>

        
            <div className="relative overflow-hidden py-4" style={{ maskImage: 'linear-gradient(to left, transparent, black 10%, black 90%, transparent)' }}>
                <div 
                    className="flex w-fit marquee-content-right" 
                    ref={marqueeRef2}
                >
                    {marqueeRow2.map((testi, idx) => (
                        <TestimonialCard testi={testi} idx={idx} key={`r2-${testi.id}-${idx}`} />
                    ))}
                </div>
            </div>
        </div>
  

  
        <div className="mt-20 flex justify-center">
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full"></div>
        </div>
      </div>
      <style>
        {`
          /* Animation for floating orbs */
          @keyframes float {
            0%, 100% { transform: translate(0,0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-\\[float_25s_infinite_ease-in-out\\] {
            animation: float 25s infinite ease-in-out;
          }
          .animation-delay-5000 {
            animation-delay: 5s;
          }
          
          /* --- Marquee Scrolling CSS --- */
          
          /* Leftward Scrolling (Row 1) */
          .marquee-content-left {
            animation: marquee-left 35s linear infinite; /* 35s speed, adjust as needed */
          }
          
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } 
          }

          /* Rightward Scrolling (Row 2) */
          .marquee-content-right {
            animation: marquee-right 35s linear infinite; /* Same speed for balance */
          }

          @keyframes marquee-right {
            0% { transform: translateX(-50%); } /* ডান দিকে স্ক্রলিং শুরু করার জন্য */
            100% { transform: translateX(0); } 
          }

          /* Pause on Hover */
          .marquee-content-left.paused,
          .marquee-content-right.paused {
            animation-play-state: paused; 
          }
          
          /* Card Hover Transition (Tailwind classes were used, kept for reference) */
          .relative.bg-gray-800\\/70.backdrop-blur-md:hover {
              transform: translateY(-10px) scale(1.03);
          }

          /* Responsive adjustments for marquee card width */
          @media (max-width: 640px) {
            .w-\\[350px\\] {
                width: 300px;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Testimonials;