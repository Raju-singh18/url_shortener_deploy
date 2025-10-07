import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white text-slate-800">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </Router>
  );
}

 
