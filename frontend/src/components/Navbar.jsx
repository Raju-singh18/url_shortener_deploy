import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    const storeduser = localStorage.getItem("user");
    if(storeduser) setAuth(JSON.parse(storeduser));
  },[]);

  const handleLogout = async () => {
    try {
      // Call backend logout route to clear the cookie
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true } // important to send cookies
      );

      // Clear localStorage
      localStorage.removeItem("user");
      toast.success("User logout successfully");
      // Redirect to login
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <header className="w-full bg-white shadow-md rounded-xl py-4 px-6 mb-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo + App Name */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
              Shortly
            </h1>
            <p className="text-xs text-slate-500">
              Shorten, share, and track your links effortlessly.
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 text-slate-700 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-indigo-600 transition-colors">
            About
          </Link>
          <Link
            to="/features"
            className="hover:text-indigo-600 transition-colors"
          >
            Features
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-md"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md bg-slate-200 text-slate-800 font-medium hover:bg-slate-300 transition-colors shadow-md"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="text-slate-600">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition-colors shadow-md"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        {/* <div className="md:hidden">
          <button
            className="text-slate-700 focus:outline-none"
            onClick={() => alert("Mobile menu placeholder")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div> */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-700 p-2 rounded-md hover:bg-slate-200 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50 p-4 flex flex-col gap-2">
              <Link onClick={() => setIsOpen(false)} to="/">
                Home
              </Link>
              <Link onClick={() => setIsOpen(false)} to="/about">
                About
              </Link>
              <Link onClick={() => setIsOpen(false)} to="/features">
                Features
              </Link>
              {!user ? (
                <>
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/login"
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
                  >
                    Login
                  </Link>
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/signup"
                    className="bg-slate-200 text-slate-800 px-3 py-1 rounded hover:bg-slate-300 transition"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-slate-600">Hi, {auth.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
