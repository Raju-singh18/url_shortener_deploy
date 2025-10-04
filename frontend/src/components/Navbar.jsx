 
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
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
          <Link to="/features" className="hover:text-indigo-600 transition-colors">
            Features
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/"
            className="px-5 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-md"
          >
            Create Short URL
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}
