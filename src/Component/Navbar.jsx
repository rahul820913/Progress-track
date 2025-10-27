import React, { useState } from "react";
import ProgressTrackLogo from './logo';
import { Link } from 'react-router-dom';

const MenuIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    stroke="currentColor" 
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// SVG for X Icon
const XIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    stroke="currentColor" 
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Added a subtle bottom border
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 w-full z-50 border-b border-gray-700/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center space-x-2">
            <ProgressTrackLogo />
          <Link to="/" className="text-2xl font-bold transition-transform duration-300 hover:scale-105">
            Progress-Track
          </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8"> {/* Increased spacing */}
            <li>
              {/* Added animated underline effect */}
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium relative group py-2"
              >
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium relative group py-2"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/future"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium relative group py-2"
              >
                Future
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {/* Replaced icons with SVGs */}
              {isOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </button>
          </div>
        </div>

        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-screen pb-4 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="mt-2 space-y-2 text-center">
            <li>
              <Link
                to="/"
                className="block py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/future"
                className="block py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Future
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

