import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase/Firebase.config";
import { Toaster } from "react-hot-toast";

// Components

import Navbar from "./components/Navbar";
import SpeedRecord from "./components/SpeedRecord";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import TopRatedCard from "./components/TopRatedCard";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import BrowseCarsPage from "./components/BrowseCarsPage";
import AddCarPage from "./components/AddCarPage";
import MyListings from "./components/MyListings";
import MyBookings from "./components/MyBookings";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from "./components/ErrorPage";
import CarDetailsPage from "./components/CarDetailsPage";

const Home = ({ addCar, myCars }) => (
  <div className="pt-24 bg-gray-900 text-white">
    <SpeedRecord />
    <HeroSection addCar={addCar} myListings={myCars} />
    <TopRatedCard />
    <FeaturesSection />
    <Testimonials />
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [myCars, setMyCars] = useState([]);

  // Firebase Auth listener

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, []);

  // Logout handler

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      console.log("✅ Logged out successfully");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // Add car to MyListings

  const addCarToListing = (car) => {
    setMyCars((prev) => {
      if (!prev.find((c) => c.id === car.id)) {
        return [...prev, { ...car, status: "available" }];
      }
      return prev;
    });
  };

  // Layout wrapper

  const LayoutWrapper = ({ children }) => (
    <>
      <Navbar user={user} logout={handleLogout} />
      {children}
      <Footer />
    </>
  );

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
     path="/"
          element={
      <LayoutWrapper>
     <Home addCar={addCarToListing} myCars={myCars} />
            </LayoutWrapper>
          }
        />
    <Route
     path="/browse-cars"
    element={
   <LayoutWrapper>
     <BrowseCarsPage addCar={addCarToListing} />
       </LayoutWrapper>
      }
        />

        {/* Car Details route */}

        <Route
          path="/car/:id"
          element={
  <LayoutWrapper>
     <CarDetailsPage />
     </LayoutWrapper>
          }
        />
        <Route
          path="/add-car"
          element={
  <LayoutWrapper>
       <AddCarPage addCar={addCarToListing} />
     </LayoutWrapper>
          }
        />
    <Route
    path="/my-listings"
  element={
    <LayoutWrapper>
      <MyListings cars={myCars} />
       </LayoutWrapper>
          }
        />
        <Route
          path="/my-bookings"
          element={
    <LayoutWrapper>
    <MyBookings />
            </LayoutWrapper>
          }
        />
        <Route
          path="/login"
          element={
     <LayoutWrapper>
     <Login setUser={setUser} />
            </LayoutWrapper>
          }
        />
        <Route
    path="/signup"
          element={
      <LayoutWrapper>
              <Signup setUser={setUser} />
     </LayoutWrapper>
          }
        />
   <Route path="*" element={<ErrorPage />} />
</Routes>
    </Router>
  );
}

export default App;
