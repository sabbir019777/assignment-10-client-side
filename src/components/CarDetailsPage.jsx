import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCarSide,
  FaStar,
  FaCogs,
  FaGasPump,
  FaCheckCircle,
  FaChevronRight,
} from "react-icons/fa";
import { auth } from "../Firebase/Firebase.config"; 
import { endpoint } from "../api";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const similarCarsMock = [
  {
    id: "c003",
    name: "Koenigsegg Jesko",
    price: 800,
    imageUrl:
      "https://flavoredtimes.com/wp-content/uploads/2024/12/koenigsegg.jpg",
  },
  {
    id: "c011",
    name: "Aston Martin Valkyrie",
    price: 1180,
    imageUrl:
      "https://www.lemans.org/media/cache/api_news_large/assets/fileuploads/67/a2/67a279b3dbd13.jpg",
  },
  {
    id: "c015",
    name: "SSC Tuatara",
    price: 1150,
    imageUrl:
      "https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2025/02/67be3d1c79f883d4efb3ae42_hk-88-of-234-1.jpg?w=1600&h=900&fit=crop",
  },
];

const CarDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;
  const [activeImg, setActiveImg] = useState(car?.imageUrl);


  const carGallery = [
    car?.imageUrl,
    `https://loremflickr.com/1600/900/${
      car?.name?.split(" ")[0] || "car"
    },interior/all`,
    `https://loremflickr.com/1600/900/${
      car?.name?.split(" ")[0] || "car"
    },engine/all`,
  ];

  useEffect(() => {
    if (car) setActiveImg(car.imageUrl);
    window.scrollTo(0, 0);
  }, [car]);

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-950 text-white px-5">
        <h1 className="text-3xl font-black uppercase mb-5 tracking-tighter text-amber-500">
          Machine Not Found
        </h1>
        <button
          onClick={() => navigate("/browse-cars")}
          className="px-8 py-3 bg-amber-500 text-black rounded-xl font-black uppercase tracking-widest text-xs transition active:scale-95"
        >
          Back to Browse
        </button>
      </div>
    );
  }


  const handleBookNow = async () => {
    if (!auth.currentUser) {
      toast.error("Please login to book a car!");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    const loadingToast = toast.loading("Processing your booking...");

    try {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.post(
        endpoint(`/api/cars/${car.id}/book`),
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message) {
        toast.success("Booking Successful! 🚗", { id: loadingToast });
        navigate("/dashboard/my-bookings");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Booking failed! Please try again.",
        { id: loadingToast }
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-24 pb-32 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative h-[450px] overflow-hidden rounded-[40px] border border-white/10 shadow-2xl"
            >
              <img
                src={activeImg}
                className="w-full h-full object-cover transition-all duration-500"
                alt={car.name}
              />
              <div className="absolute top-6 left-6 bg-amber-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                {car.status}
              </div>
            </motion.div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {carGallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImg(img)}
                  className={`w-32 h-24 shrink-0 rounded-2xl cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                    activeImg === img
                      ? "border-amber-500 scale-95 shadow-lg"
                      : "border-white/5 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-amber-500 text-xs font-black uppercase tracking-[0.3em] mb-4">
                <FaCheckCircle /> Premium Selection
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                {car.name}
              </h1>
              <div className="flex items-center gap-4 bg-white/5 w-fit px-4 py-2 rounded-2xl border border-white/10">
                <div className="flex text-amber-500 gap-1">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <span className="text-xs font-bold text-slate-400">
                  ({car.rating || "4.9"} Ratings)
                </span>
              </div>
            </div>

            <div className="bg-linear-to-r from-gray-900 to-transparent p-6 rounded-[30px] border border-white/5 mb-8">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">
                Rental Rate
              </p>
              <h3 className="text-4xl font-black text-amber-500">
                ${car.price}
                <span className="text-lg text-white/50 font-medium">
                  {" "}
                  / day
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: <FaCogs />,
                  label: "Engine",
                  val: car.model?.includes("V12") ? "V12 Turbo" : "V8 Bi-Turbo",
                },
                {
                  icon: <FaGasPump />,
                  label: "Fuel",
                  val: car.category === "Electric" ? "Electric" : "Premium",
                },
                { icon: <FaCarSide />, label: "Category", val: car.category },
                {
                  icon: <FaMapMarkerAlt />,
                  label: "Location",
                  val: car.location,
                },
              ].map((spec, i) => (
                <div
                  key={i}
                  className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center hover:border-amber-500/30 transition-colors"
                >
                  <div className="text-amber-500 text-xl flex justify-center mb-2">
                    {spec.icon}
                  </div>
                  <p className="text-[8px] text-slate-500 uppercase font-black">
                    {spec.label}
                  </p>
                  <p className="text-[10px] font-bold uppercase truncate">
                    {spec.val}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-auto">
              <button
                onClick={() => navigate(-1)}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95"
              >
                Back
              </button>
              <button
                onClick={handleBookNow}
                disabled={car.status === "booked"}
                className={`flex-1 px-8 py-4 bg-linear-to-r from-amber-400 to-orange-600 text-black rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all ${
                  car.status === "booked" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {car.status === "booked"
                  ? "Already Reserved"
                  : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>

        {/* Overview & Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 border-t border-white/5 pt-16">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">
              Machine <span className="text-amber-500">Overview</span>
            </h2>
            <p className="text-slate-400 leading-relaxed font-medium">
              Experience the pinnacle of automotive engineering with {car.name}.
              This {car.model} is provided by{" "}
              <span className="text-white font-bold">{car.providerName}</span>,
              ensuring 100% safety and reliability.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                "Unlimited Kilometers",
                "GPS Navigation",
                "Full Insurance",
                "24/7 Support",
              ].map((rule, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <FaCheckCircle className="text-amber-500" /> {rule}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 h-fit shadow-xl">
            <h3 className="text-xl font-black uppercase mb-6 tracking-tighter">
              Client <span className="text-amber-500">Reviews</span>
            </h3>
            <div className="space-y-6">
              {[
                {
                  name: "John Doe",
                  msg: "Absolute monster on the road!",
                  rate: 5,
                },
                { name: "Sarah K.", msg: "Smooth booking process.", rate: 4 },
              ].map((rev, i) => (
                <div
                  key={i}
                  className="border-b border-white/5 pb-4 last:border-0"
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-xs">{rev.name}</p>
                    <div className="flex text-amber-500 text-[8px]">
                      {[...Array(rev.rate)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 italic">
                    "{rev.msg}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Suggested Fleet */}
        <div className="mt-20">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Suggested <span className="text-amber-500">Fleet</span>
            </h2>
            <button
              onClick={() => navigate("/browse-cars")}
              className="text-xs font-black uppercase tracking-widest text-amber-500 flex items-center gap-2 hover:gap-4 transition-all"
            >
              Explore All <FaChevronRight />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarCarsMock.map((c) => (
              <div
                key={c.id}
                className="group bg-slate-900/40 backdrop-blur-md rounded-[40px] border border-slate-800/60 overflow-hidden flex flex-col h-[380px] hover:border-amber-500/40 transition-all duration-700 shadow-xl"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={c.imageUrl}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-2">
                    {c.name}
                  </h3>
                  <p className="text-amber-500 font-black text-xl italic mb-6">
                    ${c.price}
                    <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">
                      /day
                    </span>
                  </p>

                
                  <button
                    onClick={() => navigate("/browse-cars")}
                    className="mt-auto w-full py-4 bg-linear-to-r from-amber-500 to-orange-600 text-black rounded-2xl font-black uppercase tracking-widest text-[9px] hover:shadow-amber-500/20 transition-all active:scale-95"
                  >
                    View All
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
