import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase/Firebase.config";
import { Toaster } from "react-hot-toast";

// ThemeProvider 
import { ThemeProvider } from "./context/ThemeContext";

// Existing Components

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

// New Components
import HowItWorks from "./components/HowItWorks";
import BlogSection from "./components/BlogSection";
import AppDownload from "./components/AppDownload";

// New Footer-Area Components
import BrandMarquee from "./components/BrandMarquee";
import FinalCTA from "./components/FinalCTA";

// Additional Pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import ManageUsers from "./pages/ManageUsers";

// Profile Pages
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";

// Dashboard Pages
import DashboardHome from "./pages/DashboardHome";
import ManageAllCars from "./pages/ManageAllCars"; 
import AllBookings from "./pages/AllBookings";

// Layouts

import DashboardLayout from "./layouts/DashboardLayout";

// --- HOME COMPONENT ---

const Home = () => (
  <div className="pt-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
    <SpeedRecord />
    <HeroSection />
    <TopRatedCard />
    <HowItWorks />
    <AppDownload />
    <BlogSection />
    <FeaturesSection />
    <Testimonials />
    <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <FAQ />
    </div>
    <BrandMarquee />
    <FinalCTA />
  </div>
);

// Private Route Wrapper

const PrivateRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
       
        setUser(currentUser);
     
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };
        try {
          localStorage.setItem("user", JSON.stringify(userData));
        } catch (e) {
          console.warn("Could not write user snapshot to localStorage", e);
        }
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const PublicLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-300">
      <Navbar user={user} logout={handleLogout} />
      <main className="grow bg-white dark:bg-gray-900">{children}</main>
      <Footer />
    </div>
  );

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center text-amber-500">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Router>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Home />
                </PublicLayout>
              }
            />
            <Route
              path="/browse-cars"
              element={
                <PublicLayout>
                  <BrowseCarsPage />
                </PublicLayout>
              }
            />
            <Route
              path="/car/:id"
              element={
                <PublicLayout>
                  <CarDetailsPage />
                </PublicLayout>
              }
            />
            <Route
              path="/login"
              element={
                <PublicLayout>
                  <Login setUser={setUser} />
                </PublicLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicLayout>
                  <Signup setUser={setUser} />
                </PublicLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <About />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <Contact />
                </PublicLayout>
              }
            />
            <Route
              path="/faq"
              element={
                <PublicLayout>
                  <FAQ />
                </PublicLayout>
              }
            />
            <Route
              path="/terms"
              element={
                <PublicLayout>
                  <Terms />
                </PublicLayout>
              }
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute user={user}>
                  <DashboardLayout user={user} logout={handleLogout} />
                </PrivateRoute>
              }
            >
              <Route index element={<DashboardHome user={user} />} />

              <Route path="profile" element={<Profile user={user} />} />
              <Route
                path="update-profile"
                element={<UpdateProfile user={user} />}
              />
              <Route path="add-car" element={<AddCarPage />} />
              <Route path="my-listings" element={<MyListings />} />
              <Route path="my-bookings" element={<MyBookings />} />

              {/* Admin Routes */}
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="manage-cars" element={<ManageAllCars />} />
              <Route path="all-bookings" element={<AllBookings />} />
            </Route>
            

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
